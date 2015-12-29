var gulp          = require('gulp');
var $             = require('gulp-load-plugins')();
var browserSync   = require('browser-sync');
var reload        = browserSync.reload;
var config        = require('../config');

// refer config.js for directories
var base = config.base;

// refer config.js file for paths to source files
var filePath = config.filePath;

function copyFiles(watch, publish){
    // Copy font files
    gulp.src(filePath.copyfiles.fonts)
    .pipe(gulp.dest(base.distAssets + '/fonts/'))
    .pipe($.if(watch, reload({
        stream: true
    })))
    .pipe($.size({
        title: 'Fonts copied'
    }));

    // Copy Images files
    gulp.src(filePath.copyfiles.img)
    .pipe(gulp.dest(base.distAssets + '/img/'))
    .pipe($.if(watch, reload({
        stream: true
    })))
    .pipe($.size({
        title: 'Images copied'
    }));
}

module.exports = copyFiles;
