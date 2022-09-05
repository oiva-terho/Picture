"use strict";
import del from "del";
import gulp from "gulp";
import jsonServer from 'json-server';
import browserSync from "browser-sync";
import webpack from "webpack-stream";

const dest = "/OpenServer/domains/Picture",
      src = "./src";
const path = {
  src: src,
  dest: dest,
  db: `${src}/assets/db.json`,
  html: `${src}/*.html`,
  assets: `${src}/assets/**/*.*`,
  js: {
    src: `${src}/js/main.js`,
    watch: `${src}/**/*.js`,
  }
};

const clear = () => { return del(dest, {force: true}); };

const copyhtml = () => {
    return gulp.src(path.html)
                .pipe(gulp.dest(dest));
};

const buildJs = () => {
  return gulp.src(path.js.src)
    .pipe(webpack({
      mode: 'development',
      output: {
        filename: 'script.js'
      },
      watch: false,
      devtool: "source-map"
    }))
    .pipe(gulp.dest(dest));
};

const copyAssets = () => {
    return gulp.src(path.assets)
                .pipe(gulp.dest(`${dest}/assets`));
};

const servers = () => {
  const server = jsonServer.create();
  const router = jsonServer.router(path.db);
  const middlewares = jsonServer.defaults();

  server.use(middlewares);
  server.use(router);
  server.listen(3000, () => {
      console.log('JSON Server is running');
  });

  browserSync.init({
    server: { baseDir: dest },
    socket: { domain: 'localhost:3001' },
    notify: true
  });
};

const watcher = () => {
  gulp.watch(path.html, copyhtml).on("all", browserSync.reload);
  gulp.watch(path.assets, copyAssets).on("all", browserSync.reload);
  gulp.watch(path.js.watch, buildJs).on("all", browserSync.reload);
};

const buildProdJs = () => {
  return gulp.src(path.js.src)
    .pipe(webpack({
      mode: 'production',
      output: {
        filename: 'script.js'
      },
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [['@babel/preset-env', {
                  corejs: 3,
                  useBuiltIns: "usage"
                }]]
              }
            }
          }
        ]
      }
    }))
    .pipe(gulp.dest(dest));
};

export const dev = gulp.series(
  clear, copyhtml, copyAssets, buildJs,
  gulp.parallel(watcher, servers)
);
export const build = gulp.series(
  clear,
  gulp.parallel(copyhtml, copyAssets, buildProdJs)
);
export default dev;