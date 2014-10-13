/*
 *  Gulp build manager
 *  Author: Durga Prasad Sadhanala
 */

'use strict';

// Include gulp
var gulp = require('gulp');

// Include Plugins
/* all the plugins starts with "gulp" will loaded using load-plugins */
var $ = require('gulp-load-plugins')(),
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    del = require('del'),
    pagespeed = require('psi'),
    src = {},
    watch = false;

// browsers list for css3 vernder prefixing
var autoprefix_browsers = [
    'ie >= 8',
    'ie_mob >= 10',
    'ff >= 32',
    'chrome >= 38',
    'safari >= 6',
    'opera >= 24',
    'ios >= 7',
    'android >= 4.2'
];

// directories
var base = {
    root: 'application/',
    src: 'application/source',
    dist: 'application/build',
    srcAssets: 'application/source/assets',
    distAssets: 'application/build/assets'
};

// bower components
var bowerComp = {
    jquery: 'bower_components/jquery/dist/jquery.js',
    modernizr: 'bower_components/modernizr/modernizr.js'
};

// Clean Output Directory
gulp.task('clean', del.bind(null, ['.tmp', base.dist]));

// Lint JavaScript
gulp.task('jshint', function() {
    return gulp.src(base.srcAssets + '/js/modules/*.js')
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
    src.pages = [
        base.src + '/templates/**/*',
        base.src + '/templates/pages/**/*.hbs'
    ];

    var options = {
        partials: base.src + '/templates/partials/**/*.hbs',
        layoutdir: base.src + '/templates/layouts/',
        layout: 'default.hbs',
        assets: 'assets'
    };

    return gulp.src(src.pages[1])
        .pipe($.assemble(options))
        .pipe(gulp.dest(base.dist))
        .pipe($.if(watch, reload({
            stream: true
        })))
        .pipe($.size({
            title: 'html'
        }));
});

// Styles
gulp.task('styles', function() {
    src.styles = base.srcAssets + '/scss/**/*.scss';

    return gulp.src(src.styles)
        .pipe($.sourcemaps.init())
        .pipe($.sass())
        .pipe($.autoprefixer(autoprefix_browsers))
        .pipe($.csscomb())
        .pipe($.cssmin())
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(base.distAssets + '/css'))
        .pipe($.if(watch, reload({
            stream: true
        })))
        .pipe($.size({
            title: 'styles'
        }));
});

// Java Script
gulp.task('scripts', function() {
    var appLibs = [
            bowerComp.jquery,
            bowerComp.modernizr,
            base.srcAssets + '/js/libs/*.js'
        ],

        appPlugins = [
            base.srcAssets + '/js/plugins/*.js'
        ],

        appScripts = [
            base.srcAssets + '/js/app-scripts.js',
            base.srcAssets + '/js/modules/*.js'
        ];

    // watch for changes
    src.scripts = [appLibs, appPlugins, appScripts];

    // libs
    gulp.src(appLibs)
        .pipe($.concat('libs.js'))
        .pipe($.uglify())
        .pipe(gulp.dest(base.distAssets + '/js'))
        .pipe($.if(watch, reload({
            stream: true
        })))
        .pipe($.size({
            title: 'scripts'
        }));

    // plugins
    gulp.src(appPlugins)
    //.pipe($.sourcemaps.init())
    .pipe($.concat('plugins.js'))
        .pipe($.uglify())
    //.pipe($.sourcemaps.write())
    .pipe(gulp.dest(base.distAssets + '/js'))
        .pipe($.if(watch, reload({
            stream: true
        })))
        .pipe($.size({
            title: 'scripts'
        }));

    // application JS
    gulp.src(appScripts)
        .pipe($.sourcemaps.init())
        .pipe($.concat('app-scripts.js'))
    .pipe($.stripDebug())
    .pipe($.uglify())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(base.distAssets + '/js'))
        .pipe($.if(watch, reload({
            stream: true
        })))
        .pipe($.size({
            title: 'scripts'
        }));
});

// Copy static files to Build
gulp.task('copy', function() {
    src.img = base.srcAssets + '/img/**/*';
    src.fonts = base.srcAssets + '/fonts/*';
    src.rootfiles = base.src + '/*.*';

    // Copy font files
    gulp.src(src.fonts)
        .pipe(gulp.dest(base.distAssets + '/fonts'))
        .pipe($.size({
            title: 'Fonts'
        }));

    // Copy other files
    gulp.src(src.rootfiles)
        .pipe(gulp.dest(base.dist))
        .pipe($.size({title: 'Root Files'}));

    // Copy Images files
    gulp.src(src.img)
        .pipe(gulp.dest(base.distAssets + '/img'))
        .pipe($.if(watch, reload({
            stream: true
        })))
        .pipe($.size({
            title: 'images'
        }));
});

// Minify Images
gulp.task('minifyImages', function() {
    return gulp.src(base.distAssets + '/img')
        .pipe($.cache($.imagemin({
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest(base.distAssets + '/img'))
        .pipe($.size({
            title: 'images Optimized'
        }));
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
gulp.task('pagespeed', pagespeed.bind(null, {
    // update with your site URL
    url: 'http://example.com/',
    strategy: 'mobile'
}));

// Default task runs dev build, watches for file changes and browser reloads
gulp.task('default', ['build'], function(cb) {
    // load in a browser
    runSequence(['browser-sync'], cb);

    gulp.watch(src.pages[0], ['html']);
    gulp.watch(src.styles, ['styles']);
    gulp.watch(src.scripts, ['scripts']);
    gulp.watch(src.img, ['copy']);
    watch = true;
});

// Build for dev environment
gulp.task('build', ['clean'], function(cb) {
    runSequence('styles', ['jshint', 'html', 'scripts', 'copy'], cb);
});

// Publish task build production ready files to deploy
gulp.task('publish', ['clean'], function(cb) {
    runSequence(['jshint', 'html', 'styles', 'scripts', 'copy', 'minifyImages', 'pagespeed'], cb);
});

// Build and serve the output from the build
gulp.task('serve:dist', ['publish'], function(cb) {
    runSequence(['browser-sync'], cb);
});
