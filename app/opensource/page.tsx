import Link from "next/link";
import {
  CircleCheck,
  CircleDot,
  GitMerge,
  GitPullRequest,
  GitPullRequestClosed,
} from "lucide-react";

import AnimatedListItem from "@/components/AnimatedListItem";
import AnimatedSection from "@/components/AnimatedSection";
import CornerMarkers from "@/components/CornerMarkers";
import PageHeader from "@/components/PageHeader";
import { cn } from "@/lib/utils";

type ContributionKind = "pr" | "issue";
type ContributionStatus = "open" | "merged" | "closed";

interface OpenSourceContribution {
  group: "Ongoing" | "Merged" | "Closed";
  kind: ContributionKind;
  repo: string;
  number: number;
  title: string;
  status: ContributionStatus;
  year: string;
  url: string;
}

const contributions: OpenSourceContribution[] = [
  {
    group: "Ongoing",
    kind: "pr",
    repo: "Graphify-Labs/graphify",
    number: 1973,
    title: "feat(export): add --with-sources to wire Obsidian notes to source content",
    status: "open",
    year: "2026",
    url: "https://github.com/Graphify-Labs/graphify/pull/1973",
  },
  {
    group: "Ongoing",
    kind: "pr",
    repo: "Graphify-Labs/graphify",
    number: 2105,
    title: "fix(fortran): map source_location back through cpp linemarkers",
    status: "open",
    year: "2026",
    url: "https://github.com/Graphify-Labs/graphify/pull/2105",
  },
  {
    group: "Ongoing",
    kind: "issue",
    repo: "Graphify-Labs/graphify",
    number: 2092,
    title: "Fortran preprocessor line numbers produce wrong source locations",
    status: "open",
    year: "2026",
    url: "https://github.com/Graphify-Labs/graphify/issues/2092",
  },
  {
    group: "Merged",
    kind: "pr",
    repo: "helm/helm-www",
    number: 2200,
    title: "fix(boat): scrub hero-to-badge transition with scroll progress",
    status: "merged",
    year: "2026",
    url: "https://github.com/helm/helm-www/pull/2200",
  },
  {
    group: "Merged",
    kind: "pr",
    repo: "Jpisnice/shadcn-ui-mcp-server",
    number: 39,
    title: "Tweakcn integration Issue #38",
    status: "merged",
    year: "2025",
    url: "https://github.com/Jpisnice/shadcn-ui-mcp-server/pull/39",
  },
  {
    group: "Merged",
    kind: "pr",
    repo: "PerformanC/NodeLink",
    number: 155,
    title: "Woc issue #150 fix",
    status: "merged",
    year: "2026",
    url: "https://github.com/PerformanC/NodeLink/pull/155",
  },
  {
    group: "Merged",
    kind: "pr",
    repo: "PerformanC/NodeLink",
    number: 153,
    title: "fix: correctly decode and validate basic auth for metrics",
    status: "merged",
    year: "2026",
    url: "https://github.com/PerformanC/NodeLink/pull/153",
  },
  {
    group: "Merged",
    kind: "pr",
    repo: "browseping/web",
    number: 15,
    title: "feat: auto-sliding marquee-style carousel",
    status: "merged",
    year: "2026",
    url: "https://github.com/browseping/web/pull/15",
  },
  {
    group: "Closed",
    kind: "pr",
    repo: "Graphify-Labs/graphify",
    number: 1884,
    title: "fix(dedup): correct id-collision warning and prefer defining file",
    status: "closed",
    year: "2026",
    url: "https://github.com/Graphify-Labs/graphify/pull/1884",
  },
  {
    group: "Closed",
    kind: "pr",
    repo: "Graphify-Labs/graphify",
    number: 1926,
    title: "fix(build): make semantic id-remap idempotent for dot-dir files",
    status: "closed",
    year: "2026",
    url: "https://github.com/Graphify-Labs/graphify/pull/1926",
  },
  {
    group: "Closed",
    kind: "issue",
    repo: "Graphify-Labs/graphify",
    number: 2062,
    title: "graphify uninstall deletes user-written content",
    status: "closed",
    year: "2026",
    url: "https://github.com/Graphify-Labs/graphify/issues/2062",
  },
  {
    group: "Closed",
    kind: "pr",
    repo: "Graphify-Labs/graphify",
    number: 2104,
    title: "fix(dedup): merge same-ID node attributes instead of discarding them",
    status: "closed",
    year: "2026",
    url: "https://github.com/Graphify-Labs/graphify/pull/2104",
  },
  {
    group: "Closed",
    kind: "issue",
    repo: "Graphify-Labs/graphify",
    number: 2091,
    title: "Default dedup discards a same-ID node's attributes instead of merging them",
    status: "closed",
    year: "2026",
    url: "https://github.com/Graphify-Labs/graphify/issues/2091",
  },
  {
    group: "Closed",
    kind: "pr",
    repo: "Graphify-Labs/graphify",
    number: 1942,
    title: "fix(cache): key semantic cache on the extraction prompt",
    status: "closed",
    year: "2026",
    url: "https://github.com/Graphify-Labs/graphify/pull/1942",
  },
  {
    group: "Closed",
    kind: "pr",
    repo: "Graphify-Labs/graphify",
    number: 1947,
    title: "fix(extract): anchor source_file on the scan root, not the --out dir",
    status: "closed",
    year: "2026",
    url: "https://github.com/Graphify-Labs/graphify/pull/1947",
  },
];

const groups = ["Ongoing", "Merged", "Closed"] as const;

const statusMeta = {
  open: {
    label: "open",
    className: "text-green-600 dark:text-green-400",
  },
  merged: {
    label: "merged",
    className: "text-purple-600 dark:text-purple-400",
  },
  closed: {
    label: "closed",
    className: "text-red-600 dark:text-red-400",
  },
};

function getContributionIcon(contribution: OpenSourceContribution) {
  if (contribution.kind === "issue") {
    return contribution.status === "open" ? CircleDot : CircleCheck;
  }

  if (contribution.status === "merged") {
    return GitMerge;
  }

  return contribution.status === "open" ? GitPullRequest : GitPullRequestClosed;
}

function getContributionColor(contribution: OpenSourceContribution) {
  if (contribution.kind === "issue" && contribution.status === "closed") {
    return "text-purple-600 dark:text-purple-400";
  }

  return statusMeta[contribution.status].className;
}

function OpenSourceItem({ contribution }: { contribution: OpenSourceContribution }) {
  const status = statusMeta[contribution.status];
  const Icon = getContributionIcon(contribution);

  return (
    <div className="mb-8">
      <div className="flex justify-between items-start mb-1">
        <Link
          href={contribution.url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "group flex items-start justify-between gap-4 w-full",
            "hover:outline-[0.5px] outline-offset-[6px] hover:outline-gray-400/50 dark:hover:outline-neutral-600/50",
            "relative"
          )}
        >
          <CornerMarkers />
          <div className="min-w-0 grow">
            <h3 className="font-medium text-gray-800 dark:text-neutral-200 underline decoration-gray-400 dark:decoration-neutral-400/50 underline-offset-[3px] transition-colors group-hover:text-gray-900 dark:group-hover:text-white">
              {contribution.title}
            </h3>
            <p className="mt-2 text-gray-600 dark:text-neutral-400">
              {contribution.repo} · {contribution.kind === "pr" ? "PR" : "Issue"} #{contribution.number}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2 pt-0.5 text-sm text-gray-600 dark:text-neutral-500">
            <span className={cn("inline-flex items-center gap-1.5", getContributionColor(contribution))}>
              <Icon className="h-4 w-4" />
              {status.label}
            </span>
            <span className="hidden sm:inline">{contribution.year}</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default function OpenSourcePage() {
  const mergedCount = contributions.filter((item) => item.status === "merged").length;
  const openCount = contributions.filter((item) => item.status === "open").length;
  const repoCount = new Set(contributions.map((item) => item.repo)).size;

  return (
    <main className="mb-32 text-gray-700 dark:text-neutral-400">
      <PageHeader
        backHref="/"
        title="open source"
        description="Public GitHub contributions across community tools, documentation, and developer infrastructure."
      />

      <AnimatedSection delay="0.08s" className="mb-10">
        <p className="text-gray-600 dark:text-neutral-400 leading-relaxed">
          {contributions.length} contributions across {repoCount} repositories. {mergedCount} merged, {openCount} ongoing.
        </p>
      </AnimatedSection>

      <div className="space-y-2">
        {groups.map((group) => {
          const groupItems = contributions.filter((item) => item.group === group);

          return (
            <section key={group} className="mb-10">
              <AnimatedSection delay="0.1s" className="mb-5">
                <div className="flex items-baseline justify-between">
                  <h2 className="text-lg font-serif font-semibold text-gray-900 dark:text-neutral-100">
                    {group.toLowerCase()}
                  </h2>
                  <span className="text-sm text-gray-500 dark:text-neutral-500">
                    {groupItems.length}
                  </span>
                </div>
              </AnimatedSection>

              <div className="space-y-0">
                {groupItems.map((contribution, index) => (
                  <AnimatedListItem key={contribution.url} index={index}>
                    <OpenSourceItem contribution={contribution} />
                  </AnimatedListItem>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
