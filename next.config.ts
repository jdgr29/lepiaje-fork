import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [{
      source: "/about",
      destination: "/aboutUs"
    }
    ]
  },
  experimental: {
    esmExternals: "loose"
  },
  images: {
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
