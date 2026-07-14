// Shared reaction config used by both the API and the client component.

export const REACTION_TYPES = [
  "like",
  "insightful",
  "fire",
  "mind_blown",
  "bookmarked",
] as const;

export type ReactionType = (typeof REACTION_TYPES)[number];

export const REACTIONS: { type: ReactionType; emoji: string; label: string }[] = [
  { type: "like", emoji: "👍", label: "Like" },
  { type: "insightful", emoji: "💡", label: "Insightful" },
  { type: "fire", emoji: "🔥", label: "Fire" },
  { type: "mind_blown", emoji: "🤯", label: "Mind blown" },
  { type: "bookmarked", emoji: "🔖", label: "Saved" },
];

export function isReactionType(value: unknown): value is ReactionType {
  return (
    typeof value === "string" &&
    (REACTION_TYPES as readonly string[]).includes(value)
  );
}

// Counts keyed by reaction type, with every type present (defaults to 0).
export type ReactionCounts = Record<ReactionType, number>;

export function emptyCounts(): ReactionCounts {
  return {
    like: 0,
    insightful: 0,
    fire: 0,
    mind_blown: 0,
    bookmarked: 0,
  };
}

export function normalizeCounts(
  raw: Partial<Record<string, number>> | null | undefined
): ReactionCounts {
  const counts = emptyCounts();
  if (raw) {
    for (const type of REACTION_TYPES) {
      counts[type] = Number(raw[type] ?? 0);
    }
  }
  return counts;
}
