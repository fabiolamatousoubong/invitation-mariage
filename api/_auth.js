import {
  createHmac,
  timingSafeEqual,
} from 'node:crypto'

export const sessionCookieName = 'invitation_session'
export const sessionDurationSeconds = 60 * 60 * 24 * 7

function safeEqual(firstValue, secondValue) {
  const first = Buffer.from(String(firstValue))
  const second = Buffer.from(String(secondValue))

  return (
    first.length === second.length &&
    timingSafeEqual(first, second)
  )
}

function getAuthSecret() {
  return process.env.AUTH_SECRET?.trim()
}

function sign(value) {
  const authSecret = getAuthSecret()

  if (!authSecret) {
    return null
  }

  return createHmac('sha256', authSecret)
    .update(value)
    .digest('hex')
}

export function hasAuthConfiguration() {
  return Boolean(getAuthSecret())
}

export function pinsMatch(submittedPin) {
  const invitationPin = process.env.INVITATION_PIN?.trim()

  return Boolean(
    invitationPin &&
      submittedPin &&
      safeEqual(submittedPin, invitationPin),
  )
}

export function createSessionToken() {
  const expiresAt = String(
    Math.floor(Date.now() / 1000) + sessionDurationSeconds,
  )
  const signature = sign(expiresAt)

  if (!signature) {
    return null
  }

  return `${expiresAt}.${signature}`
}

export function readCookies(request) {
  try {
    return Object.fromEntries(
      (request.headers.cookie || '')
        .split(';')
        .map((cookie) => cookie.trim().split('='))
        .filter(([name, value]) => name && value)
        .map(([name, value]) => [name, decodeURIComponent(value)]),
    )
  } catch {
    return {}
  }
}

export function hasValidSession(request) {
  const token = readCookies(request)[sessionCookieName]

  if (!token) {
    return false
  }

  const [expiresAt, signature] = token.split('.')

  if (!expiresAt || !signature) {
    return false
  }

  if (Number(expiresAt) <= Math.floor(Date.now() / 1000)) {
    return false
  }

  const expectedSignature = sign(expiresAt)

  return Boolean(
    expectedSignature && safeEqual(signature, expectedSignature),
  )
}

export function buildSessionCookie(token) {
  const secureCookie =
    process.env.NODE_ENV === 'production' ? '; Secure' : ''

  return [
    `${sessionCookieName}=${encodeURIComponent(token)}`,
    'HttpOnly',
    'SameSite=Lax',
    'Path=/',
    `Max-Age=${sessionDurationSeconds}`,
    secureCookie,
  ]
    .filter(Boolean)
    .join('; ')
}
