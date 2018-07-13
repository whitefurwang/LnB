var gulp = require('gulp')
var babel = require('gulp-babel')
var gulpif = require('gulp-if')
var uglify = require('gulp-uglify')

gulp.task('babel', function () {
  return gulp.src([
      src + jsDir + 'main.js',
      src + jsDir + 'f2eDev.js'
    ])
    .pipe(babel({presets: ['es2015', 'react']}))
    .pipe(gulpif(!global.debugMode, uglify()))
    .pipe(gulp.dest(dest + jsDir))
})
