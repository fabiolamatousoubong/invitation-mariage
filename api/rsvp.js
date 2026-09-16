import nodemailer from 'nodemailer'

const recipient = 'fabiolamatou@gmail.com'

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return response.status(405).json({ error: 'Méthode non autorisée.' })
  }

  const firstName = request.body?.firstName?.trim()
  const lastName = request.body?.lastName?.trim()
  const attendance = request.body?.attendance
  const companion = request.body?.companion?.trim() || 'Non précisé'
  const language = request.body?.language === 'de' ? 'Allemand' : 'Français'

  if (!firstName || !lastName || !['yes', 'no'].includes(attendance)) {
    return response.status(400).json({ error: 'Informations RSVP incomplètes.' })
  }

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    return response.status(503).json({ error: 'Le service e-mail n’est pas configuré.' })
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  })

  const presence = attendance === 'yes' ? 'Oui, avec joie' : 'Non, malheureusement'

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: recipient,
      subject: `RSVP mariage : ${firstName} ${lastName}`,
      text: `Nouvelle réponse RSVP\n\nPrénoms : ${firstName}\nNom : ${lastName}\nPrésence à la réception : ${presence}\nAccompagnement : ${companion}\nLangue utilisée : ${language}`,
    })
    return response.status(201).json({ ok: true })
  } catch (error) {
    console.error('Unable to send RSVP email', error)
    return response.status(502).json({ error: 'L’envoi de l’e-mail a échoué.' })
  }
}