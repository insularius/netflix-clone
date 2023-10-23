/** @type {import('next').NextConfig} */
const nextConfig = {};
module.exports = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["example.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },
};
