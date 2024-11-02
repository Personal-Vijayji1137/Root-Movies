/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            hostname: 'img10.hotstar.com'
          },
        ],
      },
};

export default nextConfig;
