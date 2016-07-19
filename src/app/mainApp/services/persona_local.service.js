/**
 * Created by lockonDaniel on 7/17/16.
 */
(function(){
    'use strict';

    angular
        .module('app.mainApp').factory('PersonaLocalService',PersonaLocalService);

    function PersonaLocalService(){
        var service = {
            persona:{
                nombre:'',
                apellido_paterno:'',
                apellido_materno:'',
                direccion:'',
                telefono:'',
                ife:'',
                foto:''
            },
            role:{
                name:''
            }
        };

        return service;
    }

})();