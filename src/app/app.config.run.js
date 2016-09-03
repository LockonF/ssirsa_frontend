/**
 * Created by Emmanuel on 15/07/2016.
 */
(function(){
    'use strict';

    angular
        .module('app')
        .run(Run);
    function Run($rootScope, Helper, OAuth, AuthService,$window,Socket,Session,OAuthToken,$http,$state,Solicitudes_Admin,dynamicMenu){
        $rootScope.$on('$stateChangeStart',function(event,rejection){

            if(AuthService.isAuthenticated()) {
                AuthService.getUser();

            }
            if(OAuthToken.getToken()!=undefined){
                $http.defaults.headers.common['Authorization'] = 'Bearer '+OAuthToken.getToken().access_token;
            }
            if(!OAuth.isAuthenticated()){
                OAuth.getRefreshToken().then(
                    function(res){
                        $http.defaults.headers.common['Authorization'] = 'Bearer '+OAuthToken.getToken().access_token;
                    }
                ).catch(
                    function(err){
                        //Uncomment for enable user validation
                        $state.go('login')
                    }
                )
            } 
        });
        $rootScope.$on('oauth:error',function(event, rejection) {
            console.log("Error");
            if ('invalid_grant' === rejection.data.error) {
                console.log("invalid_grant");
                return;
            }

            // Refresh token when a `invalid_token` error occurs.
            if ('invalid_token' === rejection.data.error) {
                console.log("Invalidado");
                return OAuth.getRefreshToken();
            }
            return $window.location.href = '/login';
        });

        Socket.on('send:msg', function (dfs) {
            if (dfs.username !== Session.userInformation.id) {

                if (dfs.type === "normal" && Session.userRole==='Administrador') {
                    Helper.showNotification('El usuario ' + dfs.name+ " creo una nueva solicitud de "+ dfs.notification.type_notification);
                    //Helper.addNotificationGlobal(dfs.notification)
                }
            }
        });


        Solicitudes_Admin.consultaEspUnconfirmed().then(function (res) {
            $rootScope.notifications =_.sortBy(res, 'fecha_inicio').reverse();
        });



    }
})();
