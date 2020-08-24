const path = require("path")
const HTMLPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
//设置环境变量
// process.env.NODE_ENV = "development"
module.exports = {
    entry: {
        app: "./src/index.js"
    },
    output: {
        filename: "built.js",
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                // 'style-loader', //自动将打包成js文件的css文件引入html中，并且右css样式自动热替换的功能，开发环境使用较好
                MiniCssExtractPlugin.loader, //与style-loader不同，将css文件单独打包成文件，生产环境使用
                'css-loader',
                {
                    loader: "postcss-loader", //css兼容性处理
                    options: {
                        ident: "postcss",
                        plugins: () => [
                            require("postcss-preset-env")()
                        ]
                    }
                }
            ]
        }, {
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader', //如果只使用一个loader，不使用use,url-loader默认处理css中的url图片打包
            options: {
                limit: 8 * 1024, //表示图片小于8kb,则会被base64处理，好处：减少http请求
                outputPath: "img" //图片文件输出到哪个文件夹
            },
        }, {
            test: /\.html$/,
            loader: 'html-loader', //处理html中的图片打包
        }]
    },
    plugins: [
        new HTMLPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "css/built.css"
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin() //模块热替换
    ],
    devServer: {
        contentBase: path.resolve(__dirname, "../dist"), //需要运行的打包代码地址
        compress: true, //启动gaip压缩
        port: 3000, //端口
        hot: true, //模块热替换
        open: true //自动打开浏览器
    },
    devtool: "source-map",
    mode: "development" //默认nodejs环境变量为production
};