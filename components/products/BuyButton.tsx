"use client";

import { useState } from "react";

export default function BuyButton({ slug }: { slug: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleBuy() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      const result: { checkout_url?: string; error?: string } = await response.json();

      if (!response.ok || !result.checkout_url) {
        throw new Error(result.error || "Unable to start checkout.");
      }

      window.location.href = result.checkout_url;
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : "Unable to start checkout.");
      setIsLoading(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleBuy}
        disabled={isLoading}
        className="border border-gray-900 px-4 py-2 text-sm text-gray-900 transition-colors hover:bg-gray-900 hover:text-white disabled:cursor-wait disabled:opacity-60 dark:border-neutral-300 dark:text-neutral-100 dark:hover:bg-neutral-100 dark:hover:text-neutral-900"
      >
        {isLoading ? "opening checkout…" : "buy now"}
      </button>
      {error && <p className="mt-3 text-sm text-red-700 dark:text-red-400">{error}</p>}
    </div>
  );
}
