var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
 
gulp.task('default', function () {
    return gulp.src('img/doodles/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
			optimizationLevel: 4,
			use: [pngquant()]

        }))
        .pipe(gulp.dest('img/min'));
});
