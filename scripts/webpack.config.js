const path = require('path');
const os = require('os');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackResVersionPlugin = require('./webpack-res-version');

function resolve(name) {
    return path.join(__dirname, '..', name);
}

// 默认是prod
const isProd = process.env.PROJECT_BUILD_ENV !== 'development';

// 允许babel转换的目录和package
const allowBabelFiles = [
    resolve('node_modules/@pawgame'),
    resolve('node_modules/@shm-open'),
    resolve('node_modules/proxy-polyfill'),
    resolve('node_modules/pako'),
    resolve('bin/ext/fairygui.js'),
    resolve('tsc_outputs/src'),
];

// 压缩
const minimizer = isProd
    ? [
          new TerserPlugin({
              parallel: os.cpus().length,
              extractComments: false,
              terserOptions: {
                  output: { comments: false },
                  mangle: true,
              },
          }),
      ]
    : [];

/**
 * @type {import('webpack').Configuration}
 */
const webpackConfig = {
    mode: isProd ? 'production' : 'development',
    devtool: 'source-map',
    /** @type {import('webpack-dev-server').Configuration} */
    devServer: {
        static: {
            directory: resolve('bin'),
        },
        compress: true,
        port: 9000,
        open: true,
        hot: true, // default: true
    },
    entry: {
        libs: [
            resolve('node_modules/proxy-polyfill'),
            'whatwg-fetch',
            resolve('node_modules/@pawgame/js-layabox-core'),
            resolve('bin/ext/fairygui.js'),
        ],
        bundle: {
            import: [resolve('tsc_outputs/src/index.js')],
            dependOn: ['libs'],
        },
    },
    output: {
        filename: isProd ? 'js/[name].[contenthash:8].js' : 'js/[name].js',
        path: isProd ? resolve('outputs') : resolve('bin'),
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|mjs)$/,
                include: allowBabelFiles,
                resolve: {
                    fullySpecified: false,
                },
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                },
            },
        ].filter(Boolean),
    },
    plugins: [
        new HtmlWebpackPlugin({
            chunks: ['libs', 'bundle'],
            template: resolve('src/index.html'),
        }),
        isProd &&
            new WebpackResVersionPlugin({
                entry_path: resolve('bin/res'),
                output_path: resolve('outputs/res'),
                outputs_path: resolve('outputs'),
            }),
    ].filter(Boolean),
    optimization: {
        minimize: false,
        minimizer,
    },
};

module.exports = webpackConfig;
