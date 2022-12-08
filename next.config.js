/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: `${process.env.BASE_API_URL ?? "http://localhost:8080"}/:path*`,
            },
        ];
    },
};

module.exports = nextConfig;
