// Base Prod Configuration for Webpack

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  module: {
    rules: [
        { 
            test: /\.js$/, 
            use: 'babel-loader', 
            exclude: /node_modules/ 
        },

        { 
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
              fallback: "style-loader",
              use: "css-loader"
            })
        },

        { 
          test: /\.ts$/, 
          use: 'ts-loader'
        },

        { 
          test: /manifest.json/, 
          use: [
            { 
              loader: 'file-loader', 
              options: { name: '[name].[ext]'}
            }
          ]
        }

    ]
  },

  plugins: [
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
  ],
}
