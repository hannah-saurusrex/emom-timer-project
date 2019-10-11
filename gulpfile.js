const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

// compile scss into css
function style() {
    // 1. access original css file
    return gulp.src('./app/assets/styles/**/*.css')
    // 2. pass the main css file into a scss compiler
    .pipe(sass().on('error', sass.logError))
    // 3. save the newly compiled styles file in a new place
    .pipe(gulp.dest('./app/temp/styles'))
    // 4. stream all changes to browsers via browser sync
    .pipe(browserSync.stream())
}

// create a watch task to watch for any changes being made, and update browser according to changes
function watch() {
    browserSync.init({
        server: {
            baseDir: "app"
        }
    });
    gulp.watch('./app/assets/styles/**/*.css', style);
    gulp.watch('./app/*.html').on('change', browserSync.reload);
    gulp.watch('./app/**/*.js').on('change', browserSync.reload);
}


exports.style = style;
exports.watch = watch;
