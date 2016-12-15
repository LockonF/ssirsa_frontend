(function () {
    'use strict';
    angular
        .module('app.mainApp')
        .factory('authorization', authorization);
    /* @ngInject */
    function authorization($rootScope, $state, AuthService, toastr, Translate) {

        return {
            authorize: authorize
        };
        function authorize() {
            AuthService.getUser().then(function (resp) {
                var isAuthenticated = AuthService.isAuthenticated();
                var res = AuthService.isAuthorized($rootScope.toState.data.roles);
                if ($rootScope.toState.data.roles
                    && $rootScope.toState.data.roles.length > 0
                    && !AuthService.isAuthorized($rootScope.toState.data.roles)) {
                    if (isAuthenticated) {
                        // user is signed in but not
                        // authorized for desired state
                        var errorTitle = Translate.translate('MAIN.MSG.ERROR_TITLE');
                        var errorAuthorization = Translate.translate('MAIN.MSG.ERROR_ERROR_AUTHORIZATION');
                        toastr.error(errorAuthorization, errorTitle);
                        $state.go('login');
                    } else {
                        $state.go('login');
                    }
                }
            });
        }
    }
})();
