/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "q58.pro",
      },
      {
        protocol: "https",
        hostname: "i-aws.czl.net",
      },
    ],
  },
};

export default nextConfig;
