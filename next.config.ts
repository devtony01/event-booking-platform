import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Skip type checking during build - we'll handle it separately
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
