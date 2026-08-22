import { PropsWithChildren } from "react";
import { GeistMono } from "geist/font/mono";
import { cn } from "@/lib/utils";

export default function ProductsLayout({ children }: PropsWithChildren) {
  return (
    <div
      className={cn(
        GeistMono.className,
        "text-sm sm:text-[13px] [text-rendering:geometricPrecision] container font-serif px-4 sm:px-6 lg:px-0",
      )}
    >
      {children}
    </div>
  );
}
