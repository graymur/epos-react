process.env.NODE_ENV = process.env.NODE_ENV || 'production';

var gulp = require('gulp');
var util = require('gulp-util');
//var webpack = require('webpack');
//var compass = require('gulp-compass');
//var csso = require('gulp-csso');
//var autoprefixer = require('gulp-autoprefixer');
var svgmin = require('gulp-svgmin');
//var shell = require('gulp-shell');
//var eslint = require('gulp-eslint');

gulp.task('svg', function () {
    return gulp.src('./_src/svg/*.svg')
        .pipe(svgmin())
        .pipe(gulp.dest('./public/img/svg'));
});

function onError (error) {
    console.log(error.toString());
    this.emit('end');
}
