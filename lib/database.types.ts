// Minimal hand-written types for the blog-reactions tables so the Supabase
// client is fully typed. If you later add more tables, regenerate with:
//   npx supabase gen types typescript --project-id <id> > lib/database.types.ts

import type { ReactionType } from "@/lib/reactions";

export type Database = {
  public: {
    Tables: {
      blog_reactions: {
        Row: {
          id: string;
          blog_slug: string;
          reaction_type: ReactionType;
          ip_hash: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          blog_slug: string;
          reaction_type: ReactionType;
          ip_hash: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["blog_reactions"]["Insert"]>;
        Relationships: [];
      };
      blog_stats: {
        Row: {
          blog_slug: string;
          view_count: number;
          reaction_counts: Record<string, number>;
          updated_at: string;
        };
        Insert: {
          blog_slug: string;
          view_count?: number;
          reaction_counts?: Record<string, number>;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["blog_stats"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<never, never>;
    Functions: {
      increment_view: {
        Args: { p_slug: string };
        Returns: number;
      };
    };
    Enums: Record<never, never>;
    CompositeTypes: Record<never, never>;
  };
};
