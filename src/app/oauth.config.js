/**
 * Created by Emmanuel on 15/07/2016.
 */
(function(){
    'use strict';

    angular
        .module('app')
        .config(OauthConfig)
        .config(tokenConfig);

    function OauthConfig(OAuthProvider,EnvironmentConfig){
        OAuthProvider.configure({
            baseUrl: EnvironmentConfig.site.rest.api+'oauth/',
            clientId: EnvironmentConfig.site.oauth.clientId,
            clientSecret: EnvironmentConfig.site.oauth.clientSecret,
            grantPath: 'token/',
            revokePath: 'revoke_token/'
        });
    }

    function tokenConfig(OAuthTokenProvider){
        OAuthTokenProvider.configure({name:'token',options:{secure:false}});
    }

})();
