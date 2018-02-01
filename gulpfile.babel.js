'use strict';

import plugins        from 'gulp-load-plugins';
import yargs          from 'yargs';
import browser        from 'browser-sync';
import gulp           from 'gulp';
import log            from 'fancy-log';
import rimraf         from 'rimraf';
import child_process  from 'child_process';

// Load all Gulp plugins into one variable
const $ = plugins();

// Your project's server will run on localhost:xxxx at this port
const PORT = 8000;

// Autoprefixer will make sure your CSS works with these browsers
const COMPATIBILITY = [
  "last 2 versions",
  "ie >= 9",
  "ios >= 7"
];

// UnCSS will use these settings
const UNCSS_OPTIONS = {
  html: "src/**/*.html",
  ignore: [
    /.foundation-mq/,
    /^\.is-.*/,
  ]
};

// Gulp will reference these paths when it copies files
const PATHS = {
  // Path to source folder
  src: "_sass",
  // Path to dest folder
  dest: "assets/css",  
  // Paths to Sass libraries, which can then be loaded with @import
  includePaths: [
    "node_modules/foundation-sites/scss",
    "node_modules/motion-ui/src"
  ],
  build: "_site"
};

// Pin jekyll version to that used by github pages - https://pages.github.com/versions/
const JEKYLL_VERSION = "3.6.2";

const PWD = process.cwd();

const JEKYLL_BUILD_CMD = [
  'docker',
  'run',
  '-v',
  `${PWD}:/srv/jekyll`,
  '-v',
  `${PWD}/_cache/bundle:/usr/local/bundle`,
  '-it',
  `jekyll/jekyll:${JEKYLL_VERSION}`,
  'jekyll',
  'build',
  '--incremental'
];

// Check for --production flag
const PRODUCTION = !!(yargs.argv.production);


//-------------------------------------------------------------------------------------------------
// Gulp tasks
//-------------------------------------------------------------------------------------------------

// Build the "dest" folder by running all of the below tasks
gulp.task('build',
 gulp.series(clean, sass, jekyll));

// Build the site, run the server, and watch for file changes
gulp.task('default',
  gulp.series('build', server, watch));

// Delete the "build" folder
// This happens every time a build starts
function clean(done) {
  rimraf(PATHS.build, done);
}

// Compile Sass into CSS
// In production, the CSS is compressed
function sass() {
  return gulp.src(PATHS.src + '/voltaic.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      includePaths: PATHS.includePaths
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: COMPATIBILITY
    }))
    // Comment in the pipe below to run UnCSS in production
    //.pipe($.if(PRODUCTION, $.uncss(UNCSS_OPTIONS)))
    .pipe($.if(PRODUCTION, $.cleanCss({ compatibility: 'ie9' })))
    //.pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(PATHS.dest))
    .pipe(browser.reload({ stream: true }));
}

var building = false;

function jekyll() {
  if (building) {
    log.warn("Jekyll build in progress.");
    return;
  }
  building = true;
  var proc = child_process.spawn(JEKYLL_BUILD_CMD[0], JEKYLL_BUILD_CMD.slice(1), {stdio: 'inherit'});
  proc.on('error', (error) => {
    building = false;
    log.error(error);
  });
  proc.on('close', () => {
    building = false;
    log.info("done jekyll");
  });
  return proc;
}

// Start a server with BrowserSync to preview the site in
function server(done) {
  browser.init({
    server: PATHS.build, port: PORT
  });
  done();
}

// Reload the browser with BrowserSync
function reload(done) {
  browser.reload();
  done();
}

// Watch for changes to static sass files
function watch() {
  gulp.watch(PATHS.src + '/**/*.scss').on('all', sass);
  gulp.watch([
    './**/*.md',
    './**/*.html',
    './assets/**/*',
    '!./node_modules/**/*',
    '!./.git/**/*',
    '!./_site/**/*'
  ]).on('all', gulp.series(jekyll, browser.reload));
}
