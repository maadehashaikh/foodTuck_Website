import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["cdn.sanity.io"],
  },
  typescript:{
    ignoreBuildErrors: true,
  }as any,
};
export default nextConfig;
