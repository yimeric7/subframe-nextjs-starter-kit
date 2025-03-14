/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        reactCompiler: true,
    },
    // Setting to ensure compatibility with Cloudflare Pages
    output: 'standalone',
    // Strict mode can help catch issues during development
    reactStrictMode: true,
    eslint: {
        // Don't stop production builds if there are ESLint errors
        ignoreDuringBuilds: true,
    },
    typescript: {
        // Don't stop production builds if there are TypeScript errors
        ignoreBuildErrors: true,
    }
}

module.exports = nextConfig
