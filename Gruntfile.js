var gulp = require('gulp'),
	gulp = require('gulp'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant');


  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);
	 
	gulp.task('default', function () {
		return gulp.src('images/spacesloth*')
			.pipe(imagemin({
				progressive: true,
				svgoPlugins: [{removeViewBox: false}],
				use: [pngquant()]
			}))
			.pipe(gulp.dest('/images/min/spacesloth'));
	});
