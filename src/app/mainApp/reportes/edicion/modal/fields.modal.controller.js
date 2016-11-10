/**
 * Created by amezc on 04/11/2016.
 */
(function () {
    'use_strict';

    angular
        .module('app.mainApp.reportes')
        .controller('FieldsReportModalController', FieldsReportModalController);

    function FieldsReportModalController(Reportes, reporte, $mdDialog) {
        var vm = this;
        //Function parsing
        vm.cancel = cancel;
        vm.thema = "blue-grey";
        vm.capturistaMenu = [
            {
                "verbose_name": "linea transporte",
                "parent_model_name": "linea_transporte",
                "help_text": "",
                "parent_model_app_label": false,
                "path": "",
                "model_id": 29,
                "field_name": "linea_transporte",
                "included_model": true
            },
            {
                "verbose_name": "cabinetentradasalida_set",
                "parent_model_name": "cabinetentradasalida",
                "help_text": "",
                "parent_model_app_label": false,
                "path": "",
                "model_id": 29,
                "field_name": "cabinetentradasalida",
                "included_model": true
            },
            {
                "verbose_name": "tipo transporte",
                "parent_model_name": "tipo_transporte",
                "help_text": "",
                "parent_model_app_label": false,
                "path": "",
                "model_id": 29,
                "field_name": "tipo_transporte",
                "included_model": true
            },
            {
                "verbose_name": "proyecto",
                "parent_model_name": "proyecto",
                "help_text": "",
                "parent_model_app_label": false,
                "path": "",
                "model_id": 29,
                "field_name": "proyecto",
                "included_model": true
            },
            {
                "verbose_name": "cabinets",
                "parent_model_name": "cabinets",
                "help_text": "",
                "parent_model_app_label": false,
                "path": "",
                "model_id": 29,
                "field_name": "cabinets",
                "included_model": true
            },
            {
                "verbose_name": "sucursal",
                "parent_model_name": "sucursal",
                "help_text": "",
                "parent_model_app_label": false,
                "path": "",
                "model_id": 29,
                "field_name": "sucursal",
                "included_model": true
            },
            {
                "verbose_name": "udn",
                "parent_model_name": "udn",
                "help_text": "",
                "parent_model_app_label": false,
                "path": "",
                "model_id": 29,
                "field_name": "udn",
                "included_model": true
            }
        ];


        activate();

        function activate() {
            var root_related_field = {
                verbose_name: reporte.root_model_name,
                field_name: '',
                path: '',
                model_id: reporte.root_model,
                related_fields:[]
            };


            Reportes.getRelatedModels(reporte.root_model).then(function (result) {

                root_related_field.related_fields = result;
                vm.related_models=[root_related_field];
            });

        }


        function cancel() {
            $mdDialog.cancel(null);
        }

    }

})();
