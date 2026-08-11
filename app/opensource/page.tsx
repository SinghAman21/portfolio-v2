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
import {
  contributions,
  statusMeta,
  type OpenSourceContribution,
} from "@/lib/oss-data";
import { cn } from "@/lib/utils";

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
  const contributionsByRepo = contributions.reduce<
    { repo: string; items: OpenSourceContribution[] }[]
  >((groups, contribution) => {
    const repoGroup = groups.find((group) => group.repo === contribution.repo);

    if (repoGroup) {
      repoGroup.items.push(contribution);
      return groups;
    }

    groups.push({ repo: contribution.repo, items: [contribution] });
    return groups;
  }, []);

  return (
    <main className="mb-32 text-gray-700 dark:text-neutral-400">
      <PageHeader
        backHref="/"
        title="open source"
        description="Public GitHub contributions across community tools, documentation, and developer infrastructure."
      />

      <AnimatedSection delay="0.08s" className="mb-10">
        <p className="text-gray-600 dark:text-neutral-400 leading-relaxed">
          {/*{contributions.length} contributions across {repoCount} repositories. {mergedCount} merged, {openCount} ongoing.*/}
        </p>
      </AnimatedSection>

      <div className="space-y-2">
        {contributionsByRepo.map(({ repo, items }) => (
          <section key={repo} className="mb-10">
            <AnimatedSection delay="0.1s" className="mb-5">
              <div className="flex items-baseline justify-between">
                <h2 className="text-lg font-serif font-semibold text-gray-900 dark:text-neutral-100">
                  {repo}
                </h2>
                <span className="text-sm text-gray-500 dark:text-neutral-500">
                  {items.length}
                </span>
              </div>
            </AnimatedSection>

            <div className="space-y-0">
              {items.map((contribution, index) => (
                <AnimatedListItem key={contribution.url} index={index}>
                  <OpenSourceItem contribution={contribution} />
                </AnimatedListItem>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
