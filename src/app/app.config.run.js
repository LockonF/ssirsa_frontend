/**
 * Created by Emmanuel on 15/07/2016.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .run(Run);
    function Run($rootScope, Channel, amMoment, Session, AUTH_EVENTS, NotificationPanel, Helper, EVENTS_GENERAL, OAuth, AuthService, authorization, _, $window, Solicitudes_Admin) {
        amMoment.changeLocale('es');
        $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
            if (toState.name != 'login') {
                if (AuthService.isAuthenticated()) {
                    AuthService.getUser();
                }
                $rootScope.toState = toState;
                $rootScope.toStateParams = toStateParams;

            } else {
                if (AuthService.isAuthenticated()) {
                    AuthService.revokeToken();
                }
            }
        });
        $rootScope.$on('oauth:error', function (event, rejection) {
            if ('invalid_grant' === rejection.data.error) {
                return;
            }

            // Refresh token when a `invalid_token` error occurs.
            if ('invalid_token' === rejection.data.error) {
                return OAuth.getRefreshToken();
            }
            return $window.location.href = '/login';
        });
        $rootScope.$on(AUTH_EVENTS.sessionRestore, function (event) {

            //authorization.authorize();
            Helper.getNotificationsByUser();

        });
        $rootScope.$on(EVENTS_GENERAL.bind_channels, function () {
            var canal = Channel.all();
            canal[0].bind('create', function (dfs) {
                if (dfs.id !== Session.userInformation.id) {
                    if (Session.userRole === 'Administrador') {
                        Helper.showNotification('El usuario ' + dfs.usuario + " creo una solicitud ", "Nueva solicitud de " + dfs.solicitud + " !!!", null);
                        Helper.getNotificationsByUser();

                    }
                }
            });
            canal[1].bind('success_create', function (dfs) {
                Helper.showNotification('El reporte ' + dfs.name + " creo exitosamente ", "Reporte terminado!!!", dfs.link);
                Helper.getNotificationsByUser();
            });
        });


    }
})();
