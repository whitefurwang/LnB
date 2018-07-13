var gulp = require('gulp')
var browserSync = require('browser-sync')
var connectRoute = require('connect-route')
var mockApi = require('../mockapi.js')

gulp.task('browserSync', function() {
  if(!global.isWatching) return
  browserSync.init({
    server: {
      baseDir: [dest],
      middleware: connectRoute(mockApi)
    },
    port: global.serverPort,
    files: [
      //src + jsDir + '**/*.js',
      //src + jsDir + '**/*.min.js'
    ]
  })
})
