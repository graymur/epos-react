require('dotenv').config();

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

var gulp = require('gulp');
var util = require('gulp-util');
var webpack = require('webpack');
var compass = require('gulp-compass');
var csso = require('gulp-csso');
var autoprefixer = require('gulp-autoprefixer');
var svgmin = require('gulp-svgmin');
var shell = require('gulp-shell');
var eslint = require('gulp-eslint');

gulp.task('css', function() {
    gulp.src(['_src/sass/**/*.sass', '_src/sass/**/*.scss'])
        .pipe(compass({
            //sourcemap: true,
            css: 'css',
            sass: '_src/sass',
            image: 'img'
        }))
        .on('error', onError)
        .pipe(autoprefixer({
            remove: false
        }))
        //.pipe(csso())
        .pipe(gulp.dest('./public/css'))
    ;
});

gulp.task('svg', function () {
    return gulp.src('./_src/svg/*.svg')
        .pipe(svgmin())
        .pipe(gulp.dest('./public/img/svg'));
});

gulp.task('webpack-watch', shell.task(['set NODE_ENV=' + process.env.NODE_ENV + '&& webpack --watch']));
gulp.task('webpack-min', shell.task(['set NODE_ENV=production&& webpack -p']));

gulp.task('min', ['webpack-min'], function() {
    gulp.src(['./public/css/main.css'])
        .pipe(csso())
        .pipe(gulp.dest('./public/css'))
    ;
});

gulp.task('lint', function () {
    return gulp.src(['_src/js/**/*.js*', './server.js', '!_src/js/tests/**', '!_src/js/main/vendor/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('watch', function() {
    gulp.watch(['_src/sass/**/*.sass', '_src/sass/**/*.scss'], ['css']);
    gulp.watch(['_src/svg/*.svg'], ['svg']);
    gulp.watch(['_src/js/**/*.js*'], ['lint']);
});

gulp.task('default', ['watch', 'webpack-watch']);

function onError (error) {
    console.log(error.toString());
    this.emit('end');
}
