var gulp = require('gulp')
var handleErrors = require('../util/handleErrors')
var changed = require('gulp-changed')
var ext_replace = require('gulp-ext-replace')

function extCleanArrays(extCleanFile, index) {
  var file = extCleanFile.substring(
    extCleanFile.lastIndexOf('/') + 1,
    extCleanFile.lastIndexOf('.')
  )
  var watchPath = extCleanFile.substring(0, extCleanFile.lastIndexOf('/') + 1)

  // 更新參照檔案路徑
  extCleanFilesRun.push(dest + extCleanFile)

  // 更新偵聽檔案路徑
  extCleanFilesWatch.push(src + watchPath + '*' + file + '.*')
}

gulp.task('extClean', function() {
  return gulp.src(extCleanFilesRun)
    .on('error', handleErrors)
    .pipe(ext_replace(''))
    .pipe(changed(dest))
    .pipe(gulp.dest(dest))
})

gulp.task('extCleanInit', function() {
  extCleanFiles.forEach(extCleanArrays)
  gulp.start('extClean')
})
