/**
 * Created by lockonDaniel on 6/2/16.
 */
(function () {
    angular
        .module('app.mainApp.profile')
        .config(moduleConfig);

    function moduleConfig($stateProvider, $translatePartialLoaderProvider){
        $translatePartialLoaderProvider.addPart('app/mainApp/Profile');
        $stateProvider
            .state('triangular.admin-default.profile',{
                url:'/profile',
                templateUrl:'app/mainApp/profile/profileUser.html',
                controller:'profileUserController',
                controllerAs:'vm'
            });


    }



})();