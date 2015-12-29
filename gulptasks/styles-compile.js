var gulp          = require('gulp');
var $             = require('gulp-load-plugins')();
var browserSync   = require('browser-sync');
var reload        = browserSync.reload;
var config        = require('../config');

// refer config.js for directories
var base = config.base;

// refer config.js file for paths to source files
var filePath = config.filePath;

// browsers list for css3 vernder prefixing
var afx_browsers_modren = [
  'last 2 chrome versions',
  'last 2 Firefox versions',
  'last 2 safari versions',
  'last 2 edge versions',
  'last 2 ie versions',
  'ios >= 7',
  'android >= 4.2',
  'ie_mob >= 10'
];

function stylesCompile (watch, publish){
    var stylesDist = base.distAssets + '/css';

    // RWD styles with autoprefix and sourcemaps
    gulp.src(filePath.styles)
        .pipe($.sourcemaps.init())
        .pipe($.sass().on('error', $.sass.logError))
        .pipe($.autoprefixer(afx_browsers_modren))
        .pipe($.sourcemaps.write('./'))
        .pipe(gulp.dest(stylesDist))
        .pipe($.if(watch, reload({
            stream: true
        })))
        .pipe($.size({
            title: 'Styles'
    }));
}

module.exports = stylesCompile;
