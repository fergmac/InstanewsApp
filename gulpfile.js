var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename  = require('gulp-rename');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');
var eslint = require('gulp-eslint');
var sass = require('gulp-sass'),
var autoprefixer = require('gulp-autoprefixer'),
var cssnano = require('gulp-cssnano'),
var styles =('Sass_practice/sass-e1/style.scss')
var destination = ('Sass_practice/sass-e1/css/')



gulp.task('sayHello', function(){
	console.log('Hello world');

});

gulp.task('sass', function() {
   gulp.src(styles)
      .pipe(sass())
      .pipe(autoprefixer({
         browsers: ['last 2 versions']
      }))
      .pipe(gulp.dest(destination))
      .pipe(cssnano())
      .pipe(rename('style.min.css'))
      .pipe(gulp.dest(destination));
});

gulp.task('compress', function(){
    gulp.src('./js/*.js') // What files do we want gulp to consume?
      .pipe(eslint())
      .pipe(uglify()) // Call the uglify function on these files
      .pipe(plumber())
      .pipe(rename({ extname: '.min.js' })) //  Rename the uglified file
      .pipe(gulp.dest('./build/js')) // Where do we put the result?
    });


gulp.task('browser-sync', function() {
  browserSync.init({
    proxy: "yourlocal.dev"
  });
});  

gulp.task('watch', function() {
  gulp.watch('js/*.js', ['scripts']);
  gulp.watch('styles');

});


gulp.task('default',['watch', 'compress', 'browser-sync', 'sass']);


