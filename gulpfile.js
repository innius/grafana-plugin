var gulp = require('gulp');
var del = require('del');

var typescript = require('gulp-typescript');
var tslint = require('gulp-tslint');
var stylish = require('tslint-stylish');
var tsProject = typescript.createProject('tsconfig.json');
var runSequence = require('run-sequence');

var mocha = require('gulp-mocha');
var options = {
    dist: './dist',
    specs: 'specs/*.ts'
}

gulp.task('clean', function () {
    return del('dist');
});


gulp.task('compile', ['lint'], () => {
    return  gulp.src("src/**/*.ts" )
        .pipe(tsProject())
        .pipe(gulp.dest(options.dist));    
})

gulp.task('lint', function () {
    gulp.src('src/**/*.ts')
        .pipe(tslint())
        .pipe(tslint.report(stylish, {
            emitError: true,
            sort: true
        }));
});

gulp.task('test', ['compile-specs'], () => {    
    return gulp.src("dist/specs/*.js")
        .pipe(mocha({ reporter: 'dot' }));
})

gulp.task('compile-specs',['clean'], () => {    
    return gulp.src(['specs/*.ts', 'src/*.ts'], {base: './'})
        .pipe(typescript.createProject('tsconfig.json', {module : "commonjs"})())
         .js.pipe(gulp.dest(options.dist));
})

gulp.task('copy', () => {
     gulp.src(['README.md'])
        .pipe(gulp.dest(options.dist))        
      return gulp.src([
          'src/components/config.html', 
          'src/**/partials/**', 
          'src/**/plugin.json',           
          'src/**/css/**', 
          'src/**/img/**', 
          'src/README.md'],{base: './src'})
        .pipe(gulp.dest(options.dist))
})

gulp.task("watch", ["default"], () => {
    gulp.watch('src/**/*', ['default']);
});

gulp.task("default", (done) => {
     runSequence('test', 'clean', 'compile', 'copy',  done);
});