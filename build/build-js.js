// building & minifying js for better performance
const gulp = require('gulp'); 
// minifies js
const uglify = require('gulp-uglify');

//src: identifies what files i want to compile in this task 
return gulp.src('./src/script/script.js')
    //minify the css file
    .pipe(uglify())
    // with dest, it writes the resulting file to a specific location
    // here its the location in de public folder and in there is a css folder, it will be put there, 
    // it will create those folders to put the minified css in there
    // ./ -> otherwise will make the public folder inside the build folder
    .pipe(gulp.dest('./public/script'));