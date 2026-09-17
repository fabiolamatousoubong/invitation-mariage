import {
  buildSessionCookie,
  createSessionToken,
  hasAuthConfiguration,
  pinsMatch,
} from './_auth.js'

export default function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return response.status(405).json({ error: 'Méthode non autorisée.' })
  }

  if (!process.env.INVITATION_PIN?.trim()) {
    return response.status(503).json({
      error: "Le code PIN n'est pas encore configuré.",
    })
  }

  if (!hasAuthConfiguration()) {
    return response.status(503).json({
      error: "La session n'est pas encore configurée.",
    })
  }

  const submittedPin = request.body?.pin?.trim()

  if (!pinsMatch(submittedPin)) {
    return response.status(401).json({ error: 'Code PIN incorrect.' })
  }

  const sessionToken = createSessionToken()

  if (!sessionToken) {
    return response.status(503).json({
      error: "La session n'est pas encore configurée.",
    })
  }

  response.setHeader('Set-Cookie', buildSessionCookie(sessionToken))

  return response.json({ ok: true })
}
