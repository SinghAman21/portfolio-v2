import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "Aman Singh",
		short_name: "Avik",
		description:
			"Full-stack software developer specializing in Next.js, React, and TypeScript. Portfolio, projects, and writing by Aman Singh",
		start_url: "/",
		id: "com.avikmukherjee",
		display: "standalone",
		background_color: "#ffffff",
		theme_color: "#000000",
		icons: [
			{
				src: "/my-favicon/web-app-manifest-192x192.png",
				sizes: "192x192",
				type: "image/png",
				purpose: "any",
			},
			{
				src: "/my-favicon/web-app-manifest-512x512.png",
				sizes: "512x512",
				type: "image/png",
				purpose: "any",
			},
		],
	};
}