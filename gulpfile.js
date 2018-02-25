const gulp = require("gulp");
const Browser = require("browser-sync");
const del = require("del");

const browser = Browser.create();

function bs() {
  browser.init({
    server: {
      baseDir: "dist"
    },
    browser: "firefox",
    open: true
  });

  gulp.watch("dist/**/*").on("change", () => browser.reload());
}

function cleanDistFolder(done) {
  del("dist").then(paths => {
    console.log('Deleted files and folders:\n', paths.join('\n'));
  });
  done();
}

function copyToDist(done) {
  gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
    done();
}

gulp.task("default", bs);

gulp.task("clean", cleanDistFolder);

gulp.task("copy", copyToDist);

gulp.task("test", gulp.series(["clean", "copy"]));

gulp.task("watch", function () {
  gulp.watch('src/**/*', gulp.series(["clean", "copy"], function (done) {
    console.log("dwwddwwd");
    browser.reload;
    done();
  }));
})
