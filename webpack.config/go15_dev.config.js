// Base configuration for app

const dev_base = require('./_base_dev.config.js');
var merge = require('merge'), original, cloned;
const HtmlPlugin = require('html-webpack-plugin')
const Path = require('path')

// entry point of the app ( module.exports.entry )
const EntryPoint = './src___game_of_fifteen';

// output file configuration ( module.export.output )
const OutputFile = {
        filename: 'game_of_fifteen.js',
        path: __dirname + '/../dist___game_of_fifteen' 
    };

// HtmlPlugin.template used by current app - will be added to module.exports.plugins array
const Plugins = (
        new HtmlPlugin({
            template: './src___game_of_fifteen/index.html'
        })
    );


module.exports = dev_base;
module.exports.entry = EntryPoint;
module.exports.output = OutputFile;
module.exports.plugins.push(Plugins);
