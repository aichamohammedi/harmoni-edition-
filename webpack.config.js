var webpack = require('webpack');
var HtmlWebpackPlugin = require("html-webpack-plugin");
var path = require("path");
var ChunksWebpackPlugin = require("chunks-webpack-plugin");

module.exports = {

    //     entry: "main.js",
    //   output: {
    //     path: path.resolve(__dirname, "./dist"),
    //     filename: "main.js"
    //   },
    //     entry: {
    //         // entry point for your application code
    //         index: [
    //             './src/js/main.js'
    //         ],
    //         // put your third party libs here
    //         // vendor: []
    //     },
    //     output: {
    //         filename: 'main.bundle.js',
    //         path: path.resolve(__dirname, "dist"),
    //         // the bundled output will be loaded by the Dojo AMD loader
    //         // that is included in the ArcGIS API for JavaScript
    //         libraryTarget: 'amd'
    //     },


    entry: {
        // entry point for your application code
        main: [
            './src/js/main.js'
        ],
        // put your third party libs here
        // vendor: []
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, "dist"),
        // the bundled output will be loaded by the Dojo AMD loader
        // that is included in the ArcGIS API for JavaScript
        libraryTarget: 'amd'
    },
    module: {
        rules: [
            // ES2015 files
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader'
            },
            // css
            {
                test: /\.css$|\.scss$|\.sass$/i,


                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS

                    "sass-loader",
                ],
            },
            {
                test: /\.(png|jpg|gif|svg|ico)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "assets/images"
                        }
                    }
                ]
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "TU WEBPACK",
            filename: "index.html",
            template: "./src/index.html",
            // chunks: ["index"],
        }),

        new ChunksWebpackPlugin({
            name: 'vendor',
            minChunks: Infinity
    
        })

    ],
    externals: [
        function (context, request, callback) {
            // exclude any esri or dojo modules from the bundle
            // these are included in the ArcGIS API for JavaScript
            // and its Dojo loader will pull them from its own build output
            if (/^dojo/.test(request) ||
                /^dojox/.test(request) ||
                /^dijit/.test(request) ||
                /^esri/.test(request) ||
                // ordinarily you would only need to speficy the above prefixes,
                // but because we include a third-party Dojo module in this example
                // we need to add it's package to the list of prefixes to exclude
                /^cluster-layer-js/.test(request)
            ) {
                return callback(null, 'amd ' + request);
            }
            callback();
        }
    ],
    devtool: 'source-map',
    // devServer: {
    //     contentBase: path.join(__dirname, '/dist/'),
    //     compress: true,
    //     port: 8080
    //   }
};
