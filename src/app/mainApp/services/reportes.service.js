/**
 * Created by Emmanuel on 16/10/2016.
 */
(function(){
    'use_strict';

    angular
        .module('app.mainApp.reportes')
        .factory('Reportes',Reportes);

    function Reportes(Restangular){
        var path= Restangular.all('report_builder').all('api');
    }
})();