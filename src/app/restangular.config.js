/**
 * Created by Emmanuel on 17/07/2016.
 */
(function(){
    angular
        .module('app')
        .config(config);

    function config(RestangularProvider, EnvironmentConfig,$httpProvider) {

        RestangularProvider.setBaseUrl(EnvironmentConfig.site.rest.api);
        $httpProvider.interceptors.push('AuthInterceptor');
        //RestangularProvider.setDefaultHeaders({'Content-Type': "Application/JSON"});
        //RestangularProvider.setExtraFields(['name']);


    }
})();
