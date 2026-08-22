import { redirect } from "next/navigation";

export default function MisspelledProductRoute() {
  redirect("/products/yourbid-lol");
}
