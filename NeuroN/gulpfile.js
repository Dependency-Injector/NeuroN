/// <binding />
/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('styles', function () {
    gulp.src('./Content/Sass/neuron-style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./Content/'));
});

gulp.task('watch', function () {
    gulp.watch('./Content/Sass/*.scss', ['styles']);
});

gulp.task('default', ['styles'], function () {
    // place code for your default task here
});