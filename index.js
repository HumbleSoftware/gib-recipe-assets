'use strict';

// Modules:
var path = require('path');

// Locals:
var bus = null;


// Exports:
module.exports = factory();


/**
 * Task factory.
 *
 * TODO inject gulp, dummy!
 */
function factory (bus) {

  function task (options) {

    options = config(options);

    // Task:
    return function () {

      var gulp     = this;

      // Asset copy task:
      var s = gulp
        .src(options.src)
        .pipe(gulp.dest(options.dest));

      // Refresh:
      if (bus) {
        s.pipe(bus.refreshStream());
      }

      return s;
    }
  };

  return {
    assetsTask: task,
    factory: factory,
    watch: true
  };
}


/**
 * Configuration options.
 */
function config (options) {

  // Defaults:
  options = options || {};

  // Assertions:
  if (!options.dest) throw new Error('assets-recipe `options.dest` required');
  if (!options.src) throw new Error('assets-recipe `options.src` required');

  return options;
}
