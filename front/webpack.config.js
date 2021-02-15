const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin')
const outputPath = path.resolve(__dirname, 'dist')

module.exports = {
    entry: './src/js/index.tsx',
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
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: "ts-loader",
            },
            {
                test: /\.html$/,
                loader: "html-loader"
            },
            {
                test: /\.json$/,
                loader: "json-loader",
                type: "javascript/auto"
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        modules: [
            path.resolve(__dirname, './src'),
            path.resolve(__dirname, 'node_modules')]
    },
    devServer: {
        contentBase: outputPath,
        open: true,
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