"use client";

import { useState } from "react";
import { DownloadIcon, PrinterIcon } from "lucide-react";

export default function ResumeActions() {
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 100);
  };

  const resumeUrl =
    "https://docs.google.com/document/d/1KZ0hvzUtQV_F0gGc8Bw6j5E-RsyaFhx6OXhyzdu_r5Y/edit?usp=sharing";

  const handleDownload = () => {
    window.open(resumeUrl, "_blank");
  };

  return (
    <div className="mb-8 print:hidden mt-8 animate-[slideFadeUp_0.3s_ease-out]">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-col">
          <button
            onClick={handlePrint}
            disabled={isPrinting}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-neutral-800 hover:bg-gray-300 dark:hover:bg-neutral-700 text-gray-800 dark:text-neutral-200 rounded-lg transition-colors disabled:opacity-50"
          >
            <PrinterIcon className="w-4 h-4" />
            {isPrinting ? "Preparing..." : "Print this page"}
          </button>
          <p className="text-xs text-gray-600 dark:text-neutral-500 mt-1">
            Save this page as PDF
          </p>
        </div>

        <div className="flex flex-col">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-neutral-800 hover:bg-gray-300 dark:hover:bg-neutral-700 text-gray-800 dark:text-neutral-200 rounded-lg transition-colors"
          >
            <DownloadIcon className="w-4 h-4" />
            Download Google Docs Version
          </button>
          <p className="text-xs text-gray-600 dark:text-neutral-500 mt-1">
            Download Google Docs Version
          </p>
        </div>
      </div>
    </div>
  );
}
