var gulp = require('gulp')
var browserify = require('browserify')
var assign = require('lodash.assign')
var watchify = require('watchify')
var bundleLogger = require('../util/bundleLogger')
var babelify = require('babelify')
var browserifyShim = require('browserify-shim')
var handleErrors = require('../util/handleErrors')
var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var gulpif = require('gulp-if')
var sourcemaps = require('gulp-sourcemaps')
var uglify = require('gulp-uglify')
var derequire = require('gulp-derequire')
var rename = require('gulp-rename')
var browserSync = require('browser-sync')

gulp.task('browserify', ['standard'], function () {
  entries.map(function (entry) {
    // setting browserify options
    var customOpts = {
      // Required watchify args
      cache: {},
      packageCache: {},
      fullPaths: false,
      paths: [
        './node_modules'
      ],
      // Specify the entry point of your app
      entries: [src + jsDir + entry],
      standalone: entry,
      // Add file extentions to make optional in your requires
      extensions: [
        '.js',
        '.min.js'
      ],
      // Enable source maps!
      debug: global.debugMode
    }

    var opts = assign({}, watchify.args, customOpts)
    var b

    if (global.isWatching) {
      b = watchify(browserify(opts))
        .external('react')
        .external('react-dom')
    } else {
      b = browserify(customOpts)
        .external('react')
        .external('react-dom')
    }

    b.on('update', bundle)

    function bundle () {
      // Log when bundling starts
      bundleLogger.start()
      return b
        .transform(babelify, {presets: ['es2015', 'react']})
        .transform(browserifyShim, {global: true})
        .bundle()
        // Report compile errors
        .on('error', handleErrors)
        // 使用 vinyl-source-stream 使gulp兼容. 在此指定輸出擋名
        .pipe(source(entry)) // 輸出檔名
        // convert from streaming to buffered vinyl file object
        .pipe(buffer())
        // create sourcemap //如果global.debugMode = true產生sourcemaps
        .pipe(gulpif(global.debugMode, sourcemaps.init({loadMaps: true})))
        .pipe(gulpif(global.debugMode, sourcemaps.write('./')))
        // compress //壓縮JS與sourcemaps
        .pipe(gulpif(!global.debugMode, uglify()))
        .pipe(derequire([
          {
            from: 'require',
            to: '_dereq_'
          }
        ]))
        // Specify the output destination 輸出位置
        .pipe(gulp.dest(dest + jsDir))
        // Log when bundling completes!
        .pipe(gulpif(global.isWatching, browserSync.stream()))
        .on('end', bundleLogger.end)
    }

    bundle()
  })
})
