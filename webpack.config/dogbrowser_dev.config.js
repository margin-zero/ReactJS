// Base configuration for app

const devBase = require('./_base_dev.config.js');
var merge = require('merge'), original, cloned;
const HtmlPlugin = require('html-webpack-plugin')
const path = require('path')

// entry point of the app ( module.exports.entry )
const entryPoint = './src___dog_browser/src';

// output file configuration ( module.export.output )
const outputFile = {
        filename: 'dog_browser.js',
        path: __dirname + '/../dist___dog_browser/dev' 
    };

// HtmlPlugin.template used by current app - will be added to module.exports.plugins array
const plugins = (
        new HtmlPlugin({
            template: './src___dog_browser/public/index.html',
            // filename: __dirname + '/../dist___dog_browser/dev/index.html',
            favicon: './src___dog_browser/public/favicon.ico',
            title: 'Dog Browser - DEV DISTRIBUTION'
        })
    );


module.exports = devBase;
module.exports.entry = entryPoint;
module.exports.output = outputFile;
module.exports.plugins.push(plugins);
