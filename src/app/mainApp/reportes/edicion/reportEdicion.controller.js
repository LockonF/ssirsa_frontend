/**
 * Created by Emmanuel on 31/10/2016.
 */
(function () {
    'use_strict';

    angular
        .module('app.mainApp.reportes')
        .controller('reportEditionController', reportEditionController);

    function reportEditionController(Reportes, toastr,$state, $mdDialog, Translate, $stateParams, OPTIONS) {

        //Variables
        var vm = this;
        vm.formato = "DD-MM-YYYY";
        vm.filterType = OPTIONS.filter;
        vm.filterTypeDate = OPTIONS.filterDate;
        vm.filterTypeChar = OPTIONS.filterChar;
        vm.filterInt = OPTIONS.filterInt;
        vm.days = OPTIONS.days;
        vm.fieldQueries=OPTIONS.field_types;
        vm.rootModel="";

        //Function parse
        vm.removeField = removeField;
        vm.removeFilter = removeFilter;
        vm.showEditionFields = showEditionFields;
        vm.getValidFilters = getValidFilters;
        vm.update = update;
        vm.back = back;

        activate();

        //Translates
        vm.tableDisplayHeaders = [
            Translate.translate('REPORTS.MODIFY.TABLE'),
            Translate.translate('REPORTS.MODIFY.FIELD_NAME'),
            Translate.translate('REPORTS.MODIFY.FIELD_VERBOSE'),
            Translate.translate('REPORTS.MODIFY.FIELD_TYPE'),
            Translate.translate('REPORTS.MODIFY.FIELD_QUERY'),
            Translate.translate('REPORTS.MODIFY.DELETE')
        ];

        vm.tableFilterHeaders = [
            Translate.translate('REPORTS.MODIFY.TABLE'),
            Translate.translate('REPORTS.MODIFY.FIELD_NAME'),
            Translate.translate('REPORTS.MODIFY.FIELD_VERBOSE'),
            Translate.translate('REPORTS.MODIFY.FIELD_TYPE'),
            Translate.translate('REPORTS.TABLE_FILTER.FILTER_TYPE'),
            Translate.translate('REPORTS.MODIFY.VALUE'),
            Translate.translate('REPORTS.MODIFY.DELETE')
        ];

        function activate() {
            vm.reportPromise = Reportes.getReportObject($stateParams.id).then(function(res){
                vm.report=res;
                if(res.displayfield_set!=null)
                    vm.report.displayfield_set=reorganizeFieldIndexes(res.displayfield_set);
                if(res.filterfield_set!=null)
                    vm.report.filterfield_set=reorganizeFieldIndexes(res.filterfield_set);
                Reportes.getModel(res.root_model).then(function(res){
                    vm.rootModel = res.name;
                }).catch();
            }).catch(function(){

            });
            vm.successTitle = Translate.translate('MAIN.MSG.SUCCESS_TITLE');
            vm.errorTitle = Translate.translate('MAIN.MSG.ERROR_TITLE');
            vm.errorMessage = Translate.translate('MAIN.MSG.ERROR_MESSAGE');
            vm.successUpdate = Translate.translate('REPORTS.MESSAGES.REPORT_UPDATE_SUCCESS');
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

        function showEditionFields(ev) {
            $mdDialog.show({
                controller: 'ModelsReportModalController',
                controllerAs: 'vm',
                templateUrl: 'app/mainApp/reportes/edicion/modal/models.modal.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                fullscreen: true,
                clickOutsideToClose: true,
                locals: {
                    reporte: vm.report
                }
            }).then(function (res) {
                Array.prototype.push.apply(vm.report.displayfield_set, res.fields);
                vm.report.displayfield_set = reorganizeFieldIndexes(vm.report.displayfield_set);
                Array.prototype.push.apply(vm.report.filterfield_set, res.filters);
                vm.report.filterfield_set = reorganizeFieldIndexes(vm.report.filterfield_set);
            }).catch(function (err) {
                if (err != null) {
                    toastr.warning(vm.errorMessage, vm.errorTitle);
                }
            });
        }

        function back() {
            $state.go('triangular.admin-default.reportes',{id:vm.report.id});
        }

        function getValidFilters(fieldType) {
            switch (fieldType) {
                case 'CharField':
                    return vm.filterTypeChar;
                    break;
                case 'DateTimeField':
                    return vm.filterTypeDate;
                    break;
                case 'DecimalField':
                    return vm.filterInt;
                case 'IntegerField':
                    return vm.filterInt;
                default:
                    return vm.filterType;
                    break;
            }
        }

        function update() {
            Reportes.updateReport(vm.report).then(function () {
                toastr.success(vm.successUpdate, vm.successTitle);
                back();
            }).catch(function (err) {
                toastr.warning(vm.errorMessage, vm.errorTitle);
            });
        }
    }
})();
