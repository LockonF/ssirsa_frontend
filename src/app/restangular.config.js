/**
 * Created by Emmanuel on 17/07/2016.
 */
(function(){
    angular
        .module('app')
        .config(config);

    function config(RestangularProvider, EnvironmentConfig) {

        RestangularProvider.setBaseUrl(EnvironmentConfig.site.rest.api);
        //RestangularProvider.setExtraFields(['name']);


    }
})();
