import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AnimatedSection from "@/components/AnimatedSection";
import PageHeader from "@/components/PageHeader";
import BuyButton from "@/components/products/BuyButton";
import { formatProductPrice, getProduct, products } from "@/lib/products";

type ProductDetailsPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  return product
    ? {
        title: product.name,
        description: product.description,
      }
    : { title: "Product not found" };
}

export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) notFound();

  return (
    <main className="mb-32 text-gray-700 dark:text-neutral-400">
      <PageHeader backHref="/products" title={product.name} description={product.description} />

      <AnimatedSection delay="0.08s" className="mb-10">
        <section>
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <p className="font-mono text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">
              one-time purchase · USD
            </p>
            <p className="font-mono text-lg text-gray-900 dark:text-neutral-100">
              {formatProductPrice(product)}
            </p>
          </div>
          <ul className="mt-5 space-y-3">
            {product.features.map((feature) => (
              <li key={feature} className="flex gap-3 leading-relaxed">
                <span aria-hidden="true">—</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm leading-relaxed text-gray-600 dark:text-neutral-500">
            {product.delivery}
          </p>
          <div className="mt-5">
            <BuyButton slug={product.slug} />
          </div>
        </section>
      </AnimatedSection>
    </main>
  );
}
