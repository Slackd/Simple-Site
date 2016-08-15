// Boilerplate Gulpfile
// Simple Project Setup
// (c) Budhaditya Saha

// Declare Variables
var gulp = require ('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

// JS Minify
gulp.task('scripts', function () {
  gulp.src('js/*.js')
  .pipe(plumber())
  .pipe(uglify())
  .pipe(gulp.dest('minjs'))
  .pipe(browserSync.reload({stream: true}));
});

// Sass Compile
gulp.task('styles', function () {
  gulp.src('./scss/main.scss')
    .pipe(plumber())
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
           cascade: false
    }))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.reload({stream: true}));
});

// BrowserSync
gulp.task('serve', function () {
  browserSync.init({
    server: './'
  });
// Watch Tasks
  gulp.watch('./js/*.js', ['scripts']);
  gulp.watch('./scss/*.scss', ['styles']);
  gulp.watch('./**/*.html').on('change', browserSync.reload);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['styles', 'scripts', 'serve']);
