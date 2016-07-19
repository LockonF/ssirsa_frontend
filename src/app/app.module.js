(function() {
    'use strict';

    angular
        .module('app', [
            'triangular',
            'ngAnimate', 'ngCookies', 'ngSanitize', 'ngMessages', 'ngMaterial',
            'ui.router', 'googlechart', 'chart.js', 'linkify', 'ui.calendar',
            'angularMoment', 'textAngular', 'hljs', 'md.data.table',
            angularDragula(angular), 'ngFileUpload',

            // 'seed-module'
            // uncomment above to activate the example seed module
            'app.translate',
            'angular-oauth2',
            'toastr',
            'restangular',
            // only need one language?  if you want to turn off translations
            // comment out or remove the 'app.translate', line above
            //'app.examples',
            'app.mainApp'
        ])

        // set a constant for the API we are connecting to
        .constant('API_CONFIG', {
            'url':  'http://triangular-api.oxygenna.com/'
        });
})();
