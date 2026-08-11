export type ContributionKind = "pr" | "issue";
export type ContributionStatus = "open" | "merged" | "closed";
export interface OpenSourceContribution {
  kind: ContributionKind;
  repo: string;
  number: number;
  title: string;
  status: ContributionStatus;
  url: string;
}

export const contributions: OpenSourceContribution[] = [
  {
    kind: "pr",
    repo: "Graphify-Labs/graphify",
    number: 1973,
    title: "feat(export): add --with-sources to wire Obsidian notes to source content",
    status: "open",
    url: "https://github.com/Graphify-Labs/graphify/pull/1973",
  },
  {
    kind: "pr",
    repo: "Graphify-Labs/graphify",
    number: 2105,
    title: "fix(fortran): map source_location back through cpp linemarkers",
    status: "open",
    url: "https://github.com/Graphify-Labs/graphify/pull/2105",
  },
  {
    kind: "issue",
    repo: "Graphify-Labs/graphify",
    number: 2092,
    title: "Fortran preprocessor line numbers produce wrong source locations",
    status: "open",
    url: "https://github.com/Graphify-Labs/graphify/issues/2092",
  },
  {
    kind: "pr",
    repo: "Graphify-Labs/graphify",
    number: 2611,
    title: "fix(python): avoid crash resolving overdeep relative imports (#2605)",
    status: "merged",
    url: "https://github.com/Graphify-Labs/graphify/pull/2611",
  },
  {
    kind: "pr",
    repo: "helm/helm-www",
    number: 2200,
    title: "fix(boat): scrub hero-to-badge transition with scroll progress",
    status: "merged",
    url: "https://github.com/helm/helm-www/pull/2200",
  },
  {
    kind: "pr",
    repo: "Graphify-Labs/graphify",
    number: 1942,
    title: "fix(cache): key semantic cache on the extraction prompt",
    status: "merged",
    url: "https://github.com/Graphify-Labs/graphify/pull/1942",
  },
  {
    kind: "pr",
    repo: "Graphify-Labs/graphify",
    number: 1947,
    title: "fix(extract): anchor source_file on the scan root, not the --out dir",
    status: "merged",
    url: "https://github.com/Graphify-Labs/graphify/pull/1947",
  },
  {
    kind: "pr",
    repo: "Jpisnice/shadcn-ui-mcp-server",
    number: 39,
    title: "Tweakcn integration Issue #38",
    status: "merged",
    url: "https://github.com/Jpisnice/shadcn-ui-mcp-server/pull/39",
  },
  {
    kind: "pr",
    repo: "PerformanC/NodeLink",
    number: 155,
    title: "Woc issue #150 fix",
    status: "merged",
    url: "https://github.com/PerformanC/NodeLink/pull/155",
  },
  {
    kind: "pr",
    repo: "PerformanC/NodeLink",
    number: 153,
    title: "fix: correctly decode and validate basic auth for metrics",
    status: "merged",
    url: "https://github.com/PerformanC/NodeLink/pull/153",
  },
  {
    kind: "pr",
    repo: "browseping/web",
    number: 15,
    title: "feat: auto-sliding marquee-style carousel",
    status: "merged",
    url: "https://github.com/browseping/web/pull/15",
  },
  {
    kind: "issue",
    repo: "Graphify-Labs/graphify",
    number: 2062,
    title: "graphify uninstall deletes user-written content",
    status: "closed",
    url: "https://github.com/Graphify-Labs/graphify/issues/2062",
  },
  {
    kind: "issue",
    repo: "Graphify-Labs/graphify",
    number: 2091,
    title: "Default dedup discards a same-ID node's attributes instead of merging them",
    status: "closed",
    url: "https://github.com/Graphify-Labs/graphify/issues/2091",
  },
  {
    kind: "pr",
    repo: "Graphify-Labs/graphify",
    number: 1884,
    title: "fix(dedup): correct id-collision warning and prefer defining file",
    status: "closed",
    url: "https://github.com/Graphify-Labs/graphify/pull/1884",
  },
  {
    kind: "pr",
    repo: "Graphify-Labs/graphify",
    number: 1926,
    title: "fix(build): make semantic id-remap idempotent for dot-dir files",
    status: "closed",
    url: "https://github.com/Graphify-Labs/graphify/pull/1926",
  },
  {
    kind: "pr",
    repo: "Graphify-Labs/graphify",
    number: 2104,
    title: "fix(dedup): merge same-ID node attributes instead of discarding them",
    status: "closed",
    url: "https://github.com/Graphify-Labs/graphify/pull/2104",
  },
];

export const statusMeta = {
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
} satisfies Record<ContributionStatus, { label: string; className: string }>;
