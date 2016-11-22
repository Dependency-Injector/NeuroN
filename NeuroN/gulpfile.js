/// <binding />
/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();

gulp.task('styles', function () {
    gulp.src('./Content/Sass/neuron-style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./Content/'));
});

gulp.task('css', function () {

    gulp.src('./app/**/*.css')
        //.pipe(minifyCSS())
        //.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('./Content/'));
});

gulp.task('watch', function () {
    gulp.watch('./Content/Sass/*.scss', ['styles']);
});

gulp.task('default', ['styles'], function () {
    // place code for your default task here
});

gulp.task('browser-sync', function () {
    browserSync.init({
        port: 3000,
        server: {
            baseDir: "./"
        }
    });

    /*browserSync({
        port: 3000,
        server: {
            baseDir: "./"
        }
    });*/

    gulp.watch([
      "*.js",
      "*.css",
      "*.html"
    ], browserSync.reload);
});