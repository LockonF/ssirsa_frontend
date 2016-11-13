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
        vm.filterTypeDate = OPTIONS.filterDate;
        vm.filterTypeChar = OPTIONS.filterChar;
        vm.filterInt=OPTIONS.filterInt;
        vm.days = OPTIONS.days;

        //Function parse
        vm.removeField = removeField;
        vm.removeFilter = removeFilter;
        vm.showEditionFields=showEditionFields;
        vm.getValidFilters=getValidFilters;
        vm.update=update;

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
            console.log(vm.report);
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
                locals: {
                    reporte: vm.report
                }
            }).then(function (res) {
                console.log(res);
                Array.prototype.push.apply(vm.report.displayfield_set, res.fields);
                Array.prototype.push.apply(vm.report.filterfield_set, res.filters);
                console.log(vm.report);
            }).catch(function (err) {
                if (err != null) {
                    //Marcar error
                }
            });
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

        function update(){
            Reportes.saveReport(vm.report).then(function(res){
                toastr.success("","");
            }).catch(function(err){
                console.log(err);
            });
        }
    }
})();
