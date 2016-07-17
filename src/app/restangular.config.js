/**
 * Created by Emmanuel on 17/07/2016.
 */
(function(){
    angular
        .module('app')
        .config('config');

    function config(RestangularProvider, OAuthToken) {

        RestangularProvider.setBaseUrl(SERVER.URL);
        //RestangularProvider.setExtraFields(['name']);
        RestangularProvider.setResponseExtractor(function(response, operation) {
            return response.data;
        });

        RestangularProvider.addFullRequestInterceptor(function(element, operation, route, url, headers, params, httpConfig) {
            var token = OAuthToken.getToken();
            delete element.name;
            headers.authorization='Bearer ' +token.acces_token;
            return {
                element: element,
                params: _.extend(params, {single: true}),
                headers: headers,
                httpConfig: httpConfig
            };
        });

    }
})();