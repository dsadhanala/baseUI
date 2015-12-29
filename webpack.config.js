/*
*  Webpack build manager
*  Author: Durga Prasad Sadhanala
*/

'use strict';

var webpack = require("webpack");
var config = require('./config');

var project      = __dirname + '/';
var root         = project + config.base.root;
var globalJs     = project + config.base.srcAssets + '/js';
var componentsJs = config.base.components;

module.exports = {
    //context: root,
    entry: {
        'app-scripts': root+'/source/assets/js/app-scripts'
    },

    resolve: {
        root: [
            componentsJs,
            globalJs
        ],
        extensions: ['', '.js']
    },

    target: 'web',
    //watch      : true,
    //debug      : true,

    /* source map for dev server */
    devtool        : 'source-map',

    output: {
        filename: '[name].js',
        sourceMapFilename: '[name].map'
    },

    /* globals */
    externals: {
        // require('jQuery') is external and available
        //  on the global var jQuery
        'jQuery': 'jQuery'
    }
};
