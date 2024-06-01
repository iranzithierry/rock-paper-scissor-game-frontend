/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'ui-avatars.com',
                port: '',
                pathname: '**',
            },
            {
                protocol: 'http',
                hostname: '127.0.0.1',
                port: '',
                pathname: '**',
            },
        ],
    },
    async redirects() {
        return [
            {
                source: "/github",
                destination: "https://github.com/iranzithierry/skizzy",
                permanent: false,
            },
        ];
    },
};

export default nextConfig;
