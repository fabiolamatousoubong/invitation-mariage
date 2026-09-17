# invitation-mariage

Site d'invitation de mariage construit avec Vue 3, Vite et une petite API Node pour la connexion par PIN et le formulaire RSVP.

## Développement

```sh
npm install
npm run dev
```

Le client Vite proxy les routes `/api/*` vers le serveur local Express sur le port `3001`.

## Variables d'environnement

Créez un fichier `.env` local ou configurez ces variables dans l'hébergeur :

```env
INVITATION_PIN=1234
AUTH_SECRET=une-valeur-longue-et-aleatoire
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=user@example.com
SMTP_PASSWORD=mot-de-passe-ou-app-password
SMTP_FROM=user@example.com
```

`AUTH_SECRET` doit rester stable en production. Si cette valeur change ou manque, le cookie créé après la saisie du PIN ne pourra pas être vérifié correctement.

## Déploiement Vercel

Le projet contient un fichier `vercel.json` pour Vercel :

- Framework : Vite
- Build command : `npm run build`
- Output directory : `dist`
- API serverless : dossier `api/`
- Fallback SPA : toutes les routes non-API reviennent vers `index.html`

Dans Vercel, ajoutez les variables suivantes dans **Project Settings > Environment Variables** pour Production, Preview et Development si nécessaire :

```env
INVITATION_PIN=1234
AUTH_SECRET=une-valeur-longue-et-aleatoire
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=user@example.com
SMTP_PASSWORD=mot-de-passe-ou-app-password
SMTP_FROM=user@example.com
```

La valeur `AUTH_SECRET` ne doit pas être publiée dans le code. Gardez-la uniquement dans Vercel et dans votre `.env` local.

## Build

```sh
npm run build
```
