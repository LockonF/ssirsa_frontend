/**
 * Created by Emmanuel on 17/07/2016.
 */
(function(){
    angular
        .module('app')
        .config(config);

    function config(RestangularProvider, SERVER) {

        RestangularProvider.setBaseUrl(SERVER.URL);
        //RestangularProvider.setExtraFields(['name']);


    }
})();