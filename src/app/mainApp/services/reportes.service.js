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
            getPartialReports:getPartialReports,
            getPartialReport:getPartialReport,
            getReports:getReports,
            getReport:getReport,
            getModels:getModels,
            getRelatedModels:getRelatedModels,
            getFields:getFields,
            saveReport:saveReport,
            createReport:createReport,
            generatePreview:generatePreview
        };

        //Obtiene todos los reportes existentes con su información básica (util para listado en CRUD)
        function getPartialReports(){
            return path.all("reports").getList().$object;
        }
        //Obtiene la información básica de un reporte en específico
        function getPartialReport(id){
            return path.one("reports",id).customGET();
        }
        //Obtiene todos los reportes existentes con su información completa
        function getReports(){
            return path.all("report").all("").getList().$object;
        }
        //Obtiene la información completa de un reporte en específico (útil para ver, modificar y guardar un reporte)
        function getReport(id){
            return path.one("report",id).customGET();
        }
        //Obtiene todos los modelos base sobre los cuales se pueden hacer reportes, se usa solo al crearlo
        function getModels(){
            return path.all("contenttypes").all("").getList().$object;
        }
        //Obtiene solamnte los modelos relacionados (campos que son llave primaria de otro modelo)
        // con un modelo, dado un ID de modelo, y como opcion una ruta (path) y un nombre de campo (field)
        // para mapear la ruta necesaria al crear el fieldset o filterset del reporte
        function getRelatedModels(id,requestPath,field){
            if(requestPath!==undefined) {
                if(field!==undefined) {
                    var request = {
                        "model": id,
                        "path": requestPath,
                        "path_verbose": "",
                        "field": field
                    };
                }
                else{
                    var request = {
                        "model": id,
                        "path": requestPath,
                        "path_verbose": "",
                        "field": ""
                    };
                }
            }
            else{
                var request = {
                    "model": id,
                    "path": "",
                    "path_verbose": "",
                    "field": ""
                };
            }
            return path.one("related_fields").post(request);
        }
        //Obtiene todos los campos de un modelo, dado un ID de modelo, y como opcion una ruta (path)
        // y un nombre de campo (field) para mapear la ruta necesaria al crear el fieldset
        // o filterset del reporte
        function getFields(id,requestPath,field){
            if(requestPath!==undefined) {
                if(field!==undefined) {
                    var request = {
                        "model": id,
                        "path": requestPath,
                        "path_verbose": "",
                        "field": field
                    };
                }
                else{
                    var request = {
                        "model": id,
                        "path": requestPath,
                        "path_verbose": "",
                        "field": ""
                    };
                }
            }
            else{
                var request = {
                    "model": id,
                    "path": "",
                    "path_verbose": "",
                    "field": ""
                };
            }
            return path.one("fields").post(request);
        }
        //Guardar un reporte (Incluso aunque sea nuevo, primero se crea vacio, luego se modifica
        // con los campos que se requiere)
        //Utilizar como entrada un reporte obtenido mediante fullReport
        function saveReport(report){
            return path.all(report.id).customPUT(report);
        }
        //Permite crear un reporte nuevo con su nombre, descripción y modelo base
        function createReport(data){
            return path.all("report").all("").post(data);
        }
        //Permite crear una previsualización en JSON del reporte con el ID dado
        function generatePreview(id){
            return path.one("report",id).all("generate").customGET();
        }
    }
})();