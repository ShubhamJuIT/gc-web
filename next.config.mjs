/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    i18n: {
        locales: ['en'],
        defaultLocale: 'en',
    },
    sassOptions: {
        includePaths: ["./src"],
    },
    images: {

        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.digitaloceanspaces.com',
            },
            {
                protocol: 'https',
                hostname: '**.ekodemy.xyz',
            },
            {
                protocol: 'https',
                hostname: '**.ekodemy.in',
            },
            {
                protocol: 'https',
                hostname: 'images.pexels.com',
            },
            {
                protocol: 'https',
                hostname: 'randomuser.me',
            },

        ],
    },
}

export default nextConfig;
