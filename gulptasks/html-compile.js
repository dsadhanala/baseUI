var $           = require('gulp-load-plugins')();
var assemble    = require('assemble');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var config      = require('../config');

// refer config.js for directories
var base = config.base;

// refer config.js file for paths to source files
var filePath = config.filePath;

function htmlCompile (watch){
    //- update build time
    var timeStamp = function () {
        var d = new Date(),
            h = d.getHours(),
            m = d.getMinutes(),
            p = " a.m.";

        if (m < 10){ m = "0" + m; }
        if (h >= 12) { p = " p.m."; h = h - 12;}
        if (h === 0) { h = 12; }

        return (d.toDateString() +' at '+ h +":"+ m + p);
    };

    // assemble options
    assemble.layouts([filePath.html.layouts]);
    assemble.partials([filePath.html.partials]);
    assemble.option({'assets': filePath.html.assets, 'timestamp': timeStamp()});
    assemble.data([filePath.html.data]);
    assemble.helpers([filePath.html.helpers]);

    // assemble complie task
    assemble.src(filePath.html.pages)
    .pipe($.extname('.html'))
    .pipe(assemble.dest(base.dist))
    .pipe($.if(watch, reload({
        stream: true
    })))
    .pipe($.size({
        title: 'html'
    }));
}

module.exports = htmlCompile;
