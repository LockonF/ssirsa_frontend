/**
 * Created by Emmanuel on 15/07/2016.
 */
(function(){
    'use strict';

    angular
        .module('app')
        .run(Run);
    function Run($rootScope, Helper,$pusher,EnvironmentConfig, OAuth, AuthService,authorization, _,$window,Socket,Session,OAuthToken,$http,$state,Solicitudes_Admin){
        $rootScope.$on('$stateChangeStart',function(event, toState, toStateParams){

            if(AuthService.isAuthenticated()) {
                    AuthService.getUser();

            }

            $rootScope.toState = toState;
            $rootScope.toStateParams = toStateParams;
            if (AuthService.isIdentityResolved()) {
                authorization.authorize();
                Solicitudes_Admin.consultaEspUnconfirmed().then(function (res) {
                    $rootScope.notifications =_.sortBy(res, 'fecha_inicio').reverse();
                });
            }
        });
        $rootScope.$on('oauth:error',function(event, rejection) {
            if ('invalid_grant' === rejection.data.error) {
                return;
            }

            // Refresh token when a `invalid_token` error occurs.
            if ('invalid_token' === rejection.data.error) {
                return OAuth.getRefreshToken();
            }
            return $window.location.href = '/login';
        });

        /*Socket.on('send:msg', function (dfs) {
            if (dfs.username !== Session.userInformation.id) {

                if (dfs.type === "normal" && Session.userRole==='Administrador') {
                    Helper.showNotification('El usuario ' + dfs.name+ " creo una solicitud ","Nueva solicitud de "+ dfs.notification.type_notification+" !!!");
                    //Helper.addNotificationGlobal(dfs.notification)
                }
            }
        });*/

        var client =  new Pusher(EnvironmentConfig.site.pusher.key, {
            encrypted: true
        });
        var pusher = $pusher(client);
        pusher.logToConsole = true;

        var channel_reports = pusher.subscribe('reports');
        var channel = pusher.subscribe('solicitudes');
        channel.bind('create', function(dfs) {
            if (dfs.usuario !== Session.userInformation.id) {
                if (Session.userRole === 'Administrador') {
                    Helper.showNotification('El usuario ' + dfs.usuario + " creo una solicitud ", "Nueva solicitud de " + dfs.solicitud + " !!!");

                }
            }
        });

        channel_reports.bind('success_create', function(dfs) {
            console.log(dfs);
        });






    }
})();
