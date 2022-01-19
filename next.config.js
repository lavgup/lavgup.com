/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    typescript: {
      ignoreBuildErrors: true
    },
    eslint: {
      ignoreDuringBuilds: true
    },
    images: {
        domains: ['http.cat']
    },
    rewrites() {
        return [
            {
                source: '/bear.js',
                destination: 'https://cdn.panelbear.com/analytics.js',
            }
        ];
    }
};
