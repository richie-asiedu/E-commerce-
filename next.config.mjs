/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: '/E-commerce-',
    assetPrefix: '/E-commerce-',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com',
                pathname: '**',
            },
        ],
    },
};

export default nextConfig;
