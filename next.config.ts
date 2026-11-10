import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: `next build` writes HTML/CSS/JS to `out/`.
  output: "export",
  // `/about` is exported as `about/index.html`, so any static host can serve it.
  trailingSlash: true,
  // Static exports cannot use the default image optimizer.
  images: { unoptimized: true },
};

export default nextConfig;
