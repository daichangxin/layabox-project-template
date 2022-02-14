const base = require('./webpack.base.js').generate('production');

/**
 * @type {import('webpack').Configuration}
 */
const config = { ...base };
module.exports = config;
