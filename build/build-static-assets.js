// building other assets
const gulp = require('gulp'); 

// './src/img/*' -> all img in that folder
return gulp.src(['./src/sw.js', './src/manifest.json', './src/img/**/'])
    // with dest, it writes the resulting file to a specific location
    // here its the location in de public folder and in there is a css folder, it will be put there, 
    // it will create those folders to put the minified css in there
    .pipe(gulp.dest('./public'));