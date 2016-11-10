/**
 * Created by Emmanuel on 31/10/2016.
 */
(function () {
    'use_strict';

    angular
        .module('app.mainApp.reportes')
        .controller('reportEditionController', reportEditionController);

    function reportEditionController (Reportes, $mdDialog,Translate, $stateParams, OPTIONS){

        //Variables
        var vm = this;
        vm.formato = "DD-MM-YYYY";
        vm.filterType = OPTIONS.filter;
        vm.days = OPTIONS.days;
        vm.showEditionFields=showEditionFields;

        //Function parse
        vm.removeField = removeField;
        vm.removeFilter = removeFilter;

        activate();

        //Translates
        vm.tableDisplayHeaders = [
            Translate.translate('REPORTS.MODIFY.FIELD_NAME'),
            Translate.translate('REPORTS.MODIFY.FIELD_VERBOSE'),
            Translate.translate('REPORTS.MODIFY.FIELD_TYPE'),
            Translate.translate('REPORTS.MODIFY.DELETE')
        ];

        vm.tableFilterHeaders = [
            Translate.translate('REPORTS.MODIFY.FIELD_NAME'),
            Translate.translate('REPORTS.MODIFY.FIELD_VERBOSE'),
            Translate.translate('REPORTS.MODIFY.FIELD_TYPE'),
            Translate.translate('REPORTS.MODIFY.VALUE'),
            Translate.translate('REPORTS.MODIFY.DELETE')
        ];

        function activate() {
            vm.report = Reportes.getReport($stateParams.id);
        }

        function removeField(id) {
            vm.report.displayfield_set.splice(id, 1);
            vm.report.displayfield_set = reorganizeFieldIndexes(vm.report.displayfield_set);
        }

        function removeFilter(id) {
            vm.report.filterfield_set.splice(id, 1);
            vm.report.filterfield_set = reorganizeFieldIndexes(vm.report.filterfield_set);
        }

        function reorganizeFieldIndexes(fields) {
            for (i = 0; i < fields.length; i++) {
                fields[i].position = i;
            }
            return fields;
        }
        function showEditionFields() {
            $mdDialog.show({
                controller: 'ModelsReportModalController',
                controllerAs: 'vm',
                templateUrl: 'app/mainApp/reportes/edicion/modal/models/models.modal.tmpl.html',
                fullscreen: true,
                clickOutsideToClose: true,
                focusOnOpen: true,
                locals: {
                    reporte: vm.report
                }
            }).then(function () {
            }).catch(function (err) {
                if (err != null) {
                    //Marcar error
                }
            });
        }
    }
})();
