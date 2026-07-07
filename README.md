# Eugine Kunitsa CV project

Main stack: TS | NEXT.JS v16 | NEXT-INTL | SCSS

Code quality tools: BIOME | STYLELINT | HUSKY

Node.js version - 24.18.0

Result url - https://ekunitsa.com/

## Admin panel (postgresql, prisma, next-auth)

If you want to deploy this locally, you will need to manually create an "administrator" user in the database. Registration is not provided.

### For start

- `npm i`
- Prepare the .env file following the example in .env.example
- `npx prisma generate` - for preparing the prisma
- `npx prisma db push` - for push database scheme
- `npm run dev`

### For build

- `npm run build`
