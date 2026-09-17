import 'dotenv/config'
import {
  createHmac,
  randomBytes,
  timingSafeEqual,
} from 'node:crypto'
import express from 'express'
import nodemailer from 'nodemailer'

const app = express()
const port = process.env.PORT || 3001

const recipient = 'fabiolamatou@gmail.com'
const invitationPin =
  process.env.INVITATION_PIN?.trim()

const authSecret =
  process.env.AUTH_SECRET ||
  randomBytes(32).toString('hex')

const sessionDurationSeconds =
  60 * 60 * 24 * 7

const loginAttempts = new Map()

app.disable('x-powered-by')
app.use(express.json({ limit: '10kb' }))

function safeEqual(firstValue, secondValue) {
  const first = Buffer.from(
    String(firstValue),
  )

  const second = Buffer.from(
    String(secondValue),
  )

  return (
    first.length === second.length &&
    timingSafeEqual(first, second)
  )
}

function sign(value) {
  return createHmac(
    'sha256',
    authSecret,
  )
    .update(value)
    .digest('hex')
}

function createSessionToken() {
  const expiresAt = String(
    Math.floor(Date.now() / 1000) +
      sessionDurationSeconds,
  )

  return `${expiresAt}.${sign(expiresAt)}`
}

function readCookies(request) {
  try {
    return Object.fromEntries(
      (request.headers.cookie || '')
        .split(';')
        .map((cookie) =>
          cookie.trim().split('='),
        )
        .filter(
          ([name, value]) =>
            name && value,
        )
        .map(([name, value]) => [
          name,
          decodeURIComponent(value),
        ]),
    )
  } catch {
    return {}
  }
}

function hasValidSession(request) {
  const token =
    readCookies(request)
      .invitation_session

  if (!token) {
    return false
  }

  const [expiresAt, signature] =
    token.split('.')

  if (!expiresAt || !signature) {
    return false
  }

  const currentTime =
    Math.floor(Date.now() / 1000)

  if (
    Number(expiresAt) <= currentTime
  ) {
    return false
  }

  return safeEqual(
    signature,
    sign(expiresAt),
  )
}

function requireAuthentication(
  request,
  response,
  next,
) {
  if (!hasValidSession(request)) {
    return response.status(401).json({
      error: 'Accès non autorisé.',
    })
  }

  next()
}

function getAttemptState(request) {
  const key =
    request.ip ||
    request.socket.remoteAddress ||
    'unknown'

  const now = Date.now()
  const current =
    loginAttempts.get(key)

  if (
    !current ||
    current.resetAt <= now
  ) {
    const fresh = {
      count: 0,
      resetAt:
        now + 10 * 60 * 1000,
    }

    loginAttempts.set(key, fresh)

    return {
      key,
      state: fresh,
    }
  }

  return {
    key,
    state: current,
  }
}

/*
 * Vérification de la session
 */
app.get(
  '/api/auth',
  (request, response) => {
    return response.json({
      authenticated:
        hasValidSession(request),
    })
  },
)

/*
 * Connexion avec le code PIN
 */
app.post(
  '/api/login',
  (request, response) => {
    if (!invitationPin) {
      return response
        .status(503)
        .json({
          error:
            "Le code PIN n'est pas encore configuré.",
        })
    }

    const { key, state } =
      getAttemptState(request)

    if (state.count >= 5) {
      return response
        .status(429)
        .json({
          error:
            'Trop de tentatives. Réessayez dans quelques minutes.',
        })
    }

    const submittedPin =
      request.body.pin?.trim()

    if (
      !submittedPin ||
      !safeEqual(
        submittedPin,
        invitationPin,
      )
    ) {
      state.count += 1
      loginAttempts.set(key, state)

      return response
        .status(401)
        .json({
          error:
            'Code PIN incorrect.',
        })
    }

    loginAttempts.delete(key)

    const secureCookie =
      process.env.NODE_ENV ===
      'production'
        ? '; Secure'
        : ''

    const sessionToken =
      createSessionToken()

    response.setHeader(
      'Set-Cookie',
      [
        `invitation_session=${encodeURIComponent(
          sessionToken,
        )}`,
        'HttpOnly',
        'SameSite=Lax',
        'Path=/',
        `Max-Age=${sessionDurationSeconds}`,
        secureCookie,
      ]
        .filter(Boolean)
        .join('; '),
    )

    return response.json({
      ok: true,
    })
  },
)

/*
 * Déconnexion
 */
app.post(
  '/api/logout',
  (request, response) => {
    response.setHeader(
      'Set-Cookie',
      [
        'invitation_session=',
        'HttpOnly',
        'SameSite=Lax',
        'Path=/',
        'Max-Age=0',
      ].join('; '),
    )

    return response.json({
      ok: true,
    })
  },
)

/*
 * Envoi du formulaire RSVP
 */
app.post(
  '/api/rsvp',
  requireAuthentication,
  async (request, response) => {
    const firstName =
      request.body.firstName?.trim()

    const lastName =
      request.body.lastName?.trim()

    const attendance =
      request.body.attendance

    const language =
      request.body.language === 'de'
        ? 'Allemand'
        : 'Français'

    if (
      !firstName ||
      !lastName ||
      !['yes', 'no'].includes(
        attendance,
      )
    ) {
      return response
        .status(400)
        .json({
          error:
            'Informations RSVP incomplètes.',
        })
    }

    if (
      !process.env.SMTP_HOST ||
      !process.env.SMTP_USER ||
      !process.env.SMTP_PASSWORD
    ) {
      return response
        .status(503)
        .json({
          error:
            'Le service e-mail n’est pas encore configuré.',
        })
    }

    try {
      const transporter =
        nodemailer.createTransport({
          host:
            process.env.SMTP_HOST,

          port: Number(
            process.env.SMTP_PORT ||
              587,
          ),

          secure:
            process.env
              .SMTP_SECURE ===
            'true',

          auth: {
            user:
              process.env.SMTP_USER,

            pass:
              process.env
                .SMTP_PASSWORD,
          },
        })

      const presence =
        attendance === 'yes'
          ? 'Oui, avec joie'
          : 'Non, malheureusement'

      await transporter.sendMail({
        from:
          process.env.SMTP_FROM ||
          process.env.SMTP_USER,

        to: recipient,

        subject:
          `RSVP mariage : ${firstName} ${lastName}`,

        text: [
          'Nouvelle réponse RSVP',
          '',
          `Prénoms : ${firstName}`,
          `Nom : ${lastName}`,
          `Présence à la réception : ${presence}`,
          `Langue utilisée : ${language}`,
        ].join('\n'),
      })

      return response
        .status(201)
        .json({
          ok: true,
        })
    } catch (error) {
      console.error(
        'Erreur lors de l’envoi du RSVP :',
        error,
      )

      return response
        .status(500)
        .json({
          error:
            "La réponse n'a pas pu être envoyée. Réessayez dans quelques instants.",
        })
    }
  },
)

app.listen(port, () => {
  console.log(
    `Invitation API listening on http://127.0.0.1:${port}`,
  )
})