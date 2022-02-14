const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const base = require('./webpack.base.js').generate('production');

/**
 * @type {import('webpack').Configuration}
 */
const config = {
    ...base,
    plugins: [
        ...base.plugins,
        new BundleAnalyzerPlugin({
            openAnalyzer: false,
        }),
    ],
};

module.exports = config;
