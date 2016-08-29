
var gulp = require('gulp'),
  awspublish = require('gulp-awspublish'),
  gutil = require('gulp-util'),
  conf = require('./conf'),
  path = require('path'),
  fileExists = require('file-exists'),
  run = require('gulp-sequence');
const  del = require('del');

var argv= require('yargs').argv;
var enviroment=argv.env==true?'development':argv.env;

var localConfig = {
  buildSrc: './build/**/*',
  getAwsConf: function (environment) {
    var conf = require('../config/config.json');
    if (!conf[environment]) {
      throw 'No aws conf for env: ' + environment;
    }
    return {keys: conf[environment].EnvironmentConfig.deploy};
  }
};

gulp.task('deploy',['cleanMinify','configuration','buildapp'], function () {
  var awsConf = localConfig.getAwsConf(enviroment);
  var publisher = awspublish.create(awsConf.keys);
  return gulp.src(path.join(conf.paths.dist, '/**/*'))
    .pipe(awspublish.gzip({ext: ''}))
    .pipe(publisher.publish())
    .pipe(publisher.cache())
    .pipe(publisher.sync())
    .pipe(awspublish.reporter());
});
gulp.task('cleanMinify',function () {
  if(enviroment=='staging'){
    if(fileExists('.awspublish-genesis-stg.com')){
      del.sync(['dist/', '.awspublish-genesis-stg.com']);
    }
  }else if(enviroment=='production'){
    if(fileExists('.awspublish-alderaan.mimoni.com')){
      del.sync(['dist/', '.awspublish-alderaan.mimoni.com']);
    }
  }else if (enviroment=='development'){
    if(fileExists('.awspublish-alderaan-dev.mimoni.com')){
      del.sync(['dist/', '.awspublish-alderaan-dev.mimoni.com']);
    }
  }
});

gulp.task('configuration',function () {
  if(enviroment=='staging'){
    run('config')();
  }else if(enviroment=='production'){
    run('config:build')();
  }else if (enviroment=='development'){
    run('config:dev')();
  }
});
