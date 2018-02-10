var gulp = require('gulp');
var connect = require('gulp-connect');
var inject = require('gulp-inject');
var include = require("gulp-include");
var express = require("express");
var app     = express();

var server_port = process.env.PORT || 5000;
var server_host = '0.0.0.0';

gulp.task('index', function() {
    var target = gulp.src('app/main.html');
   
    return target.pipe();

});

gulp.task('connect', function() {
    connect.server({
        root: 'app',
        livereload: true,
        port: 8081
    });
});

gulp.task('html', function() {
    gulp.src('./app/**/*.html')
        .pipe(connect.reload());
});

gulp.task('js', function() {
    gulp.src('./app/**/*.js')
        .pipe(connect.reload());
    console.log("Tste");
});

gulp.task('css', function() {
    gulp.src('./app/**/*.css')
        .pipe(connect.reload());
    console.log("Teste");
});

gulp.task('watch', function() {
    gulp.watch(['./app/**/*.html'], ['html']);
    gulp.watch(['./app/**/*.js'], ['js']);
    gulp.watch(['./app/**/*.css'], ['css']);
});

gulp.task('default', ['connect', 'watch', 'index']);


gulp.task('serveprod', function() {
    connect.server({
        root: 'app',
        port: process.env.PORT, // localhost:5000
        livereload: false
    });
});

app.listen(server_port, server_host, function() {
    console.log('Listening on port %d', server_port);
});