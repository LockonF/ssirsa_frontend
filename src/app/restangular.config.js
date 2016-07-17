/**
 * Created by Emmanuel on 17/07/2016.
 */
(function(){
    angular
        .module('app')
        .config(config);

    function config(RestangularProvider, SERVER) {

        var OAuthToken;
        angular.injector(['angular-oauth2']).invoke(['OAuthToken', function(_OAuthToken_) {
            OAuthToken = _OAuthToken_;
        }]);

        var token = OAuthToken.getToken();


        RestangularProvider.setBaseUrl(SERVER.URL);
        //RestangularProvider.setExtraFields(['name']);
        RestangularProvider.setResponseExtractor(function(response, operation) {
            return response.data;
        });

        RestangularProvider.setDefaultHeaders({Authorization: "Bearer "+token.access_token});



    }
})();