/**
 * Created by Emmanuel on 15/07/2016.
 */
(function(){
    'use strict';

    angular
        .module('app')
        .config(OauthConfig)
        .config(tokenConfig);

    function OauthConfig(OAuthProvider,SERVER){
        OAuthProvider.configure({
            baseUrl: SERVER.URL+'oauth/',
            clientId: SERVER.clientId,
            clientSecret: SERVER.clientSecret,
            grantPath: 'token/',
            revokePath: 'revoke_token/'
        });
    }

    function tokenConfig(OAuthTokenProvider){
        OAuthTokenProvider.configure({name:'token',options:{secure:false}});
    }

})();