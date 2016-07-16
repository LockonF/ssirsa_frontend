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
            clientId: 'rBLSap7rJORjfTh80GI4vBgcxSefUHHrKtVXWEaD',
            clientSecret: 'CofY368VLw4iFkUtTuU5Rcle93NGCx93ec3FFajYdsb3dBPqZrGFsBqMaDqadD8f2oljocjP62LQaJkrZc8XKhcjuaxpUuMTGhJjKH6IfIATdkPBybsi1FxyKsBicYPX',
            grantPath: 'token/',
            revokePath: 'revoke_token/'
        });
    }

    function tokenConfig(OAuthTokenProvider){
        OAuthTokenProvider.configure({name:'token',options:{secure:false}});
    }

})();