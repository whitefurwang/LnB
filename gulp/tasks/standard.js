var gulp = require('gulp')
var standard = require('gulp-standard')
var changed = require('gulp-changed')

gulp.task('standard', function () {
  return gulp.src([
    src + jsDir + '**/*.js',
    src + jsDir + '**/*.jsx',
    '!' + src + jsDir + 'vendors/*'
  ])
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: false,
      quiet: true
    }))
})
