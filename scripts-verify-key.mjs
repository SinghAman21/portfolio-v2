import { readFileSync } from "fs";
const k = readFileSync(".env","utf8").split("\n")
  .find(l=>l.startsWith("SUPABASE_SERVICE_ROLE_KEY="))?.split("=").slice(1).join("=").trim() ?? "";
let role = "unknown";
if (k.startsWith("sb_secret_")) role = "service_role (new secret key)";
else if (k.startsWith("sb_publishable_")) role = "anon (publishable)";
else { try { role = JSON.parse(Buffer.from(k.split(".")[1],"base64url").toString()).role; } catch {} }
const ok = role.startsWith("service_role");
console.log(`${ok ? "✅" : "❌"} key role = ${role}`);
if (!ok) console.log("   -> This is still the WRONG key. Grab the 'secret'/'service_role' one.");
