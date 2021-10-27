const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
const config = {
    reactStrictMode: true,
    images: {
        domains: ['http.cat']
    },
    webpack: (config, { dev, isServer}) => {
        if (!isServer && !dev) {
            Object.assign(config.resolve.alias, {
                react: 'preact/compat',
                'react-dom/test-utils': 'preact/test-utils',
                'react-dom': 'preact/compat'
            });
        }

        return config;
    },
    rewrites() {
        return [
            {
                source: '/bear.js',
                destination: 'https://cdn.panelbear.com/analytics.js',
            }
        ];
    }
}

module.exports = withContentlayer()(config);
