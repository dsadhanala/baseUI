"use strict";

var root            = 'application';
var src             = root + '/source';
var dist            = root +'/build';
var components      = src +'/components';
var srcAssets       = src + '/assets';
var distAssets      = dist + '/assets';
var bowerComponents = srcAssets + '/bower';
var templates       = src;


exports.base   = {
    root           : root,
    src            : src,
    dist           : dist,
    components     : components,
    srcAssets      : srcAssets,
    distAssets     : distAssets,
    bowerComponents: bowerComponents
};

exports.filePath = {
    html: {
        all      : templates + '/**/*.hbs',
        jsonFiles: templates + '/**/*.json',
        layouts  : templates + '/templates/layouts/*.hbs',
        partials : templates + '/components/**/*.hbs',
        pages    : templates + '/templates/pages/**/*.hbs',
        data     : templates + '/components/**/*.json',
        helpers  : templates + '/templates/helpers/**/*.js',
        assets   : distAssets
    },

    styles        : srcAssets + '/scss/**/*.scss',
    allStyleFiles : root + '/**/*.scss',

    scripts       : {
        allJsFiles: src + '/**/*.js',
        vendorLibs: [
            bowerComponents + '/modernizr/modernizr.js',
            bowerComponents + '/jquery/dist/jquery.js',
            srcAssets + '/js/vendor-libs/*.js'
        ]
    },

    copyfiles: {
        fonts: srcAssets + '/fonts/**/*',
        img: srcAssets + '/img/**/*',
    }
};
