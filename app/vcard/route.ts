import { NextResponse } from "next/server";
import VCard from "vcard-creator";
import { Experience } from "@/lib/data";

const baseUrl = "https://useraman.me";

// User information matching the portfolio
const userInfo = {
  firstName: "Aman",
  lastName: "Singh",
  email: "work.singhaman@gmail.com",
  address: "Mumbai, India",
  website: baseUrl,
  // Use PNG image as vCard only supports JPEG, PNG, and GIF (not WebP)
  avatar: `${baseUrl}/my-favicon/web-app-manifest-512x512.png`,
  username: "singhaman21",
};

export const dynamic = "force-static";

export async function GET() {
  const card = new VCard();

  // Add basic information
  card
    .addName(userInfo.lastName, userInfo.firstName)
    .addEmail(userInfo.email)
    .addAddress(userInfo.address)
    .addURL(userInfo.website);

  // Add current job from experience
  const currentJob = Experience.find((exp) =>
    exp.year.includes("Present") || exp.year.includes("2025")
  );

  if (currentJob) {
    card.addCompany(currentJob.company).addJobtitle(currentJob.title);
  }

  // Try to add photo (optional, won't fail if it doesn't work)
  try {
    const photo = await getVCardPhoto(userInfo.avatar);
    if (photo) {
      card.addPhoto(photo.image, photo.mime);
    }
  } catch (error) {
    // Silently fail if photo can't be loaded
    console.error("Failed to load vCard photo:", error);
  }

  return new NextResponse(card.toString(), {
    status: 200,
    headers: {
      "Content-Type": "text/x-vcard; charset=utf-8",
      "Content-Disposition": `attachment; filename="${userInfo.username}-vcard.vcf"`,
    },
  });
}

async function getVCardPhoto(url: string) {
  try {
    // Use absolute URL if relative
    const imageUrl = url.startsWith("http") ? url : `${baseUrl}${url}`;
    const res = await fetch(imageUrl);

    if (!res.ok) {
      return null;
    }

    const buffer = Buffer.from(await res.arrayBuffer());
    if (buffer.length === 0) {
      return null;
    }

    const contentType = res.headers.get("Content-Type") || "";
    if (!contentType.startsWith("image/")) {
      return null;
    }

    // vCard format only supports JPEG, PNG, and GIF
    // Skip WebP and other unsupported formats
    let mime: string | null = null;
    if (contentType.includes("jpeg") || contentType.includes("jpg")) {
      mime = "jpeg";
    } else if (contentType.includes("png")) {
      mime = "png";
    } else if (contentType.includes("gif")) {
      mime = "gif";
    } else {
      // Unsupported format (e.g., webp)
      return null;
    }

    // Convert to base64
    const image = buffer.toString("base64");

    return {
      image,
      mime,
    };
  } catch {
    return null;
  }
}