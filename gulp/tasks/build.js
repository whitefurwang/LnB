var gulp = require('gulp')
var del = require('del')

gulp.task('build', ['clean'], function () {
  gulp.start(['runBuild'])
})

gulp.task('runBuild', ['pugInit', 'sassInit', 'copyInit', 'babel'], function() {
  gulp.start(['extCleanInit'], 'browserify')
})

gulp.task('clean', function () {
  var clean = del([
    './webroot/',
    './build/'
  ])
  return clean
})
