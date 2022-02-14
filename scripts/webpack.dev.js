const path = require('path');
const base = require('./webpack.base.js').generate('development');

const resolve = (name) => {
    return path.join(__dirname, '..', name);
};

/**
 * @type {import('webpack').Configuration}
 */
const config = {
    ...base,
    /** @type {import('webpack-dev-server').Configuration} */
    devServer: {
        static: {
            directory: resolve('bin'),
        },
        compress: true,
        host: 'local-ipv4',
        port: 9000,
        open: true,
        hot: true, // default: true
    },
};

module.exports = config;
