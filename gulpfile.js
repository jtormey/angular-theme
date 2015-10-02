'use strict';

var pkg     = require('./package.json')
  , gulp    = require('gulp')
  , babel   = require('gulp-babel')
  , iife    = require('gulp-iife')
  , concat  = require('gulp-concat')
  , uglify  = require('gulp-uglify')
  , clean   = require('gulp-clean')
  , rename  = require('gulp-rename')
  , header  = require('gulp-header')
  , runSeq  = require('run-sequence');

gulp.task('default', ['dist']);

gulp.task('dist', function() {
  runSeq('dist-clean', 'dist-file', 'dist-min');
});

var files = {
  src: {
    dir: 'src',
    all: [
      '*.module.js',
      '*.service.js',
      '*.directive.js'
    ]
  },
  dist: {
    dir: 'dist',
    all: '*.js',
    file: 'angular-theme.js',
    min: 'angular-theme.min.js'
  }
};

var banner = [
  '/**',
  ' * <%= pkg.name %> v<%= pkg.version %>',
  ' * <%= date %>',
  ' * <%= pkg.author %>',
  ' */',
  '\n'
].join('\n');

gulp.task('dist-clean', function() {
  return gulp.src(files.dist.all, { cwd: files.dist.dir })
    .pipe(clean());
});

gulp.task('dist-file', function() {
  return gulp.src(files.src.all, { cwd: files.src.dir })
    .pipe(babel({ blacklist: ['useStrict'] }))
    .pipe(concat(files.dist.file))
    .pipe(iife({ prependSemicolon: false }))
    .pipe(header(banner, { pkg: pkg, date: new Date() }))
    .pipe(gulp.dest(files.dist.dir));
});

gulp.task('dist-min', function() {
  return gulp.src(files.dist.file, { cwd: files.dist.dir })
    .pipe(uglify())
    .pipe(rename(files.dist.min))
    .pipe(gulp.dest(files.dist.dir));
});
