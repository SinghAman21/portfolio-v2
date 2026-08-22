import type { Metadata } from "next";
import AnimatedSection from "@/components/AnimatedSection";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Purchase received",
};

export default function ProductSuccessPage() {
  return (
    <main className="mb-32 text-gray-700 dark:text-neutral-400">
      <PageHeader
        backHref="/products"
        title="purchase received"
        description="Thanks for your purchase. Dodo Payments is processing the order and will deliver your GitHub access after fulfillment."
      />
      <AnimatedSection delay="0.08s" className="mb-10">
        <p className="max-w-xl leading-relaxed">
          Check the email address used at checkout for Dodo’s delivery instructions. You may need to authorize GitHub before access can be granted.
        </p>
      </AnimatedSection>
      <Link className="text-sm underline underline-offset-4 hover:text-gray-900 dark:hover:text-neutral-100" href="/products">
        return to products
      </Link>
    </main>
  );
}
