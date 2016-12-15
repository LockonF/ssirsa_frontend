/**
 * Created by franciscojaviercerdamartinez on 02/06/16.
 */
(function () {
    angular
        .module('app')
        .controller('homeController',homeController);

    function homeController(Session,$rootScope,AUTH_EVENTS){
        var vmNode=this;
        vmNode.currentUser = {};

        vmNode.setCurrentUser = setCurrentUser;
        function setCurrentUser() {
            vmNode.currentUser.userInformation = Session.userInformation;
            vmNode.currentUser.userName = Session.userName;
            vmNode.currentUser.userRole = Session.userRole;
        }
        $rootScope.$on(AUTH_EVENTS.logoutSuccess, function(event) {
            vmNode.currentUser={};
        });
        $rootScope.$on(AUTH_EVENTS.sessionRestore, function(event) {
            vmNode.setCurrentUser();

        });
    }

})();
