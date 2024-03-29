/**
 * Created by Sandra Ivette on 6/2/16.
 */
(function () {
    angular
        .module('app.mainApp.profile')
        .config(moduleConfig);

    function moduleConfig($stateProvider, $translatePartialLoaderProvider){
        $translatePartialLoaderProvider.addPart('app/mainApp/profile');
        $stateProvider
            .state('triangular.admin-default.profile',{
                url:'/profile',
                data: {
                    roles: ['Administrador','Capturista','Cliente','Tecnico A','Tecnico B','Tecnico C','Tecnico D','Tecnico E']
                },
                templateUrl:'app/mainApp/profile/profileUser.html',
                controller:'profileController',
                controllerAs:'vm'
            });


    }



})();
