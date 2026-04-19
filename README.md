This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, set up your environment variables:

```bash
# Copy the example environment file
cp .env.example .env.local

# Edit .env.local with your values
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Environment Variables

This project uses environment variables for configuration. The available variables are documented in `.env.example`.

- `.env.local` - Development environment (ignored by git)
- `.env.production` - Production environment (can be committed)
- `.env.example` - Template file showing available variables

### Key Variables

- `NEXT_PUBLIC_APP_ENV` - Current environment (development/production)
- `NEXT_PUBLIC_APP_URL` - Base URL of the application
- `NEXT_PUBLIC_ENABLE_ANALYTICS` - Enable/disable analytics tracking
- `NEXT_PUBLIC_ENABLE_EMAIL_CONTACT` - Enable/disable email contact form

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
