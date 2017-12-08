// Base configuration for app

const devBase = require('./_base_dev.config.js');
var merge = require('merge'), original, cloned;
const HtmlPlugin = require('html-webpack-plugin')
const path = require('path')

// entry point of the app ( module.exports.entry )
const entryPoint = './src___block_chart/src';

// output file configuration ( module.export.output )
const outputFile = {
        filename: 'block_chart.js',
        path: __dirname + '/../dist___block_chart/dev' 
    };

// HtmlPlugin.template used by current app - will be added to module.exports.plugins array
const plugins = (
        new HtmlPlugin({
            template: './src___block_chart/public/index.html',
            // filename: __dirname + '/../dist___block_chart/dev/index.html',
            favicon: './src___block_chart/public/favicon.ico',
            title: 'Block chart - DEV DISTRIBUTION'
        })
    );


module.exports = devBase;
module.exports.entry = entryPoint;
module.exports.output = outputFile;
module.exports.plugins.push(plugins);
