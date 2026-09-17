import { buildExpiredSessionCookie } from './_auth.js'

export default function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return response.status(405).json({ error: 'Méthode non autorisée.' })
  }

  response.setHeader('Set-Cookie', buildExpiredSessionCookie())

  return response.json({ ok: true })
}
