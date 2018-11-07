var gulp = require("gulp")
var ts = require("gulp-typescript")
var tsProject = ts.createProject("tsconfig.json")
var sourcemaps = require('gulp-sourcemaps')
var spawn = require('child_process').spawn
var del = require('del')
var node;

gulp.task('clean', gulp.series(function () {
    return del('dist')
}))

gulp.task('js', gulp.series(function js() {
    var reporter = ts.reporter.fullReporter();
    var tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject(reporter));
    return tsResult.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("dist"));
}));

gulp.task('server', gulp.series(function (done) {
    if (node) node.kill()
    node = spawn('node', ['dist/index.js'], { stdio: 'inherit' })
    node.on('close', function (code) {
        if (code === 8) {
            gulp.log('Error detected, waiting for changes...');
        }
    });
    done();
}))

gulp.task("watch-js", gulp.series(function watchjs() {
    gulp.watch(["./src/**/*.ts","*.ts", "./src/*.ts"], gulp.series('js', 'server')); // run the "js" task when a file is modified
}));

gulp.task("watch", gulp.series('clean', gulp.parallel(gulp.series('js','server'),'watch-js')));

gulp.task("default", gulp.series('clean', 'js', 'server'))

process.on('exit', function () {
    if (node) node.kill()
})