/**
 * Created by Sandra Ivette on 6/2/16.
 */
(function () {
    angular
        .module('app.mainApp.reportes')
        .config(moduleConfig);

    function moduleConfig($stateProvider, $translatePartialLoaderProvider){
        $translatePartialLoaderProvider.addPart('app/mainApp/reportes');
        $stateProvider
            .state('triangular.admin-default.report-new',{
                url:'/new',
                data: {
                    roles: ['Administrador']
                },
                templateUrl:'app/mainApp/reportes/edicion/reportEdicion.tmpl.html',
                controller:'ReportEdicionController',
                controllerAs:'vm'
            });


    }



})();
