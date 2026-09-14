import { createBlogsOgImage, ogImageSize } from "@/lib/blog-og-image";

export const runtime = "edge";
export const alt = "Aman Singh — Backend, Infrastructure, Full-Stack";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return createBlogsOgImage({
    title: "Aman Singh",
    subtitle: "Backend · Infrastructure · Full-Stack",
    footer: "building scalable systems",
  });
}
