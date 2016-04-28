
var gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    babel = require('babelify'),
    rename = require('gulp-rename'),
    es = require('event-stream'),
    htmlreplace = require('gulp-html-replace'),
    preprocess = require('gulp-preprocess');



var files = [
    './app/app-electron.js',
    './app/app-cordova.js'
];

function compile(watch) {
    return files.map(entry => {
        const b = browserify({
            entries: [entry],
            extensions: ['.js'],
            debug: true,
            cache: {},
            packageCache: {},
            fullPaths: true,
            plugin: watch ? [watchify] : ''
        })
        .transform(babel);

        const bundle = () => {
            return b.bundle()
            .pipe(source(entry))
            .pipe(buffer())
            .pipe(rename({
                dirname: '',
                extname: '.bundle.js'
            }))
            .pipe(gulp.dest('./www/'));
        };

        b.on('update', bundle);
        return bundle();
    });
}


gulp.task('build', function(done) {
    const tasks = compile();
    es.merge(tasks).on('end', done);
});

gulp.task('watch', function(done) {
    const tasks = compile(true);
    es.merge(tasks).on('end', done);
});

gulp.task('html', function() {
    gulp.src('./app/*.html')
        .pipe(preprocess({context: { APP_BUILDER: 'cordova', DEBUG: true}}))
        .pipe(rename({
            dirname: '',
            extname: '.cordova.html'
        }))
        .pipe(gulp.dest('./www'));

    gulp.src('./app/*.html')
        .pipe(preprocess({context: { APP_BUILDER: 'electron', DEBUG: true}}))
        .pipe(rename({
            dirname: '',
            extname: '.electron.html'
        }))
        .pipe(gulp.dest('./www'));
});

gulp.task('default', ['build']);
