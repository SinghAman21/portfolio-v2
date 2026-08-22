This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Products and Dodo Payments

The `/products` route lists the products in `lib/products.ts`. The included `yourbid-lol` product uses a one-time `$10.00 USD` Dodo Payments checkout and is configured to deliver private GitHub repository access through Dodo’s GitHub entitlement system.

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

Before accepting live payments in the Dodo dashboard:

1. Create a one-time product named `yourbid-lol` priced at `$10.00 USD`.
2. Create a GitHub entitlement for the private repository, use the least privilege needed (usually `pull`), and attach it to the product.
3. Set `DODO_YOURBID_PRODUCT_ID` to that product’s ID.
4. Use `test_mode` and a test product while developing, then switch to `live_mode` and the live product ID for production.
5. Configure Dodo’s entitlement/webhook delivery in the dashboard. GitHub access is delivered by Dodo after the purchaser authorizes GitHub; the browser return page alone does not grant access.

The checkout API always requests `USD` and disables currency selection. Keep `DODO_PAYMENTS_API_KEY` and all other secrets server-side.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
