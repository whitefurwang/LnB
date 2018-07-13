var gulp = require('gulp')
var gulpif = require('gulp-if')
var sourcemaps = require('gulp-sourcemaps')
var sass = require('gulp-sass')
var handleErrors = require('../util/handleErrors')
var rename = require('gulp-rename')
var cleanCSS = require('gulp-clean-css')
var browserSync = require('browser-sync')

gulp.task('sass', function () {
  return gulp.src([
    src + cssDir + '**/*.sass',
    src + cssDir + '**/*.scss'
  ])
    .pipe(gulpif(global.debugMode, sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(!global.debugMode, cleanCSS()))
    .pipe(gulpif(global.debugMode, sourcemaps.write()))
    .pipe(gulpif(
      !!global.cssExtname,
      rename({suffix: `.${global.cssExtname}`})
    ))
    .pipe(gulp.dest(dest + cssDir))
    .pipe(gulpif(global.isWatching, browserSync.stream()))
})

gulp.task('css', function () {
  return gulp.src([
    src + cssDir + '**/*.css'
  ])
    .pipe(gulpif(global.debugMode, sourcemaps.init()))
    .on('error', handleErrors)
    .pipe(gulpif(!global.debugMode, cleanCSS()))
    .pipe(gulpif(global.debugMode, sourcemaps.write()))
    .pipe(gulpif(
      !!global.cssExtname,
      rename({suffix: `.${global.cssExtname}`})
    ))
    .pipe(gulp.dest(dest + cssDir))
    .pipe(gulpif(global.isWatching, browserSync.stream()))
})

gulp.task('sassInit', ['sass', 'css'])
