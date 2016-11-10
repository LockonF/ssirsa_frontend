/**
 * Created by amezc on 04/11/2016.
 */
(function () {
    'use_strict';

    angular
        .module('app.mainApp.reportes')
        .controller('ModelsReportModalController', ModelsReportModalController);

    function ModelsReportModalController(Translate,Reportes,EVENTS_GENERAL, $rootScope,reporte, $mdDialog) {
        var vm = this;
        //Function parsing
        vm.cancel = cancel;
        vm.thema = "blue-grey";
        vm.selectionField=selectionField;
        vm.selectionFilter=selectionFilter;
        vm.create=create;
        vm.selectedFields = [];
        vm.selectedFilters = [];
        vm.tableDisplayHeaders=[
            Translate.translate('REPORTS.MODIFY.FIELD_NAME'),
            Translate.translate('REPORTS.MODIFY.FIELD_VERBOSE'),
            Translate.translate('REPORTS.MODIFY.FIELD_TYPE'),
            Translate.translate('REPORTS.MODIFY.FIELD_FIELDS'),
            Translate.translate('REPORTS.MODIFY.FIELD_FILTER')
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
        function create() {
            var respuesta={
                filters:vm.selectedFilters,
                fields:vm.selectedFields
            };
            $mdDialog.hide(respuesta);
        }
        $rootScope.$on(EVENTS_GENERAL.load_fields, function(event,fields) {
           vm.campos=fields.fields;

        });
        function cancel() {
            $mdDialog.cancel(null);
        }
        function selectionField(field) {
            var index = _.findIndex(vm.selectedFields, function (obj) {
                return obj.name === field.name;
            });
            if (index > -1) {//no lo encontr
                vm.selectedFields.splice(index, 1);
            } else {
                vm.selectedFields.push(field);
            }
        }
        function selectionFilter(field) {
            var index = _.findIndex(vm.selectedFilters, function (obj) {
                return obj.name === field.name;
            });
            if (index > -1) {//no lo encontr
                vm.selectedFilters.splice(index, 1);
            } else {
                vm.selectedFilters.push(field);
            }
        }

    }

})();
