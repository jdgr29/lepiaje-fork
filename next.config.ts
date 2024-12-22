import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    esmExternals: "loose"
  
  },

  serverExternalPackages: ["mongoose"],
  webpack: (config) => {
    config.experiments = {
      topLevelAwait: true,
      layers:true
      
    }
    return config;
  }
};

export default nextConfig;
