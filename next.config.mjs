/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            hostname: 'dpke1x8afem0x.cloudfront.net'
          },
        ],
      },
};

export default nextConfig;
