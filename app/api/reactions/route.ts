import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getClientIp, hashIp } from "@/lib/ip";
import {
  isReactionType,
  normalizeCounts,
  type ReactionType,
} from "@/lib/reactions";

type StatsRow = {
  reaction_counts: Record<string, number> | null;
  view_count: number;
};

// GET /api/reactions?slug=my-post
// Returns aggregate counts + which reactions THIS visitor has already given.
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  if (!slug) {
    return NextResponse.json({ error: "slug required" }, { status: 400 });
  }

  try {
    const supabase = getSupabaseAdmin();
    const ipHash = hashIp(getClientIp(req));

    const [{ data: stats }, { data: mine }] = await Promise.all([
      supabase
        .from("blog_stats")
        .select("reaction_counts, view_count")
        .eq("blog_slug", slug)
        .maybeSingle<StatsRow>(),
      supabase
        .from("blog_reactions")
        .select("reaction_type")
        .eq("blog_slug", slug)
        .eq("ip_hash", ipHash)
        .returns<{ reaction_type: ReactionType }[]>(),
    ]);

    return NextResponse.json({
      counts: normalizeCounts(stats?.reaction_counts ?? null),
      viewCount: stats?.view_count ?? 0,
      reacted: (mine ?? []).map((r) => r.reaction_type),
    });
  } catch (err) {
    console.error("GET /api/reactions failed:", err);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}

// POST /api/reactions  { slug, reaction }
// Toggles a single reaction for this visitor (add if absent, remove if present).
export async function POST(req: NextRequest) {
  let body: { slug?: string; reaction?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  const { slug, reaction } = body;
  if (!slug || !isReactionType(reaction)) {
    return NextResponse.json(
      { error: "slug and valid reaction required" },
      { status: 400 }
    );
  }

  try {
    const supabase = getSupabaseAdmin();
    const ipHash = hashIp(getClientIp(req));

    // Is this reaction already present for this visitor?
    const { data: existing } = await supabase
      .from("blog_reactions")
      .select("id")
      .eq("blog_slug", slug)
      .eq("reaction_type", reaction)
      .eq("ip_hash", ipHash)
      .maybeSingle<{ id: string }>();

    let active: boolean;
    if (existing) {
      const { error } = await supabase
        .from("blog_reactions")
        .delete()
        .eq("id", existing.id);
      if (error) throw error;
      active = false;
    } else {
      const { error } = await supabase
        .from("blog_reactions")
        .insert([{ blog_slug: slug, reaction_type: reaction, ip_hash: ipHash }]);
      // 23505 = unique violation (double-click race) — treat as already-added, not an error.
      if (error && error.code !== "23505") throw error;
      active = true;
    }

    // Trigger has refreshed blog_stats; read the fresh counts back.
    const { data: stats } = await supabase
      .from("blog_stats")
      .select("reaction_counts")
      .eq("blog_slug", slug)
      .maybeSingle<Pick<StatsRow, "reaction_counts">>();

    return NextResponse.json({
      active,
      counts: normalizeCounts(stats?.reaction_counts ?? null),
    });
  } catch (err) {
    console.error("POST /api/reactions failed:", err);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
