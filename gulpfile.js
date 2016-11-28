'use strict';

// Plugins
const addsrc = require('gulp-add-src');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const gulp = require('gulp');
const less = require('gulp-less');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const icons = require('gulp-image-data-uri');

/**
 * General
 */
gulp.task('default', ['watch']);

/**
 * LESS
 */
gulp.task('less', () => {

    return gulp.src('styles/custom.less')
        .pipe(plumber({
            errorHandler: onPlumberError
        }))
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(autoprefixer({
            browsers: [
                'last 2 versions',
                'safari 5',
                'ie 9',
                'opera 12.1',
                'ios 6',
                'android 4'
            ],
            cascade: true
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('styles'))
});

/**
 * JS
 */
gulp.task('js', () => {

    return gulp.src('scripts/dev/modules/**/*.js')
        .pipe(plumber({
            errorHandler: onPlumberError
        }))
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(addsrc.prepend('scripts/dev/libs/**/*.js'))
        .pipe(concat('bundle.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('scripts'));
});

/**
 * Icons
 */
gulp.task('icons', () => {

    return gulp.src('images/icons/**/*')
        .pipe(plumber({
            errorHandler: onPlumberError
        }))
        .pipe(icons({
            template: {
                file: 'gulp/icons-template'
            }
        }))
        .pipe(concat('icons.less'))
        .pipe(gulp.dest('styles/common'))
});

/**
 * Build
 */
gulp.task('build', ['icons', 'less', 'js'], () => {
    console.log('BUILD DONE');
});

/**
 * Watch
 */
gulp.watch('styles/**/*', ['less']);

gulp.task('watch', () => {

    gulp.watch('styles/**/*', ['less']);
    gulp.watch('scripts/dev/**/*', ['js']);
    gulp.watch('images/icons/**/*', ['icons']);
});

function onPlumberError(error) {
    console.log(error, ' plumber Error');
    this.emit('end');
}