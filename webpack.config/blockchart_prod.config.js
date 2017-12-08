// Base configuration for app

const prodBase = require('./_base_prod.config.js');
const HtmlPlugin = require('html-webpack-plugin')
const path = require('path');
const webpack = require('webpack');

// entry point of the app ( module.exports.entry )
const entryPoint = './src___block_chart/src';

// output file configuration ( module.export.output )
const outputFile = {
        filename: 'block_chart.js',
        path: __dirname + '/../dist___block_chart/prod' 
    };

// HtmlPlugin.template used by current app - will be added to module.exports.plugins array
const plugins = (
    new HtmlPlugin({
        template: './src___block_chart/public/index.html',
        favicon: './src___block_chart/public/favicon.ico',
        title: 'Block Chart'
    })
    );


module.exports = prodBase;
module.exports.entry = entryPoint;
module.exports.output = outputFile;
module.exports.plugins.push(plugins);
