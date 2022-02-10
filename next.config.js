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
        domains: ['http.cat', 's3.us-west-2.amazonaws.com']
    },
    rewrites() {
        return [
            {
                source: '/bear.js',
                destination: 'https://cdn.panelbear.com/analytics.js'
            }
        ];
    }
};
