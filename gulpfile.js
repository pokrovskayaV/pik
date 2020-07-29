let project_folder = "build";
let sourse_folder = "src";

let path = {
  build: {
    html: project_folder + "/",
    css: project_folder + "/css/",
    js: project_folder + "/js/",
    img: project_folder + "/img/",
    fonts: project_folder + "/font/"
  },
  src: {
    html: [sourse_folder + "/*.pug", sourse_folder + "/blocks/*.pug"],
    css: sourse_folder + "/scss/*.scss",
    js: [sourse_folder + "/js/*.js", sourse_folder + "/js/parts/*.js"],
    img: sourse_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    fonts: sourse_folder + "/font/*.{ttf,woff,woff2}"
  },
  watch: {
    html: [sourse_folder + "/*.pug", sourse_folder + "/blocks/*.pug"],
    css: sourse_folder + "/scss/**/*.scss",
    js: [sourse_folder + "/js/*.js", sourse_folder + "/js/parts/*.js"],
    img: sourse_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    fonts: sourse_folder + "/font/*.{ttf,woff,woff2}"
  },
  clean: "./" + project_folder + "/"
};

let { watch, src, dest, parallel, series } = require("gulp"),
  gulp = require("gulp"),
  browserSync = require("browser-sync"),
  del = require("del"),
  scss = require("gulp-sass"),
  autoprefixer = require("gulp-autoprefixer"),
  cssnano = require("gulp-cssnano"),
  group_media = require("gulp-group-css-media-queries"),
  pug = require("gulp-pug"),
  imagemin = require("gulp-imagemin"),
  webpack = require("webpack-stream"),
  plumber = require("gulp-plumber"),
  ttf2woff = require("gulp-ttf2woff"),
  ttf2woff2 = require("gulp-ttf2woff2");

function buildPages() {
  return src("src/*.pug")
    .pipe(plumber())
    .pipe(pug())
    .pipe(dest(path.build.html));
}

function buildStyles() {
  return src(path.src.css)
    .pipe(scss())
    .pipe(group_media())
    .pipe(cssnano())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 5 versions"],
        cascade: true
      })
    )
    .pipe(dest(path.build.css));
}

function buildScripts() {
  return src("src/js/index.js")
    .pipe(webpack({ output: { filename: "bundle.js" } }))
    .pipe(dest(path.build.js));
}


function buildImages() {
  return src(path.src.img)
    .pipe(
      imagemin({
        interlaced: true,
        progressive: true,
        optimizationLevel: 3,
        svgoPlugins: [{ removeViewBox: false }]
      })
    )
    .pipe(dest(path.build.img));
}

function buildLibraryScripts() {
  return src("src/js/library/*.js").pipe(dest("build/js/library"));
}


function buildLibraryStyles() {
  return src("src/styles/*.css").pipe(dest("build/styles/"));
}

function devServer(cb) {
  var params = {
    watch: true,
    reloadDebounce: 150,
    notify: false,
    server: { baseDir: "./build" }
  };
  browserSync.create().init(params);
  cb();
}

function buildFonts() {
  src(path.src.fonts)
    .pipe(ttf2woff())
    .pipe(dest(path.build.fonts));
  return src(path.src.fonts)
    .pipe(ttf2woff2())
    .pipe(dest(path.build.fonts));
}

function clearBuild() {
  return del("build/");
}

function watchFiles() {
  watch(path.src.html, buildPages);
  watch(path.src.css, buildStyles);
  watch(path.src.js, buildScripts);
  watch(path.src.img, buildImages);
  watch(path.src.fonts, buildFonts);
}

exports.default = series(
  clearBuild,
  parallel(
    devServer,
    series(
      parallel(
        buildPages,
        buildStyles,
        buildScripts,
        buildImages,
        buildFonts,
        buildLibraryScripts,
        buildLibraryStyles
      ),
      watchFiles
    )
  )
);
