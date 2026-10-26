"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/footer/footer";
import KeyboardNavigation from "@/components/KeyboardNavigation";
import CursorSkeleton from "@/components/CursorSkeleton";

export default function PortfolioChrome() {
  const pathname = usePathname();
  if (pathname === "/" || pathname === "/workspace") return null;
  return <><Footer/><KeyboardNavigation/><CursorSkeleton/></>;
}
