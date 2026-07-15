import { createHash } from "crypto";
import type { NextRequest } from "next/server";

// Best-effort client IP from the proxy headers Vercel/most hosts set.
export function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

// Salted SHA-256 so the stored value is not a reversible fingerprint of the IP.
// The salt lives in an env var, never in the DB.
export function hashIp(ip: string): string {
  const salt = process.env.IP_HASH_SALT ?? "";
  return createHash("sha256").update(`${ip}:${salt}`).digest("hex");
}
