import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      }
    ]
  },
  // Ensure trailing slashes for consistent routing
  trailingSlash: false,
};

// module.exports = {
//   images: {
//     remotePatterns: [new URL('https://lh3.googleusercontent.com/**')],
//   },
// }

export default nextConfig;
