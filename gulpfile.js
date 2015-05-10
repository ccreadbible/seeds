var nib = require('nib');
var bower = require('bower');
var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var stylus = require('gulp-stylus');
var rename = require('gulp-rename');
var sh = require('shelljs');
var bs = require('browser-sync');
var reload = bs.reload;

var paths = {
  stylus: ['www/**/*.styl']
};

gulp.task('default', ['serve']);

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

gulp.task('stylus', function() {
  return gulp.src(['www/app/style.styl'])
    .pipe(stylus({use: [nib()]}))
    .pipe(gulp.dest('www/css'))
    .pipe(reload({ stream: true }))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'));
});

gulp.task('serve', function() {
  bs({
    notify: true,
    server: {
      baseDir: 'www'
    },
    files: ['www/app/**/*.html', 'www/index.html']
  });

  gulp.watch(paths.stylus, ['stylus']);
});

