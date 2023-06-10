/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'drive-thirdparty.googleusercontent.com',
                port: '',
                pathname: '',
            },
        ],
    },
}

module.exports = nextConfig
