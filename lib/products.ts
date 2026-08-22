export type Product = {
  slug: string;
  name: string;
  priceInCents: number;
  currency: "USD";
  description: string;
  features: string[];
  delivery: string;
  dodoProductIdEnv: string;
};

/** Public product information. Prices are kept here for display only. */
export const products: Product[] = [
  {
    slug: "yourbid-lol",
    name: "yourbid.lol template",
    priceInCents: 1000,
    currency: "USD",
    description:
      "A production-ready paid leaderboard template for founders who want to launch a public bidding board, sell attention, and validate demand without building payments, ranking, redirects, admin, and analytics from scratch.",
    features: [
      "Next.js template with public board, bid form, profile pages, redirect tracking, and protected admin panel",
      "Dodo Payments checkout and webhook flow wired for paid rankings and re-bid difference pricing",
      "Drizzle + PostgreSQL schema, migrations, click stats, Open Graph scraping, and BullMQ worker setup",
      "Reusable branding defaults, setup guide, environment template, and production deployment notes",
      "Private GitHub access with lifetime access to the current release and future updates included",
    ],
    delivery:
      "After purchase, GitHub repository access is delivered through Dodo Payments so you can clone, configure env variables, run migrations, and ship your own branded bidding board.",
    dodoProductIdEnv: "DODO_YOURBID_PRODUCT_ID",
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function formatProductPrice(product: Product) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: product.currency,
  }).format(product.priceInCents / 100);
}
