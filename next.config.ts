import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["static.www.nfl.com", "cdn.nba.com"], // Add the external domains here
  },
  // Other configurations can go here
};

export default nextConfig;
