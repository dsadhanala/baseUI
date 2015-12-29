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




// var webpack = require('webpack'),
//     path    = require('path'),
//     config  = require('./config');
//
// // paths
// var PATHS      = {
//     root  : config.base.root,
//     src   : config.base.src,
//     dist  : config.base.dist
// };
//
// // configurations
// module.exports = {
//     context      : PATHS.root,
//     entry        : {
//         app      : './source/assets/js/components.js'
//     },
//
//     target       : 'web',
//     //watch      : true,
//     //debug      : true,
//
//     output       : {
//         path     : PATHS.dist,
//         filename : './assets/js/app-scripts.js'
//     },
//
//     /* source map for dev server */
//     devtool      : 'source-map',
//
//     /* globals */
//     externals: {
//         // require('jQuery') is external and available
//         //  on the global var jQuery
//         'jQuery': 'jQuery'
//     }
// };
