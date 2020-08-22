const path = require("path")
const HTMLPlugin = require('html-webpack-plugin')

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "built.js",
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }, {
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader', //如果只使用一个loader，不使用use,url-loader默认处理css中的url图片打包
            options: {
                limit: 8 * 1024 //表示图片小于8kb,则会被base64处理，好处：减少http请求
            }
        }, {
            test: /\.html$/,
            loader: 'html-loader', //处理html中的图片打包
        }]
    },
    plugins: [
        new HTMLPlugin({
            template: './src/index.html'
        })
    ],
    mode: "development"
};