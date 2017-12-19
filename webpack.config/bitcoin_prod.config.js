// Base configuration for app

const prodBase = require('./_base_prod.config.js');
const HtmlPlugin = require('html-webpack-plugin')
const path = require('path');
const webpack = require('webpack');

// entry point of the app ( module.exports.entry )
const entryPoint = './src___bitcoin/src';

// output file configuration ( module.export.output )
const outputFile = {
        filename: 'bitcoin.js',
        path: __dirname + '/../dist___bitcoin/prod' 
    };

// HtmlPlugin.template used by current app - will be added to module.exports.plugins array
const plugins = (
    new HtmlPlugin({
        template: './src___bitcoin/public/index.html',
        favicon: './src___bitcoin/public/favicon.ico',
        title: 'Bitcoin data'
    })
    );


module.exports = prodBase;
module.exports.entry = entryPoint;
module.exports.output = outputFile;
module.exports.plugins.push(plugins);
