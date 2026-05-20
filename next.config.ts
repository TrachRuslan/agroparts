import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/catalog/umz", destination: "/catalog/yumz", permanent: true },
      { source: "/catalog/umz/:path*", destination: "/catalog/yumz/:path*", permanent: true },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
