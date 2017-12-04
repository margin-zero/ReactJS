// Base configuration for app

const prod_base = require('./prod-base.config.js');
var merge = require('merge'), original, cloned;
const HtmlPlugin = require('html-webpack-plugin')
const Path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(prod_base, {
    entry: './src___game_of_fifteen',
    output: {
        filename: 'game_of_fifteen.js',
        path: __dirname + '/../dist___game_of_fifteen'
      },
    plugins: [
        // Configure HtmlPlugin to use our own index.html file
        // as a template.
        // Check out https://github.com/jantimon/html-webpack-plugin
        // for the full list of options.
        new HtmlPlugin({
          template: './src___game_of_fifteen/index.html'
        }),

        // Extract imported CSS into own file
        new ExtractTextPlugin('index.css'),
        // Minify JS
        new UglifyJsPlugin({
        sourceMap: false,
        compress: true,
        }),
        // Minify CSS
        new webpack.LoaderOptionsPlugin({
        minimize: true,
        }),
    ]
})