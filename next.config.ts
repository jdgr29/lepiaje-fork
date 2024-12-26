import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    esmExternals: "loose"
  },

  images: {
    loader: "default",
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "picsum.photos",
      }
    ]
  },

  serverExternalPackages: ["mongoose"],
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallbe
      , fs: false
    },
      config.experiments = {
        topLevelAwait: true,
        layers: true

      }
    return config;
  }
};

export default nextConfig;
