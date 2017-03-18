/* eslint global-require: 0, import/no-extraneous-dependencies: 0 */
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const nodemon = require('gulp-nodemon');

const jsFiles = [
  'server/src/**/*.js',
  'server/tests/**/*.js',
  'app.js',
];

const testGlobs = [
  'server/tests/**/*.spec.js',
  '!node_modules/**',
  '!coverage/**',
];

gulp.task('lint', () => {
  return gulp.src(jsFiles)
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task('start', () => {
  nodemon({
    script: 'app.js',
    watch: '*.*',
    ext: 'js json html yml',
    ignore: ['node_modules/**', 'tests/**'],
    tasks: ['lint'],
  });
});

let istanbul = '';

/* Setup Istanbul for tests reporting */
gulp.task('test:setupIstanbul', () => {
  istanbul = require('gulp-istanbul');

  const globs = [
    '**/*.js',
    '!node_modules/**',
    '!coverage/**',
    '!tests/**',
  ];
  return gulp.src(globs)
  .pipe(istanbul({ includeUntested: true }))
  .pipe(istanbul.hookRequire());
});

/* Unit Test Runner (Mocha) */
gulp.task('test', ['test:setupIstanbul'], () => {
  const mocha = require('gulp-mocha');

  return gulp.src(testGlobs, { read: false })
  .pipe(mocha({
    ui: 'bdd',
    timeout: 45000,
    require: ['co-mocha'],
  }))
  .pipe(istanbul.writeReports({
    reporters: ['text-summary', 'html'],
  }));
});

gulp.task('default', ['lint', 'start']);
