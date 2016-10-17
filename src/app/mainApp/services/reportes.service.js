/**
 * Created by Emmanuel on 16/10/2016.
 */
(function(){
    'use_strict';

    angular
        .module('app.mainApp.reportes')
        .factory('Reportes',Reportes);

    function Reportes(Restangular){
        var path= Restangular.all('report_builder').all('api');
        return {
            getReports:getReports,
            getReport:getReport,
            getModels:getModels,
            getRelatedModels:getRelatedModels,
            getFields:getFields
        };

        //Obtiene todos los reportes existentes con su información básica
        function getReports(){
            return path.all("reports").getList().$object;
        }
        //Obtiene la información básica de un reporte en específico
        function getReport(id){
            return path.one("reports",id).customGET();
        }
        //Obtiene todos los modelos base sobre los cuales se pueden hacer reportes, filtros, obtener campos, etc.
        function getModels(){
            return path.all("contenttypes").getList();
        }
        //Obtiene los modelos relacionados con un modelo dado un ID de modelo
        function getRelatedModels(id){
            var request= {
                "model": id,
                "path": "",
                "path_verbose": "",
                "field": ""
            };
            return path.one("related_fields").post(request);
        }
        //Obtiene los campos de un modelo dado su ID
        function getFields(id){
            var request = {
                "model": id,
                "path": "",
                "path_verbose": "",
                "field": ""
            };
            return path.one("fields").post(request);
        }
    }
})();