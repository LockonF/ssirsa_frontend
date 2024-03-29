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
        var pathReport= Restangular.all('report_builder').all('report');
        return {
            getPartialReports:getPartialReports,
            getPartialReport:getPartialReport,
            getReports:getReports,
            getReport:getReport,
            getModels:getModels,
            getModel:getModel,
            getRelatedModels:getRelatedModels,
            getFields:getFields,
            saveReport:saveReport,
            createReport:createReport,
            generatePreview:generatePreview,
            deleteReport:deleteReport,
            cloneReport:cloneReport,
            updateReport:updateReport,
            requestReport:requestReport,
            getReportsGenerated:getReportsGenerated,
            getReportObject:getReportObject,
            generatePreviewPaginator:generatePreviewPaginator
        };
        //Clona un reporte pasando el id del reporte y el nombre
        function cloneReport(request) {
            return pathReport.all("clone_report").all("").post(request)
        }
        //Obtiene todos los reportes existentes con su información básica (util para listado en CRUD)
        function getPartialReports(){
            return path.all("reports").all("").getList();
        }
        //Obtiene la información básica de un reporte en específico
        function getPartialReport(id){
            return path.one("reports",id).all("").customGET().$object;
        }
        //Obtiene todos los reportes existentes con su información completa
        function getReports(){
            return path.all("report").all("").getList().$object;
        }
        //Obtiene la información completa de un reporte en específico (útil para ver, modificar y guardar un reporte)
        function getReport(id){
            return path.one("report",id).all("").customGET().$object;
        }
        //Obtiene todos los modelos base sobre los cuales se pueden hacer reportes, se usa solo al crearlo
        function getModels(){
            return path.all("contenttypes").all("").getList().$object;
        }
        //Obtiene todos los modelos base sobre los cuales se pueden hacer reportes, se usa solo al crearlo
        function getModel(id){
            return path.one("contenttypes",id).all("").customGET();
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
            return path.all("related_fields").all("").post(request);
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
            return path.one("fields").all("").post(request);
        }
        //Guardar un reporte (Incluso aunque sea nuevo, primero se crea vacio, luego se modifica
        // con los campos que se requiere)
        //Utilizar como entrada un reporte obtenido mediante fullReport
        function saveReport(report){
            return path.all(report.id).all("").customPUT(report);
        }
        //Permite crear un reporte nuevo con su nombre, descripción y modelo base
        function createReport(data){
            return path.all("report").all("").post(data);
        }
        //Permite crear una previsualización en JSON del reporte con el ID dado con paginador
        function generatePreviewPaginator(id,pagina){
            return path.one("report",id).all("preview").all(pagina).all("").customGET();
        }
        //Permite crear una previsualización en JSON del reporte con el ID dado
        function generatePreview(id){
            return path.one("report",id).all("generate").all("").customGET();
        }
        //Permite borrar un reporte dado un id
        function deleteReport(object) {
            return path.one("report",object.id).all("").customDELETE("",null,{'content-type':'application/json'});
        }

        function updateReport(object) {
            return path.one("report",object.id).all("").customPUT(object);
        }
        function requestReport(id,format) {
            return path.one("report",id).one("download_file",format).all("").customGET();
        }
        function getReportsGenerated() {
            return Restangular.all("report_builder").all("reports").all("download").all("").getList();
        }
        //Obtiene la información completa de un reporte en específico usando un promise
        function getReportObject(id){
            return path.one("report",id).all("").customGET();
        }
    }
})();
