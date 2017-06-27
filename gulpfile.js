'use strict';

var gulp = require('gulp'),
  sass = require('gulp-sass'),
  rigger = require('gulp-rigger'),
  sourcemaps = require('gulp-sourcemaps')
;

var path = {
  build: {
    // This is the build folder. Here you can see result.
    html: 'src/build/',
    css: 'css/'
  },
  src: {
    html: 'src/*.html',
    style: 'src/sass/main.scss'
  },
  watch: {
    html: 'src/**/*.html',
    style: 'src/sass/**/*.scss'
  },
  clean: './build'
};

gulp.task('html', function () {
  gulp.src(path.src.html)
  // Rigger will take html and put html partials instead "//= template/example_partial.html".
  // Use relative paths for that.
    .pipe(rigger())
    .pipe(gulp.dest(path.build.html))
  ;
});

gulp.task('css', function () {
  gulp.src(path.src.style)
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'nested'}).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build.css))
  ;
});

gulp.task('watch', function () {
  gulp.watch(path.watch.html, ['html']);
  gulp.watch(path.watch.style, ['css']);
});

gulp.task('build', ['html', 'css']);

gulp.task('default', ['build', 'watch']);
