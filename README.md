# Mint Issue Tracker

Next.js issue tracker with MySQL. Anyone can view issues; sign in to create, edit, or delete.

## Run locally

Start MAMP MySQL and create a database called `issue_tracker`.

```bash
npm install
cp .env.example .env
```

Set `AUTH_SECRET` in `.env`. Check the MySQL host/port/password match MAMP.

```bash
npx prisma migrate dev
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Login

Add a `User` in Prisma Studio (`npx prisma studio`). Store a bcrypt hash, not a plain password:

```bash
node -e "require('bcryptjs').hash('your-password', 10).then(console.log)"
```
