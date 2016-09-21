(function () {
    'use strict';
    angular
        .module('app.mainApp')
        .factory('AuthService', AuthService);
    /* @ngInject */
    function AuthService(Session, $q, Restangular, OAuth,$rootScope,AUTH_EVENTS,Socket) {
        var authService = {
            isAuthenticated: isAuthenticated,
            login: login,
            isAuthorized: isAuthorized,
            logout: logout,
            getUser:getUser,
            isIdentityResolved:isIdentityResolved
        };

        var error_messages = {
            unknown: '¡Ups! Parece que algo no está funcionando correctamente.'
        };
        function getPersona() {
            return Restangular.all('persona').customGET().then(function (res) {
                return res;
            }).catch(function (err) {
            });
        }
         function isIdentityResolved() {
            return angular.isDefined(Session.userInformation);
        }
        function getRole() {
            return Restangular.all('my_groups').customGET().then(function (res) {
                return res;
            }).catch(function (err) {
            });
        }
        function login(credentials) {
            var deferred = $q.defer();

            OAuth.getAccessToken(credentials).then(function (res) {
                deferred.resolve();
            }).catch(function (response) {
                if (response.status == 401) {
                    return deferred.reject(response.data);
                }
                return deferred.reject({
                   error:response.data
                });
            });
            return deferred.promise;
        }

        function isAuthenticated() {
            return OAuth.isAuthenticated();
        }

        function isAuthorized(authorizedRoles) {
            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }
            return (authService.isAuthenticated() &&
            authorizedRoles.indexOf(Session.userRole) !== -1);
        }

        function logout() {
            var deferred = $q.defer();
            OAuth.revokeToken().then(function (res) {
                Session.destroy();
                $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
                deferred.resolve();

            }).catch(function (response) {

            });

            return deferred.promise;
        }
        function getUser() {
            var user={};
            var deferred = $q.defer();
            getPersona().then(function (res) {
                user.userInformation=res;
                getRole().then(function (res) {
                    Session.create(user.userInformation,res[0].name);
                    Socket.emit('join', {canal: 'Administrador', username: Session.userInformation.id});
                    $rootScope.$broadcast(AUTH_EVENTS.sessionRestore);
                    deferred.resolve(res[0].name);
                });
            });
            return deferred.promise;
        }



        return authService;
    }
})();
