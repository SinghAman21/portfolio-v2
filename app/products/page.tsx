import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import AnimatedSection from "@/components/AnimatedSection";
import BuyButton from "@/components/products/BuyButton";
import { formatProductPrice, products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products",
  description: "Developer products by Aman Singh.",
};

export default function ProductsPage() {
  return (
    <main className="mb-32 text-gray-700 dark:text-neutral-400">
      <PageHeader
        backHref="/"
        title="products"
        description="Small, useful things I’ve built and made available to other developers. All purchases are one-time payments in USD."
      />

      <div className="space-y-2">
        {products.map((product, index) => (
          <AnimatedSection key={product.slug} delay={`${0.1 + index * 0.08}s`} className="mb-10">
            <article>
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 grow">
                  <p className="font-mono text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">
                    one-time purchase · USD
                  </p>
                  <h2 className="mt-2 font-serif text-lg font-semibold text-gray-900 dark:text-neutral-100">
                    {product.name}
                  </h2>
                  <p className="mt-2 max-w-xl leading-relaxed">{product.description}</p>
                </div>
                <p className="shrink-0 pt-0.5 font-mono text-sm text-gray-900 dark:text-neutral-100">
                  {formatProductPrice(product)}
                </p>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                <Link className="underline underline-offset-4 hover:text-gray-900 dark:hover:text-neutral-100" href={`/products/${product.slug}`}>
                  view details
                </Link>
                <BuyButton slug={product.slug} />
              </div>
            </article>
          </AnimatedSection>
        ))}
      </div>
    </main>
  );
}
