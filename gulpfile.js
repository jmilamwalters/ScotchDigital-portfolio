// Load Gulp
var gulp    = require('gulp'),
    gutil   = require('gulp-util');
    plugins = require('gulp-load-plugins')();
var stylus  = require('gulp-stylus');
var sass    = require('gulp-sass'); // Load Sass plugin
var jade    = require('gulp-jade'); // Load Jade plugin


// Minify jQuery Plugins: run manually with: "gulp squish-jquery"
gulp.task('squish-jquery', function() {
  return gulp.src('./src/assets/js/libs/**/*.js')
    .pipe(plugins.uglify())
    .pipe(plugins.concat('jquery.plugins.min.js'))
    .pipe(gulp.dest('src/assets/js'));
});

// Minify Custom JS: Run manually with: "gulp build-js"
gulp.task('build-js', function() {
  return gulp.src('./src/assets/js/*.js')
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish'))
//    .pipe(plugins.uglify())
    .pipe(plugins.concat('scripts.min.js'))
    .pipe(gulp.dest('./src/assets/js'));
});

// Get .styl files and render
gulp.task('stylus', function () {
  gulp.src('./src/assets/css/*.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./src/assets/css'));
//    .pipe(gulp.dest('./build/assets/css/'));
});

/*
// Options compress
gulp.task('compress', function () {
  gulp.src('./src/assets/css/compressed.styl')
    .pipe(stylus({
      compress: true
    }))
    .pipe(gulp.dest('./build/assets/css'));
});
*/

/* Stylus to CSS: Run manually with: "gulp build-stylus" */
gulp.task('build-stylus', function() {
    return gulp.src('./src/assets/css/*.styl')
        .pipe(plugins.plumber())
        .pipe(plugins.stylus())
        .on('error', function (err) {
            gutil.log(err);
            this.emit('end');
        })
        .pipe(plugins.autoprefixer(
            {
                browsers: [
                    '> 1%',
                    'last 2 versions',
                    'firefox >= 4',
                    'safari 7',
                    'safari 8',
                    'IE 8',
                    'IE 9',
                    'IE 10',
                    'IE 11'
                ],
                cascade: false
            }
        ))
//        .pipe(plugins.cssmin())
        .pipe(gulp.dest('./assets/css')).on('error', gutil.log)
        .pipe(plugins.livereload());
});

// Get .scss files and render
gulp.task('sass', function () {
  gulp.src('./src/assets/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./src/assets/css'));
});

// Sass to CSS: Run manually with: "gulp build-sass"
gulp.task('build-sass', function() {
    return gulp.src('./src/assets/scss/**/*.scss')
        .pipe(plugins.plumber())
        .pipe(plugins.sass())
        .on('error', function (err) {
            gutil.log(err);
            this.emit('end');
        })
        .pipe(plugins.autoprefixer(
            {
                browsers: [
                    '> 1%',
                    'last 2 versions',
                    'firefox >= 4',
                    'safari 7',
                    'safari 8',
                    'IE 8',
                    'IE 9',
                    'IE 10',
                    'IE 11'
                ],
                cascade: false
            }
        ))
//        .pipe(plugins.cssmin())
        .pipe(gulp.dest('.src/assets/css')).on('error', gutil.log)
        .pipe(plugins.livereload());
});

// Compile Jade to HTML
gulp.task('templates', function() {
//  var YOUR_LOCALS = {};
  gulp.src('./src/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./src'))
    .pipe(plugins.livereload());
});

// Default task
  gulp.task('watch', function() {
    gulp.watch('./src/assets/js/libs/**/*.js', ['squish-jquery']);
    gulp.watch('./src/assets/js/*.js', ['build-js']);
    gulp.watch('./src/assets/css/**/*.styl', ['build-stylus']);
    gulp.watch('./src/assets/scss/**/*.scss', ['build-sass']);
    gulp.watch('./src/*.jade', ['templates']);
});

// Start Watching: Run "gulp"
gulp.task('default', ['watch', 'build-js', 'build-stylus', 'build-sass', 'templates']);
