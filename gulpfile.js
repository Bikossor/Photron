var gulp = require('gulp');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var pump = require('pump');
var lessPluginCleanCSS = require('less-plugin-clean-css');

var cleanCSSPlugin = new lessPluginCleanCSS({
	advanced: true
});

var fileName = "ALightBox";
var folderSource = "src/";
var folderDestination = "dist/";

gulp.task("build-less", function (callback) {
	pump([
		gulp.src(folderSource + "*.less"),
		less({
			plugins: [
				cleanCSSPlugin
			]
		}),
		concat(fileName + ".min.css"),
		gulp.dest(folderDestination)
	], callback);
});

gulp.task("build-js", function (callback) {
	pump([
		gulp.src(folderSource + "*.js"),
		uglify(),
		concat(fileName + ".min.js"),
		gulp.dest(folderDestination)
	], callback);
});

gulp.task("default", ["build-less", "build-js"]);