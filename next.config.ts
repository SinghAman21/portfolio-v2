import type { NextConfig } from "next";
import createMDX from "@next/mdx";


const nextConfig: NextConfig = {
  /* config options here */
  productionBrowserSourceMaps: true,
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      path: false,
    };
    return config;
  },
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  async rewrites() {
    return [
      {
        source: "/experiments/:slug\\.md",
        destination: "/experiments.md/:slug",
      },
    ];
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

export default withMDX(nextConfig);
