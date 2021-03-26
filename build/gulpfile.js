// source, followed following tutorial: https://www.freecodecamp.org/news/super-simple-gulp-tutorial-for-beginners-45141974bfe8/
// importing modules gulp 
const gulp = require('gulp'); 
// minifies css
const cssnano = require('gulp-cssnano'); 
// combines js files
const concat = require('gulp-concat'); 
// minifies js
const uglify = require('gulp-uglify');

//creating a gulp task, you can then run for example gulp minifyCSS in command line to run it
gulp.task('minifyCSS', function(){   
    //src: identifies what files i want to compile in this task 
    return gulp.src('/src/css/style.css')
        //minify the css file
        .pipe(cssnano())
        // with dest, it writes the resulting file to a specific location 
        // here its the location in de static folder and in there is a css folder, it will be put there
        .pipe(gulp.dest('/public/css'));
})