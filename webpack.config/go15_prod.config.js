// Base configuration for app

const prodBase = require('./_base_prod.config.js');
const HtmlPlugin = require('html-webpack-plugin')
const path = require('path');
const webpack = require('webpack');

// entry point of the app ( module.exports.entry )
const entryPoint = './src___game_of_fifteen/src';

// output file configuration ( module.export.output )
const outputFile = {
        filename: 'game_of_fifteen.js',
        path: __dirname + '/../dist___game_of_fifteen/prod' 
    };

// HtmlPlugin.template used by current app - will be added to module.exports.plugins array
const plugins = (
    new HtmlPlugin({
        template: './src___game_of_fifteen/public/index.html',
        favicon: './src___game_of_fifteen/public/favicon.ico',
        title: 'Game of Fifteen'
    })
    );


module.exports = prodBase;
module.exports.entry = entryPoint;
module.exports.output = outputFile;
module.exports.plugins.push(plugins);
