var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename  = require('gulp-rename');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');
var eslint = require('gulp-eslint');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var styles =('css/*.scss');
var styleOut = ('./css/'); 



gulp.task('sayHello', function(){
	console.log('Hello world');

});

gulp.task('sass', function() {
   gulp.src(styles)
      .pipe(sass())
      .pipe(autoprefixer({
         browsers: ['last 2 versions']
      }))
      .pipe(gulp.dest(styleOut))
      .pipe(cssnano())
      .pipe(rename('style.min.css'))
      .pipe(gulp.dest('build'));
});

gulp.task('compress', function(){
    gulp.src(['js/*.js','lib/*.js']) // What files do we want gulp to consume?
      .pipe(eslint())
      .pipe(uglify()) // Call the uglify function on these files
      .pipe(plumber())
      .pipe(rename({ extname: '.min.js' })) //  Rename the uglified file
      .pipe(gulp.dest('build')) // Where do we put the result?
    });


gulp.task('browser-sync', function() {
  browserSync.init({
    server:  {
      baseDir: "./"
    }
  });
});  

gulp.task('watch', function() {
  gulp.watch('js/*.js', ['compress']).on('change', browserSync.reload);
  gulp.watch('css/*.scss', ['sass']).on('change', browserSync.reload);

});

   
gulp.task('default',['watch', 'compress', 'browser-sync', 'sass']);


