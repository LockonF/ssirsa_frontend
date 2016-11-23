
var gulp = require('gulp'),
  fileExists = require('file-exists'),
  run = require('gulp-sequence');
const  del = require('del');

var argv= require('yargs').argv;
var enviroment=argv.env==true?'development':argv.env;

gulp.task('buildAppConfig',['cleanMinify','configuration','buildapp'],function () {

});
gulp.task('cleanMinify',function () {
  if(enviroment=='staging'){
    if(fileExists('.awspublish-csp-stg')){
      del.sync(['dist/', '.awspublish-csp-stg']);
    }
  }else if(enviroment=='production'){
    if(fileExists('.awspublish-genesis.sssirsa.com')){
      del.sync(['dist/', '.awspublish-genesis.sssirsa.com']);
    }
  }else if (enviroment=='development'){
    if(fileExists('.awspublish-genesis-dev.sssirsa.com')){
      del.sync(['dist/', '.awspublish-genesis-dev.sssirsa.com']);
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
