/*
 *  Gulp build manager
 *  Author: Durga Prasad Sadhanala
 */

'use strict';

// Include gulp and webpack
var gulp          = require('gulp');

// Include Plugins
/* all the plugins starts with 'gulp' will loaded using load-plugins */
var $              = require('gulp-load-plugins')();
var del            = require('del');
var pngcrush       = require('imagemin-pngcrush');
var pagespeed      = require('psi');
var runSequence    = require('run-sequence');
var browserSync    = require('browser-sync');
var config         = require('./config');
var reload         = browserSync.reload;
var watch          = false;
var publish        = false;

// gulp build taks import
var htmlCompile    = require('./gulptasks/html-compile');
var stylesCompile  = require('./gulptasks/styles-compile');
var scriptsCompile = require('./gulptasks/scripts-compile');
var copyFiles      = require('./gulptasks/copy-files');

// refer config.js for directories
var base           = config.base;

// refer config.js file for paths to source files
var filePath       = config.filePath;

// Clean Output Directory
gulp.task('clean', del.bind(null, ['.tmp', base.dist]) );

// Lint JavaScript
gulp.task('jshint', function() {
    return gulp.src([gulp.js, filePath.scripts.allJsFiles, !filePath.scripts.vendorLibs])
    .pipe(reload({
        stream: true,
        once: true
    }))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

// HTML pages
gulp.task('html', function() {
    htmlCompile(watch, publish);
});

// Styles
gulp.task('styles', function() {
    stylesCompile(watch, publish);
});

// Java Script
gulp.task('scripts', function(){
    scriptsCompile(watch, publish);
});

// Copy files
gulp.task('copyfiles', function(){
    copyFiles(watch, publish);
});

// watch task
gulp.task('watch', function() {
    watch = true;
    gulp.watch([filePath.html.all, filePath.html.jsonFiles], ['html']);
    gulp.watch([filePath.allStyleFiles], ['styles']);
    gulp.watch([filePath.scripts.allJsFiles], ['scripts']);
    gulp.watch([filePath.copyfiles.img, filePath.copyfiles.fonts], ['copyfiles']);
});

// browser-sync task for starting the server.
gulp.task('browser-sync', function() {
    browserSync({
        notify: false,
        server: {
            baseDir: base.dist
        }
    });
});

// Run PageSpeed Insights
gulp.task('psInsights', function() {
    pagespeed.output('baseui');
});

// zip build folder for download
gulp.task('zip', function() {
    return gulp.src(base.dist + '/**/*')
        .pipe($.zip('build.zip'))
        .pipe(gulp.dest(base.dist + '/nightly'));
});

// Default task runs dev build, watches for file changes and browser reloads
gulp.task('default', ['build'], function(cb) {
    runSequence(['browser-sync', 'watch'], cb);
});

// Build for dev environment
gulp.task('build', ['clean'], function(cb) {
    runSequence(['copyfiles', 'styles', 'scripts', 'html'], cb);
});

// run publish tasks then pagespeed and zip
gulp.task('publishfiles', function(cb) {
    publish = true;
    runSequence('build', cb);
});

// Publish task build production ready files to deploy
gulp.task('publish', ['publishfiles'], function(cb) {
    runSequence('zip', 'psInsights', cb);
});

// Build and serve the output from the build
gulp.task('serv:dist', ['publish'], function(cb) {
    runSequence(['browser-sync'], cb);
});
