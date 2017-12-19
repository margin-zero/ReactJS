// Base configuration for app

const devBase = require('./_base_dev.config.js');
var merge = require('merge'), original, cloned;
const HtmlPlugin = require('html-webpack-plugin')
const path = require('path')

// entry point of the app ( module.exports.entry )
const entryPoint = './src___bitcoin/src';

// output file configuration ( module.export.output )
const outputFile = {
        filename: 'bitcoin.js',
        path: __dirname + '/../dist___bitcoin/dev' 
    };

// HtmlPlugin.template used by current app - will be added to module.exports.plugins array
const plugins = (
        new HtmlPlugin({
            template: './src___bitcoin/public/index.html',
            // filename: __dirname + '/../dist___dog_browser/dev/index.html',
            favicon: './src___bitcoin/public/favicon.ico',
            title: 'Bitcoin data'
        })
    );


module.exports = devBase;
module.exports.entry = entryPoint;
module.exports.output = outputFile;
module.exports.plugins.push(plugins);
