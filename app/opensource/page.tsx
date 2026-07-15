"use client";

import PageHeader from "@/components/PageHeader";
import { OpenSourcePRs, Acknowledgments } from "@/lib/data";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { GitPullRequest, ExternalLink, Award, Star, Newspaper, Trophy, Package } from "lucide-react";
import { motion } from "motion/react";

const statusConfig = {
  merged: {
    label: "Merged",
    className: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    dot: "bg-purple-500",
  },
  open: {
    label: "Open",
    className: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
    dot: "bg-green-500",
  },
  closed: {
    label: "Closed",
    className: "bg-neutral-500/10 text-neutral-600 dark:text-neutral-400 border-neutral-500/20",
    dot: "bg-neutral-500",
  },
};

const ackIcons: Record<string, React.ReactNode> = {
  "Featured in Next.js Weekly": <Newspaper className="w-4 h-4" />,
  "GitHub Star Recommendation": <Star className="w-4 h-4" />,
  "Community Contributor Award": <Trophy className="w-4 h-4" />,
  "npm Package Spotlight": <Package className="w-4 h-4" />,
};

function extractRepoOwner(repo: string) {
  const [owner, name] = repo.split("/");
  return { owner, name };
}

export default function OpenSourcePage() {
  return (
    <main className="mb-32 text-gray-700 dark:text-neutral-400">
      <PageHeader
        backHref="/"
        title="open source"
        description="Contributions to open source projects and community acknowledgments."
      />

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8 mb-16"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/10">
            <GitPullRequest className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-neutral-100">
            Pull Requests
          </h2>
          <span className="text-sm text-gray-500 dark:text-neutral-500 font-mono">
            ({OpenSourcePRs.length})
          </span>
        </div>

        <div className="space-y-3">
          {OpenSourcePRs.map((pr, index) => {
            const { owner, name } = extractRepoOwner(pr.repo);
            const status = statusConfig[pr.status];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              >
                <Link
                  href={pr.prUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "group block p-4 rounded-xl",
                    "bg-white dark:bg-neutral-900",
                    "border border-gray-200 dark:border-neutral-800",
                    "hover:border-gray-300 dark:hover:border-neutral-700",
                    "hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgb(255,255,255,0.02)]",
                    "transition-all duration-300 ease-out"
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-neutral-500">
                          <span className="font-medium text-gray-700 dark:text-neutral-300">
                            {owner}
                          </span>
                          <span>/</span>
                          <span className="font-medium text-gray-900 dark:text-neutral-100">
                            {name}
                          </span>
                        </div>
                        <span className="text-gray-300 dark:text-neutral-700">·</span>
                        <span className="text-sm text-gray-500 dark:text-neutral-500 font-mono">
                          {pr.year}
                        </span>
                      </div>

                      <h3 className="text-base font-medium text-gray-900 dark:text-neutral-100 mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {pr.title}
                      </h3>

                      <p className="text-sm text-gray-600 dark:text-neutral-400 line-clamp-2">
                        {pr.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div
                        className={cn(
                          "flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border",
                          status.className
                        )}
                      >
                        <span className={cn("w-1.5 h-1.5 rounded-full", status.dot)} />
                        {status.label}
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 dark:text-neutral-600 group-hover:text-gray-600 dark:group-hover:text-neutral-400 transition-colors" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/10">
            <Award className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-neutral-100">
            Acknowledgments
          </h2>
          <span className="text-sm text-gray-500 dark:text-neutral-500 font-mono">
            ({Acknowledgments.length})
          </span>
        </div>

        <div
          className="relative"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div className="overflow-hidden group/marquee">
            <div className="flex w-fit gap-4 animate-[marquee_35s_linear_infinite] group-hover/marquee:[animation-play-state:paused]">
              {[...Acknowledgments, ...Acknowledgments, ...Acknowledgments].map(
                (ack, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex-shrink-0 w-[340px] p-5 rounded-xl",
                      "bg-gradient-to-br from-white to-gray-50 dark:from-neutral-900 dark:to-neutral-950",
                      "border border-gray-200 dark:border-neutral-800",
                      "hover:border-amber-500/30 dark:hover:border-amber-500/20",
                      "hover:shadow-[0_8px_30px_rgb(234,179,8,0.06)]",
                      "transition-all duration-300 ease-out"
                    )}
                  >
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="flex items-center justify-center w-6 h-6 rounded-md bg-gradient-to-br from-amber-400 to-orange-500 text-white">
                        {ackIcons[ack.title] || <Award className="w-3.5 h-3.5" />}
                      </div>
                      <span className="text-xs font-mono text-gray-500 dark:text-neutral-500 uppercase tracking-wider">
                        {ack.date}
                      </span>
                    </div>

                    <h3 className="text-sm font-semibold text-gray-900 dark:text-neutral-100 mb-2 line-clamp-1">
                      {ack.title}
                    </h3>

                    <p className="text-sm text-gray-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                      {ack.description}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <Link
            href="https://github.com/SinghAman21?tab=repositories&type=source"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg",
              "text-gray-600 dark:text-neutral-400",
              "bg-gray-100 dark:bg-neutral-800",
              "hover:bg-gray-200 dark:hover:bg-neutral-700",
              "hover:text-gray-900 dark:hover:text-neutral-100",
              "transition-all duration-200"
            )}
          >
            View all on GitHub
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </motion.section>

      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333333%);
          }
        }
      `}</style>
    </main>
  );
}