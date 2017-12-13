// Base configuration for app

const prodBase = require('./_base_prod.config.js');
const HtmlPlugin = require('html-webpack-plugin')
const path = require('path');
const webpack = require('webpack');

// entry point of the app ( module.exports.entry )
const entryPoint = './src___dog_browser/src';

// output file configuration ( module.export.output )
const outputFile = {
        filename: 'dog_browser.js',
        path: __dirname + '/../dist___dog_browser/prod' 
    };

// HtmlPlugin.template used by current app - will be added to module.exports.plugins array
const plugins = (
    new HtmlPlugin({
        template: './src___dog_browser/public/index.html',
        favicon: './src___dog_browser/public/favicon.ico',
        title: 'Dog Browser'
    })
    );


module.exports = prodBase;
module.exports.entry = entryPoint;
module.exports.output = outputFile;
module.exports.plugins.push(plugins);
