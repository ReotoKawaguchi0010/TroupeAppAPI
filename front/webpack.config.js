const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const { basename } = require('path')

const outputPath = path.resolve(__dirname, 'dist')

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'main.js',
        path: outputPath,
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(jpe?g|png|gif|svg|icp)$/i,
                loader: 'url-loader',
                options: {
                    limit: 2048,
                    name: './images/[name].[ext]'
                }
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                    plugins: ['@babel/plugin-transform-runtime'],
                },

            },
            {
                test: /\.html$/,
                loader: "html-loader"

            },
        ]
    },
    devServer: {
        contentBase: outputPath,
        port: 3000,
        historyApiFallback: true,
    },
    plugins: [
        new htmlWebpackPlugin({
            template: "./public/index.html",
            filename: "./index.html",
            favicon: './public/favicon.ico'
        }),
    ],
}