// building and minifying css

// source, followed following tutorial: https://www.freecodecamp.org/news/super-simple-gulp-tutorial-for-beginners-45141974bfe8/
// importing modules gulp 
const gulp = require('gulp'); 
// minifies css
const cssnano = require('gulp-cssnano'); 

return gulp.src('./src/css/style.css')
        //minify the css file
        .pipe(cssnano())
        // with dest, it writes the resulting file to a specific location
        // here its the location in de public folder and in there is a css folder, it will be put there, 
        // it will create those folders to put the minified css in there
        .pipe(gulp.dest('./public/css'));