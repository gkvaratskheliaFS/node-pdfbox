const gulp = require('gulp');
const jasmine = require('gulp-jasmine');
const shell = require('gulp-shell')
const gutil = require('gulp-util');
const path = require('path');
const sequence = require('run-sequence');
const clean = require('gulp-clean');


gulp.task('clear-test', function() {
	return gulp.src('spec/build/file.pdf', {read: false}).pipe(clean());
});

gulp.task('test', ['clear-test'], function() {
	gulp.src('spec/simple-test.js').pipe(jasmine({verbose:true}));
});

gulp.task('java-compile', shell.task([
  'javac -classpath .:"' + path.join(__dirname, 'src-library/*')
	+ '" ' + path.join(__dirname, 'src-java/br/com/appmania/*.java')
]));

gulp.task('compile', ['java-compile'], function() {
	gutil.log(gutil.colors.green('Java classes compiled'));
});

gulp.task('default', function() {
	sequence(['compile', 'test']);
});
