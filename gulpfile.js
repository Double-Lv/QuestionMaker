var gulp = require('gulp'),  
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    htmlmin = require('gulp-htmlmin'),
    cache = require('gulp-cache'),
    imagemin = require('gulp-imagemin');

gulp.task('js', function(){
    gulp.src('./src/js/*.js')
    .pipe(concat('Bookstory.min.js'))
    .pipe(uglify({
        compress: {
            drop_console: true
        }
    }))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('framework', function(){
    gulp.src(['./src/framework/**/*.min.js', './src/framework/**/*.min.css'])
    .pipe(gulp.dest('./dist/framework'));

    gulp.src('./src/framework/*.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/framework'));
});

gulp.task('css', function(){
    gulp.src('./src/css/**/*.css')
    .pipe(minifycss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/css'))
});

gulp.task('html', function(){
    gulp.src('./src/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true, minifyJS: true, minifyCss: true}))
    .pipe(gulp.dest('./dist'));
});

gulp.task('image', function(){
    gulp.src('./src/image/*')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('./dist/image'))
});

gulp.task('clean', function() {
    gulp.src(['./dist/'], {read: false})
    .pipe(clean({force: true}));
});

gulp.task('default', ['clean'], function() {
    setTimeout(function(){
        gulp.start(['js', 'framework', 'css', 'html', 'image']);
    }, 100);
});