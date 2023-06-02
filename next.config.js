/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "s.gravatar.com",
      "media.licdn.com",
    ],
  },
};

module.exports = nextConfig;
