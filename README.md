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
- Playwright
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

## End-to-end testing

Playwright runs the application locally on port `3100` and connects directly to a dedicated test database on the VPS. Tests must never use the production database or its database user.

The database name and database user in `DATABASE_URL` must both end with `_test`. Before the tests start, PostgreSQL is also queried for its actual database and user; they must match `DATABASE_URL` exactly.

### Create the test database on the VPS

The commands below use these example names:

- production database: `resume`;
- test database: `resume_test`;
- test database user: `app_test`.

Replace the production database name with the real value from the production `DATABASE_URL`.

Connect to the VPS and create a temporary production dump:

```bash
sudo -u postgres pg_dump \
  --format=custom \
  --no-owner \
  --no-acl \
  --file=/tmp/resume-production.dump \
  resume
```

Open PostgreSQL:

```bash
sudo -u postgres psql
```

Create a dedicated test user and set a separate password:

```text
CREATE ROLE app_test LOGIN;
\password app_test
```

Create the test database and leave PostgreSQL:

```text
CREATE DATABASE resume_test OWNER app_test;
\q
```

Restore the production dump into the test database:

```bash
sudo -u postgres pg_restore \
  --dbname=resume_test \
  --role=app_test \
  --no-owner \
  --no-acl \
  /tmp/resume-production.dump
```

Verify the connection using the new test user:

```bash
psql \
  -h 127.0.0.1 \
  -U app_test \
  -d resume_test \
  -c 'SELECT current_database(), current_user;'
```

The result must contain `resume_test` and `app_test`.

The copied database contains the production administrator password hash. After verifying the database name, remove all copied users from the test database:

```bash
psql \
  -h 127.0.0.1 \
  -U app_test \
  -d resume_test \
  -c 'TRUNCATE TABLE "User";'
```

Remove the temporary dump after a successful restore because it contains production data:

```bash
sudo rm -- /tmp/resume-production.dump
```

If the test database or user already exists, inspect it before continuing. Do not drop or overwrite an existing database without confirming its identity and contents.

### Configure the local test environment

Create the ignored `.env.test` file from the committed template:

```bash
cp .env.test.example .env.test
```

Copy the host, port, and SSL options from the production `DATABASE_URL`, but use only the dedicated test user, password, and database:

Both `.env` and `.env.test` are ignored by Git. Never put production database credentials in `.env.test`.

### Verify and seed the test database

Check that the configured URL and the actual PostgreSQL database/user are safe:

```bash
npm run test:e2e:db:check
```

The command is read-only. It verifies that the database and user both end with `_test`, connects to PostgreSQL, and compares `current_database()` and `current_user` with `DATABASE_URL`.

Create or update the dedicated E2E administrator:

```bash
npm run test:e2e:prepare-admin
```

The administrator email must end with `.test`, and the password must contain at least 12 characters. The password is stored as a bcrypt hash. The seed command only writes after the test database identity has been verified.

Run the seed command after the test database is created, restored, or reset.

### Run Playwright

Run all tests in headless Chromium using the desktop Chrome and mobile profiles:

```bash
npm run test:e2e
```

Playwright performs the following sequence:

1. Loads `.env.test` and validates `DATABASE_URL`.
2. Starts the Next.js development server at `http://127.0.0.1:3100`.
3. Runs `tests/setup/global-setup.ts` once to verify the actual database, user, and E2E administrator.
4. Runs the tests with one worker against desktop Chrome and mobile.
5. Stops the Next.js server.

Run with a visible browser:

```bash
npm run test:e2e -- --headed
```

Open Playwright UI mode:

```bash
npm run test:e2e -- --ui
```

Run one test file:

```bash
npm run test:e2e -- tests/e2e/home.spec.ts
```

Run tests matching a title:

```bash
npm run test:e2e -- --grep "locale switcher"
```

The HTML report is written to `playwright-report`, and failure artifacts are written to `test-results`. Both directories are ignored by Git.

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
| `npm run test:e2e` | Run Playwright E2E tests |
| `npm run test:e2e:db:check` | Verify the configured test database and user |
| `npm run test:e2e:prepare-admin` | Create or update the E2E administrator |
| `npm run lint` | Biome, Stylelint, and TypeScript |
| `npm run prisma:validate` | Validate Prisma schema |
| `npm run prisma:generate` | Generate Prisma client |
| `npx prisma db push` | Apply schema to the database |
| `npx prisma studio` | Open Prisma Studio |

## License

The source code is available under the [MIT License](LICENSE).

Personal content, including CV data, photographs, written content, and branding, is not covered by the MIT License and may not be reused.
