'use strict';

// ADD YOUR YANDEX API KEY HERE
// go here for more info
// https://tech.yandex.com/translate/
var YANDEX_API_KEY = '';

var gulp = require('gulp');
var gutil = require('gulp-util');
var argv = require('yargs').argv;
var map = require('map-stream');
var rename = require('gulp-rename');
var debug = require('gulp-debug');
var batchReplace = require('gulp-batch-replace');
var traverse = require('traverse');
var translate = require('yandex-translate')(YANDEX_API_KEY);
var transform = require('vinyl-transform');
var jsonFormat = require('gulp-json-format');
var runSequence = require('run-sequence');
var jeditor = require('gulp-json-editor');


var paths = gulp.paths;

gulp.task('translate', function () {
  var translateFile = transform(function(filename) {
    return map(function(data, done) {
      var j = JSON.parse(data);
      var translateCount = 0;
      var appTranslated = traverse(j).forEach(function(x) {
        if(typeof x !== 'object') {
          var self = this;
          translateCount++;
          translate.translate(x, { to: argv.to, key: YANDEX_API_KEY }, function(err, res) {
            self.update(res.text.toString());
            translateCount--;
            if(translateCount === 0) {
              var finishedJSON = JSON.stringify(appTranslated);
              gutil.log(gutil.colors.green('Translated ' + filename));
              done(null, finishedJSON);
            }
          });
        }
      });
    });
  });

  // make sure we have a from and to language
  if(argv.from !== undefined && argv.to !== undefined) {
    return gulp.src([
      paths.src + '/app/**/i18n/' + argv.from + '.json',
    ])
    .pipe(translateFile)
    .pipe(jsonFormat(4))
    .pipe(rename({
      basename: argv.to,
    }))
    .pipe(gulp.dest(paths.src + '/app'));
  }
  else {
    gutil.log(gutil.colors.red('Need to specify 2 lanuages e.g. translate --from en --to fr <-- translate en json files to French'));
  }
});

function collateTranslations(obj, callback, trail) {
  trail = trail || [];
  Object.keys(obj).forEach(function (key) {
    var value = obj[key];

    if (Object.getPrototypeOf(value) === Object.prototype) {
      collateTranslations(value, callback, trail.concat(key));
    } else {
      callback.call(obj, key, value, trail);
    }
  });
}

var batchFindAndReplaceValues = [];

gulp.task('translate-collate-english', function () {
  var flattenFile = transform(function(filename) {
    return map(function(data, done) {
      var j = JSON.parse(data);
      collateTranslations(j, function(key, value, trail) {
        batchFindAndReplaceValues.push([
          trail.join('.') + '.' + key,
          value
        ]);
      });
      done();
    });
  });

  return gulp.src(paths.src + '/app/**/il8n/en.json')
  .pipe(flattenFile);
});

gulp.task('translate-replace-english', function () {
  return gulp.src(paths.src + '/app/**/*')
    .pipe(batchReplace(batchFindAndReplaceValues))
    .pipe(gulp.dest(paths.src + '/app'));
});


function string_src(filename, string) {
  var src = require('stream').Readable({ objectMode: true });
  src._read = function () {
    this.push(new gutil.File({ cwd: '', base: '', path: filename, contents: new Buffer(string) }));
    this.push(null);
  };
  return src;
}

gulp.task('translate-write-new-translations', function () {
  var en = {};
  for(var t in batchFindAndReplaceValues) {
    var translation = batchFindAndReplaceValues[t];
    en[translation[1]] = translation[1];
  }

  return string_src('en.json', '{}')
    .pipe(debug({title:'file'}))
    .pipe(jeditor(en, {
      'indent_char': ' ',
      'indent_size': 2
    }))
    .pipe(gulp.dest(paths.src + '/app/i18n/'));
});

gulp.task('translate-flatten-english', function() {
  return runSequence('translate-collate-english', 'translate-replace-english', 'translate-write-new-translations');
});
