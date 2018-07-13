var gulp = require('gulp')
var handleErrors = require('../util/handleErrors')
var changed = require('gulp-changed')

gulp.task('copy', function () {
  return gulp.src([
    src + '**/*',
    '!' + src + '**/*.sass',
    '!' + src + '**/*.scss',
    '!' + src + '**/*.css',
    '!' + src + '**/*.pug',
    '!' + src + '**/*.js',
    '!' + src + '**/components/',
    '!' + src + 'template/',
    '!' + src + jsDir + '**/',
    '!' + src + cssDir + '**/'
  ])
    .on('error', handleErrors)
    .pipe(changed(dest))
    .pipe(gulp.dest(dest))
})

gulp.task('copyVendors', function () {
  return gulp.src([
    src + jsDir + 'vendors/*'
  ])
    .on('error', handleErrors)
    .pipe(gulp.dest(dest + jsDir + 'vendors/'))
})

gulp.task('copyInit', ['copy', 'copyVendors'])
