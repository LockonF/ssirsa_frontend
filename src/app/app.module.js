(function() {
    'use strict';

    angular
        .module('app', ['sssirsa.config',
            'triangular',
            'ngAnimate', 'ngCookies', 'ngSanitize', 'ngMessages', 'ngMaterial',
            'ui.router', 'googlechart', 'chart.js', 'linkify', 'ui.calendar',
            'angularMoment', 'textAngular', 'hljs', 'md.data.table','ngMdIcons',
            'vAccordion', 'ngMaterialDatePicker','mdPickers',
            angularDragula(angular), 'ngFileUpload','pusher-angular',

            // 'seed-module'
            // uncomment above to activate the example seed module
            'app.translate',
            'angular-oauth2',
            'toastr',
            'restangular',
            'ui.tree',

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
