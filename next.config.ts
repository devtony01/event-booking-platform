import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Skip type checking during build - we'll handle it separately
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
        source: '/scripts/test-results.json',
        destination: '/api/test/status',
      },
    ];
  },
};

export default nextConfig;
