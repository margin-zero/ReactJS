// Base configuration for app

const devBase = require('./_base_dev.config.js');
var merge = require('merge'), original, cloned;
const HtmlPlugin = require('html-webpack-plugin')
const path = require('path')

// entry point of the app ( module.exports.entry )
const entryPoint = './src___game_of_fifteen/src';

// output file configuration ( module.export.output )
const outputFile = {
        filename: 'game_of_fifteen.js',
        path: __dirname + '/../dist___game_of_fifteen/dev' 
    };

// HtmlPlugin.template used by current app - will be added to module.exports.plugins array
const plugins = (
        new HtmlPlugin({
            template: './src___game_of_fifteen/public/index.html'
        })
    );


module.exports = devBase;
module.exports.entry = entryPoint;
module.exports.output = outputFile;
module.exports.plugins.push(plugins);
