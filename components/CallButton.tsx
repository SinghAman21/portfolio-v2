"use client";

import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
export default function CalButton() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({});
      cal("ui", {
        styles: { branding: { brandColor: "#000000" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);
  return (
    <button
      className="px-3 py-2 border border-gray-300 dark:border-neutral-700 bg-gray-100 dark:bg-neutral-800 rounded p-1 text-sm inline-flex items-center leading-4 text-gray-900 dark:text-neutral-100 mb-2"
      data-cal-namespace=""
      data-cal-link="avik-mukherjee-2fq9cw/30min"
      data-cal-config='{"layout":"month_view"}'
    >
      Book a Call
    </button>
  );
}