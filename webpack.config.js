const webpack = require('webpack');
require('dotenv').config();
const path = require('path');
const isDev = process.env.NODE_ENV !== 'production';

const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const optimization = () => {
    const config = {};
    if (!isDev) {
        config.minimizer = [
            new UglifyJsPlugin({
                test: /\.js(\?.*)?$/i,
                compress: {},
                parse: {},
                keep_fnames: false,
                mangle: true,
                output: null,
                ie8: true,
                parallel: true,
                cache: true,
                warnings: 'verbose',
                extractComments: 'all',
            })
        ]
    }
    return config;
};
const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;
const babelLoader = (add = 'js') => {

    let preset = [];

    let use = [
        {
            loader: 'babel-loader',
            options: {
                presets: preset
            }
        }
    ];

    switch (add) {
        case 'js':
            isDev ? use.unshift({loader: 'eslint-loader'}) : '';
            preset.push('@babel/preset-env');
            break;
        case 'ts':
            preset.push('@babel/preset-typescript');
            break;
        case 'jsx':
            preset.push('@babel/preset-react');
            break;
        default:
            preset.push('@babel/preset-env');
            break;
    }

    return use
};
const plugins = () => {
    const base = [
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, './src/img/'),
                to: path.resolve(__dirname, 'dist/img/')
            },
        ]),
    ];

    return base;
};

const config = {
    context: path.resolve(__dirname, './src'),
    mode: 'development',
    devtool: isDev ? 'source-map' : '',
    entry: {
        index: ['./index.js']
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, './dist')
    },
    optimization: optimization(),
    resolve: {
        extensions: ['.js', '.ts', '.jsx', '.json', '.png', '.svg', '.jpeg', '.jpg', '.xml'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@models': path.resolve(__dirname, 'src/models'),
        }
    },
    plugins: plugins(),
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [
                    /node_modules/
                ],
                use: babelLoader('js')
            },
            {
                test: /\.ts$/,
                exclude: [
                    /node_modules/
                ],
                use: babelLoader('ts')
            },
            {
                test: /\.jsx$/,
                exclude: [
                    /node_modules/
                ],
                use: babelLoader('jsx')
            }
        ]
    },
    devServer: {
        port: 8080,
        hot: isDev
    }
};

module.exports = config;

