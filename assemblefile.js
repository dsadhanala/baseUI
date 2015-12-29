var assemble = require('assemble');
var extname = require('gulp-extname');
var handlebarsHelpers = require('handlebars-helpers');
var grunt = require('grunt');


//var app = assemble();

assemble.layouts('application/source/templates/layouts/*.hbs');
assemble.partials('application/source/components/**/*.hbs');
assemble.option({'assets': 'application/build/assets'});
// assemble.data('application/source/components/**/*.json');
// assemble.helpers('application/source/templates/helpers/**/*.js');

console.log(assemble.views.partials);

assemble.task('html', function() {
  assemble.src('application/source/templates/pages/**/*.hbs')
    .pipe(extname('.html'))
    .pipe(assemble.dest('application/build'));
});

assemble.task('default', ['html']);
