import 'dotenv/config'
import express from 'express'
import nodemailer from 'nodemailer'

const app = express()
const port = process.env.PORT || 3001
const recipient = 'fabiolamatou@gmail.com'

app.use(express.json({ limit: '10kb' }))

app.post('/api/rsvp', async (request, response) => {
  const firstName = request.body.firstName?.trim()
  const lastName = request.body.lastName?.trim()
  const attendance = request.body.attendance
  const companion = request.body.companion?.trim() || 'Non précisé'
  const language = request.body.language === 'de' ? 'Allemand' : 'Français'

  if (!firstName || !lastName || !['yes', 'no'].includes(attendance)) {
    return response.status(400).json({ error: 'Informations RSVP incomplètes.' })
  }

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    return response.status(503).json({ error: 'Le service e-mail n’est pas encore configuré.' })
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
  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: recipient,
    subject: `RSVP mariage : ${firstName} ${lastName}`,
    text: `Nouvelle réponse RSVP\n\nPrénoms : ${firstName}\nNom : ${lastName}\nPrésence à la réception : ${presence}\nAccompagnement : ${companion}\nLangue utilisée : ${language}`,
  })

  return response.status(201).json({ ok: true })
})

app.listen(port, () => {
  console.log(`RSVP API listening on http://127.0.0.1:${port}`)
})