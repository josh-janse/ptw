import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow .md / .mdx files to act as pages and imports
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  // Keep options serializable so MDX works under Turbopack
});

export default withMDX(nextConfig);
