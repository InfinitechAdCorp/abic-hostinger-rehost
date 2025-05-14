/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
      },
      {
        protocol: 'https',
        hostname: 'dmcicorporation.com',
      },
      {
        protocol: 'https',
        hostname: 'abicmanpowerservicecorp.com',
      },
      {
        protocol: 'https',
        hostname: 'dmci-agent-bakit.s3.amazonaws.com',
      },
     {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
      },
    ],
  },

};

module.exports = nextConfig;
