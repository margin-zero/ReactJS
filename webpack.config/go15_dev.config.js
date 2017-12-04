// Base configuration for app

const dev_base = require('./dev-base.config.js');
var merge = require('merge'), original, cloned;
const HtmlPlugin = require('html-webpack-plugin')
const Path = require('path')

module.exports = merge(dev_base, {
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
        })
      ]
})