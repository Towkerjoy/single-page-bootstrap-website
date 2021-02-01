// Please flow this steps
// 1. install npm
// 2. npm install gulp -g
// 3. npm init
// 4. npm install gulp -D
// 5. npm install gulp-sass
// 6. npm install bootstrap jquery popper.js @fortawesome/fontawesome-free --save
// 7. npm install browser-sync

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

// Compile SASS
gulp.task('sass', function(){
  return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());
});

gulp.task('watch', function(){
    browserSync.init({
        server: {
          baseDir: './src'
        }
      });
      gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], gulp.series(['sass']));
      gulp.watch("src/*.html").on('change', browserSync.reload);
      return
  });

// Move JS Files to SRC
gulp.task('js', function(){
  return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.slim.js', 'node_modules/popper.js/dist/popper.min.js'])
    .pipe(gulp.dest("src/js"))
    .pipe(browserSync.stream());
});

// Move Font Awesome Fonts folder to src
gulp.task('fonts', function(){
  return gulp.src('node_modules/@fortawesome/fontawesome-free/webfonts/*')
    .pipe(gulp.dest("src/fonts"));
});

// Move font awesome css file
gulp.task('fa', function(){
  return gulp.src('node_modules/@fortawesome/fontawesome-free/css/fontawesome.min.css')
    .pipe(gulp.dest("src/css"));
});

gulp.task('default', gulp.series(['sass', 'js', 'fonts', 'fa', 'watch']));