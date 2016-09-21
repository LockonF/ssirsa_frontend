/**
 * Created by Luis_Olvera on 19/07/2016.
 */
(function(){
    'use_strict';//

    angular.module('app.mainApp').factory('_',_);
    function _($window){
        return $window._;
    }
})();
