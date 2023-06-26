const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));

// compile scss into css
function style() {
  // where is my scss file
  return (
    gulp
      .src("./scss/**/*.scss")
      // pass that file through sass compiler
      .pipe(sass().on("error", sass.logError))
      // where do I save compiled CSS?
      .pipe(gulp.dest("./css"))
  );
}

function watch() {
  gulp.watch("./scss/**/*.scss", style);
}

exports.style = style;
exports.watch = watch;