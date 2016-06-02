/**
 * Created by lockonDaniel on 6/2/16.
 */
(function () {
    angular
        .module('app.mainApp.solicitudes')
        .config(moduleConfig);

    function moduleConfig($stateProvider, triMenuProvider){
        $stateProvider
            .state('triangular.admin-default.solicitudes',{
                url:'/solicitudes',
                templateUrl:'app/mainApp/solicitudes/solicitud.tmpl.html',
                controller:'solicitudesController',
                controllerAs:'vm'

        })

    }

})();