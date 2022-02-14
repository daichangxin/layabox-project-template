const path = require('path');
const DotenvWebpackPlugin = require('dotenv-webpack');

const base = require('./webpack.base.js').generate('production');

const resolve = (name) => {
    return path.join(__dirname, '..', name);
};

/**
 * @type {import('webpack').Configuration}
 */
const config = {
    ...base,
    plugins: [...base.plugins, new DotenvWebpackPlugin({ path: resolve('.env') })],
};
module.exports = config;
