import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/database.types";

// Server-only Supabase client. Uses the service_role key, so it must NEVER be
// imported into a client component. All reaction/view writes go through here.
//
// Required env vars (add to .env.local — see .env.example):
//   NEXT_PUBLIC_SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY
//   IP_HASH_SALT

let cached: ReturnType<typeof createClient<Database>> | null = null;

export function getSupabaseAdmin() {
  if (cached) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Supabase env vars missing: set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY"
    );
  }

  cached = createClient<Database>(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
