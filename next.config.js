/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
    scrollRestoration: true,
    serverComponentsExternalPackages: [
      "prisma",
      "@prisma/client",
      "react-markdown",
      "rehype-raw",
      "react-syntax-highlighter",
      "next-auth/client",
    ],
  },
};

module.exports = nextConfig;
