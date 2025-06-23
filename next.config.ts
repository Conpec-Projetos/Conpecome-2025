import { NextConfig } from 'next';

const config: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false
      };
    }
    return config;
  },
  images: {
    domains: [
      "firebasestorage.googleapis.com"
    ]
  }
};

export default config;
