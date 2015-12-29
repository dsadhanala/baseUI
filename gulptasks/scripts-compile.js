var gulp          = require('gulp');
var $             = require('gulp-load-plugins')();
var fs            = require('fs');
var browserSync   = require('browser-sync');
var reload        = browserSync.reload;
var webpackStream = require('webpack-stream');
var webpackConfig = require('../webpack.config');
var config        = require('../config');

// refer config.js for directories
var base        = config.base;

// refer config.js file for paths to source files
var filePath    = config.filePath;

// webpack configurations
var entryFile = config.base.srcAssets + '/app-scripts.js';

function scriptsCompile(watch, publish) {
    // set destination folder path
	var distFolder = base.distAssets + '/js';

	// webpack scripts compilation
	gulp.src(entryFile)
		.pipe(webpackStream(webpackConfig))
		.pipe(gulp.dest(distFolder))
		.pipe($.if(watch, reload({
			stream: true
		})))
		// print file size
		.pipe($.size({
			title: 'webpack bundle'
		}));

	// vendor libs compilation
	gulp.src(filePath.scripts.vendorLibs)
	.pipe($.concat('vendor-libs.js'))
	.pipe(gulp.dest(distFolder))
	.pipe($.if(watch, reload({
		stream: true
	})))
	// print file size
	.pipe($.size({
		title: 'Vendor Libs'
	}));

}

module.exports = scriptsCompile;
