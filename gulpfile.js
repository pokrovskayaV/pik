let project_folder = "build";
let sourse_folder = "src";

let path = {
  build: {
    html: project_folder + "/",
    css: project_folder + "/css/",
    js: project_folder + "/js/",
    img: project_folder + "/img/",
    fonts: project_folder + "/fonts/",
    libjs: project_folder + "/js/lib/",
    libcss: project_folder + "/css/lib/",
  },
  src: {
    pug: sourse_folder + "/*.pug",
    scss:[sourse_folder + "/scss/*.scss", sourse_folder + "/scss/blocks/*.scss"],
    js: sourse_folder + "/js/*.js",
    img: sourse_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    fonts: sourse_folder + "/fonts/*.{ttf,woff,woff2}",
    libjs: sourse_folder + "/js/lib/*.js",
    libcss: sourse_folder + "/scss/lib/*.css",
  },
  watch: {
    pug: [sourse_folder + "/*.pug", sourse_folder + "/blocks/*.pug"],
    scss:[sourse_folder + "/scss/*.scss", sourse_folder + "/scss/blocks/*.scss"],
    js: [sourse_folder + "/js/*.js", sourse_folder + "/js/parts/*.js"],
    img: sourse_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    fonts: sourse_folder + "/fonts/*.{ttf,woff,woff2}",
    libcss: sourse_folder + "/scss/lib/*.css",
  },
  clean: "./" + project_folder + "/",
};

let { watch, src, dest, parallel, series } = require("gulp"),
  gulp = require("gulp"),
  browserSync = require("browser-sync"),
  del = require("del"),
  htmlbeautify = require('gulp-html-beautify'),
  scss = require("gulp-sass"),
  autoprefixer = require("gulp-autoprefixer"),
  cssnano = require("gulp-cssnano"),
  criticalCss = require('gulp-critical-css'),
  group_media = require("gulp-group-css-media-queries"),
  pug = require("gulp-pug"),
  imagemin = require("gulp-imagemin"),
  webpack = require("webpack-stream"),
  plumber = require("gulp-plumber"),
  typograf = require('gulp-typograf'),
  ttf2woff = require("gulp-ttf2woff"),
  ttf2woff2 = require("gulp-ttf2woff2");

function buildPages() {
  return src(path.src.pug)
    .pipe(plumber())
    .pipe(pug())
    .pipe(htmlbeautify({indentSize: 2}))
    .pipe(typograf({ locale: ['ru', 'en-US'] }))
    .pipe(dest(path.build.html));
}


function buildStyles() {
  return src(path.src.scss)
    .pipe(scss())
    .pipe(group_media())
    .pipe(cssnano())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 5 versions"],
        cascade: true,
      })
    )
    .pipe(dest(path.build.css));
}

function buildScripts() {
  return src(path.src.js)
    .pipe(plumber())
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
        svgoPlugins: [{ removeViewBox: false }],
      })
    )
    .pipe(dest(path.build.img));
}

function buildLibraryScripts() {
  return src(path.src.libjs).pipe(dest(path.build.libjs));
}

function buildLibraryStyles() {
  return src(path.src.libcss).pipe(dest(path.build.libcss));
}

function devServer(cb) {
  var params = {
    watch: true,
    reloadDebounce: 150,
    notify: false,
    server: { baseDir: "./build" },
  };
  browserSync.create().init(params);
  cb();
}

function buildFonts() {
  return src(path.src.fonts).pipe(dest(path.build.fonts));
}

function clearBuild() {
  return del(path.clean);
}

function watchFiles() {
  watch(path.watch.pug, buildPages);
  watch(path.watch.scss, buildStyles);
  watch(path.watch.js, buildScripts);
  watch(path.watch.img, buildImages);
  watch(path.watch.fonts, buildFonts);
  watch(path.watch.libcss, buildLibraryStyles);
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
