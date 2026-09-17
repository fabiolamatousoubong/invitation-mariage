import { hasAuthConfiguration, hasValidSession } from './_auth.js'

export default function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET')
    return response.status(405).json({ error: 'Méthode non autorisée.' })
  }

  if (!hasAuthConfiguration()) {
    return response.status(503).json({
      authenticated: false,
      error: "La session n'est pas encore configurée.",
    })
  }

  return response.json({
    authenticated: hasValidSession(request),
  })
}
