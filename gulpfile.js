var gulp = require('gulp'),  
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    htmlmin = require('gulp-htmlmin'),
    cache = require('gulp-cache'),
    imagemin = require('gulp-imagemin'),
    modify = require('gulp-modify');

gulp.task('js', function(){
    gulp.src('./src/js/*.js')
    .pipe(concat('QuestionMaker.min.js'))
    .pipe(uglify({
        mangle: false,
        compress: {
            drop_console: true
        }
    }))
    .pipe(modify({
        fileModifier: function(file, contents) {
            return contents.replace(/\/src\//g, '/dist/');
        }
    }))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('lib', function(){
    gulp.src(['./src/lib/**/*', './src/lib/**/*'])
    .pipe(gulp.dest('./dist/lib'));
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

gulp.task('modify', function(){
    setTimeout(function(){
        gulp.src('./dist/index.html')
        .pipe(modify({
            fileModifier: function(file, contents) {
                return contents.replace(/\/src\//g, '/dist/').replace(/<!--\{main\}-->.*<!--\{endmain\}-->/g, '<script src="/dist/js/QuestionMaker.min.js"></scirpt>').replace(/base.css/, 'base.min.css');
            }
        }))
        .pipe(gulp.dest('./dist'));
    }, 200);
    
});

gulp.task('default', ['clean'], function() {
    setTimeout(function(){
        gulp.start(['js', 'lib', 'css', 'html', 'modify']);
    }, 100);
});