# Eugine Kunitsa | Resume Website

Multilingual resume website with the admin panel and server-generated PDF.

[Live website](https://ekunitsa.com/) | [Repository](https://github.com/ekunitsa/ekunitsa-resume-nextjs)

<img src="public/static/img/og-image.jpg" alt="Eugine Kunitsa resume website preview" width="100%">

## Stack

- Next.js 16, React 19, TypeScript
- PostgreSQL, Prisma 7
- NextAuth.js, next-intl
- React PDF
- SCSS
- Biome, Stylelint, Husky

## Requirements

- Node.js 24.18.0
- NPM
- PostgreSQL

## Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/ekunitsa/ekunitsa-resume-nextjs.git
cd ekunitsa-resume-nextjs
npm i
```

Create an empty PostgreSQL database, then rename the environment file from .env.example to .env

Configure `.env`

Prepare the database:

```bash
npm run prisma:validate
npm run prisma:generate
npx prisma db push
```

The repository currently uses `prisma db push` and does not contain a migration history.

## Create an administrator

Registration is not provided. Create the first user directly in the database.

Open Prisma Studio:

```bash
npx prisma studio
```

Create a record in the `User` model with:

- administrator email;
- generated hash in the `password` field;
- optional name.

## Development

```bash
npm run dev
```

- Website: [http://localhost:3000](http://localhost:3000)
- Admin panel: [http://localhost:3000/admin/](http://localhost:3000/admin)

Resume data is empty after the initial setup. Fill Dashboard, Global, Summary, About, Experience, Languages, and Skills through the admin panel.

Localized records are stored separately. Use the language selector in the site header to fill out the different language versions.

PDF routes:

- `/uk/cv.pdf`
- `/en/cv.pdf`

All sections of the admin panel must be filled before the PDF is available to download.

## Production

Set production values for `DATABASE_URL`, `NEXTAUTH_URL`, and `NEXTAUTH_SECRET`, then run:

```bash
npm i
npm run prisma:validate
npm run prisma:generate
npx prisma db push
npm run build
npm run start
```

For a managed deployment platform, use:

```bash
npm run prisma:generate && npm run build
```

Run `npx prisma db push` against the production database before the first deployment. Do not expose Prisma Studio publicly.

## GitHub Actions deployment

The [`Build Production`](.github/workflows/deploy.yml) workflow is started manually. It installs dependencies, validates and generates the Prisma client, builds the standalone Next.js application, uploads it to a Linux server over SSH, and restarts the PM2 process.

### Prepare the server

The deployment target must have:

- SSH access from GitHub-hosted runners;
- Node.js 24 and PM2 installed;
- `tar` available;
- a deployment user with write access to the project directory;
- PostgreSQL available to the application.

Create the target directory and its production `.env` file before the first deployment.

The workflow preserves the existing `.env` during deployment; it does not create or upload this file. Run `npx prisma db push` against the production database before the first deployment and whenever the Prisma schema changes. The workflow does not update the database schema.

### Configure SSH access

Create a dedicated key pair without a passphrase on a trusted machine:

```bash
ssh-keygen -t ed25519 -C github-actions-deploy -f github-actions-deploy
```

Append `github-actions-deploy.pub` to `~/.ssh/authorized_keys` for the deployment user on the server. Keep `github-actions-deploy` private and add its complete contents, including the `BEGIN` and `END` lines, to the `DEPLOY_SSH_KEY` GitHub secret.

The SSH user must be allowed to write to `PROJECT_PATH` and run `pm2 restart` without interactive prompts.

### Add repository secrets

Open the GitHub repository and go to **Settings → Secrets and variables → Actions → New repository secret**. Add the secrets referenced by the workflow:

| Secret | Example | Description |
| --- | --- | --- |
| `DEPLOY_HOST` | `000.000.000.000` | Server hostname or IP address |
| `DEPLOY_PORT` | `22` | SSH port |
| `DEPLOY_USER` | `deploy` | SSH deployment user |
| `PROJECT_PATH` | `/var/www/your-path-to-the-project` | Absolute deployment directory on the server |
| `DEPLOY_SSH_KEY` | `-----BEGIN OPENSSH PRIVATE KEY-----...` | Complete private deployment key |
| `DATABASE_URL` | `postgresql://...` | PostgreSQL URL available during Prisma validation and the production build |

`NEXTAUTH_URL`, `NEXTAUTH_SECRET`, `SITE_NAME`, and `SITE_URL` are runtime configuration and belong in the server-side `.env`. Do not commit `.env` or private keys to the repository.

### Run the workflow

Open **Actions → Build Production → Run workflow**. A successful run must complete the build, upload, extraction, and PM2 restart steps. The workflow is configured with `workflow_dispatch`, so pushes do not deploy automatically.

If SSH steps fail, verify the host, port, firewall, public key in `authorized_keys`, directory ownership, and the multiline value of `DEPLOY_SSH_KEY`. If the build fails during Prisma setup, verify `DATABASE_URL` and database accessibility.

## Personalize a fork

Replace the project-specific assets and metadata:

- `public/static/img/photo.png`
- `public/static/img/og-image.jpg`
- `public/static/img/favicon.ico`
- `src/locales/en.json` and `src/locales/uk.json`
- PDF filename in `src/app/[locale]/cv.pdf/route.tsx`

Resume content is managed through the admin panel.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Production server |
| `npm run lint` | Biome, Stylelint, and TypeScript |
| `npm run prisma:validate` | Validate Prisma schema |
| `npm run prisma:generate` | Generate Prisma client |
| `npx prisma db push` | Apply schema to the database |
| `npx prisma studio` | Open Prisma Studio |

## License

The source code is available under the [MIT License](LICENSE).

Personal content, including CV data, photographs, written content, and branding, is not covered by the MIT License and may not be reused.
