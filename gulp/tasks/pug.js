var gulp = require('gulp')
var pug = require('gulp-pug')
var handleErrors = require('../util/handleErrors')
var rename = require('gulp-rename')
var changed = require('gulp-changed')

// pug default task (without template)
gulp.task('pug', function () {
  return gulp.src([
      src + '**/_*.pug'
    ])
    .pipe(pug({pretty: true}))
    .on('error', handleErrors)
    .pipe(rename(function(path) {
      var basenameLength = path.basename.length
      var strLength = 1
      path.basename = path.basename.substr(strLength, basenameLength - strLength)
    })) // 移除前綴
    .pipe(changed(dest))
    .pipe(gulp.dest(dest))
})

// create pug template tasks
function tmpRun (tmp) {
  gulp.task('pug_' + tmp, function () {
    return gulp.src([
        src + '**/' + tmp + '_*.pug',
        '!' + src + '**/template/'
      ])
      .pipe(pug({pretty: true}))
      .on('error', handleErrors)
      .pipe(rename(function(path) {
        var basenameLength = path.basename.length
        var strLength = tmp.length + 1
        path.basename = path.basename.substr(strLength, basenameLength - strLength)
      })) // 移除前綴
      .pipe(changed(dest))
      .pipe(gulp.dest(dest))
  })

  gulp.task('pug_' + tmp + '_all', function () {
    return gulp.src([
        src + '**/' + tmp + '_*.pug',
        '!' + src + '**/template/'
      ])
      .pipe(pug({pretty: true}))
      .on('error', handleErrors)
      .pipe(rename(function(path) {
        var basenameLength = path.basename.length
        var strLength = tmp.length + 1
        path.basename = path.basename.substr(strLength, basenameLength - strLength)
      })) // 移除前綴
      .pipe(gulp.dest(dest))
  })
}

// init pug task
var pug_all = ['pug']

function pushPugAll (tmp) {
  pug_all.push('pug_' + tmp + '_all')
}

gulp.task('pugInit', function() {
  pugTmps.map(tmpRun)
  pugTmps.map(pushPugAll)
  gulp.start(pug_all)
})
