/**
 * Created by Emmanuel on 16/10/2016.
 */
(function () {
    'use_strict';

    angular
        .module('app.mainApp.reportes')
        .controller('ReportesCrudController', ReportsCrudController)
        .filter('reportSearch', reportSearch);
    function ReportsCrudController(toastr, OPTIONS, $mdDialog, Reportes, Translate, $state) {
        //Variable declaration
        var vm = this;
        vm.isOpen = false;
        vm.hidden = false;
        vm.report = null;
        vm.formato = "DD-MM-YYYY";
        vm.filterType = OPTIONS.filter;
        vm.days = OPTIONS.days;

        //Function parse
        vm.selected = selected;
        vm.lookup = lookup;
        vm.querySearch = querySearch;
        vm.selectedItemChange = selectedItemChange;
        vm.createReport = createReport;
        vm.duplicateReport = duplicateReport;
        vm.remove = remove;
        vm.update = update;
        vm.onTabPreview = onTabPreview;
        vm.editReport = editReport;
        vm.clear = clear;
        vm.exportar=exportar;
        vm.test=test;

        //Translates
        vm.successTitle = Translate.translate('MAIN.MSG.SUCCESS_TITLE');
        vm.errorTitle = Translate.translate('MAIN.MSG.ERROR_TITLE');
        vm.successCreate = Translate.translate('REPORTS.MESSAGES.REPORT_CREATE_SUCCESS');
        vm.successUpdate = Translate.translate('REPORTS.MESSAGES.REPORT_UPDATE_SUCCESS');
        vm.errorCreate = Translate.translate('REPORTS.MESSAGES.REPORT_CREATE_ERROR');
        vm.successDelete = Translate.translate('REPORTS.MESSAGES.REPORT_DELETE_SUCCESS');
        vm.errorDelete = Translate.translate('REPORTS.MESSAGES.REPORT_DELETE_ERROR');
        vm.successClone = Translate.translate('REPORTS.MESSAGES.REPORT_CLONE_SUCCESS');
        vm.errorClone = Translate.translate('REPORTS.MESSAGES.REPORT_CLONE_ERROR');
        vm.errorPreview = Translate.translate('REPORTS.MESSAGES.REPORT_PREVIEW_ERROR');
        vm.errorExport = Translate.translate('REPORTS.MESSAGES.REPORT_EXPORT_ERROR');

        vm.successTitleExport = Translate.translate('REPORTS.MESSAGES.REPORT_EXPORT_TITLE_SUCCESS');
        vm.successExport = Translate.translate('REPORTS.MESSAGES.REPORT_EXPORT_MSG_SUCCESS');

        vm.dialogTitle = Translate.translate('MAIN.DIALOG.DELETE_TITLE');
        vm.dialogMessage = Translate.translate('MAIN.DIALOG.DELETE_MESSAGE');
        vm.deleteButton = Translate.translate('MAIN.BUTTONS.DELETE');
        vm.cancelButton = Translate.translate('MAIN.BUTTONS.CANCEL');

        activate();
        function activate() {
            Reportes.getPartialReports().then(function (res) {
                vm.reports = res;
                vm.reports = _.sortBy(vm.reports, 'name');
            })

        }

        function querySearch(query) {
            return query ? lookup(query) : vm.reports;

        }
        function test() {
            $mdDialog.show({
                controller: 'FieldsReportModalController',
                controllerAs: 'vm',
                templateUrl: 'app/mainApp/reportes/edicion/modal/fields.modal.tmpl.html',
                fullscreen: true,
                clickOutsideToClose: true,
                focusOnOpen: true
            }) ;
        }

        function onTabPreview() {
            Reportes.generatePreview(vm.report.id).then(function (res) {
                vm.preview = res;

            }).catch(function () {
                toastr.warning(vm.errorPreview, vm.errorTitle);
            });
        }

        function selectedItemChange(item) {
            if (item != null) {
                vm.report = Reportes.getReport(item.id);
            } else {
                //cancel();
            }
        }
        function exportar() {
            $mdDialog.show({
                controller: 'GenerateReportModalController',
                controllerAs: 'vm',
                templateUrl: 'app/mainApp/reportes/manager/modal/generate/generateReport.modal.tmpl.html',
                fullscreen: true,
                clickOutsideToClose: true,
                focusOnOpen: true,
                locals: {
                    reporte: vm.report
                }
            }).then(function () {
                toastr.success(vm.successExport, vm.successTitleExport);
            }).catch(function (err) {
                if (err != null) {
                    toastr.error(vm.errorExport, vm.errorTitle);
                }
            });
        }

        function clear() {
            vm.report=null;
            vm.selectedReport =null;
        }

        function update() {
            Reportes.updateReport(vm.report).then(function (res) {
                toastr.success(vm.successUpdate, vm.successTitle);
                activate();
            }).catch(function (res) {
                toastr.warning(vm.errorMessage, vm.errorTitle);
            });
        }

        function lookup(search_text) {
            vm.search_items = _.filter(vm.reports, function (item) {
                return item.name.toLowerCase().indexOf(search_text.toLowerCase()) >= 0;
            });
            return vm.search_items;
        }

        function duplicateReport() {
            $mdDialog.show({
                controller: 'CloneReportModalController',
                controllerAs: 'vm',
                templateUrl: 'app/mainApp/reportes/manager/modal/clone/cloneReport.modal.tmpl.html',
                fullscreen: true,
                clickOutsideToClose: true,
                focusOnOpen: true,
                locals: {
                    reporte: vm.report
                }
            }).then(function () {
                activate();
                toastr.success(vm.successClone, vm.successTitle);
            }).catch(function (err) {
                if (err != null) {
                    toastr.error(vm.errorClone, vm.errorTitle);
                }
            });
        }

        function createReport() {

            $mdDialog.show({
                controller: 'CreateReportModalController',
                controllerAs: 'vm',
                templateUrl: 'app/mainApp/reportes/manager/modal/create/createReport.modal.tmpl.html',
                fullscreen: true,
                clickOutsideToClose: true,
                focusOnOpen: true
            }).then(function () {

                toastr.success(vm.successCreate, vm.successTitle);
            }).catch(function (err) {
                if (err != null) {
                    toastr.error(vm.errorCreate, vm.errorTitle);
                }
            });
        }

        function selected(item) {
            vm.selectedReport = item;
            vm.report = Reportes.getReport(item.id);
        }

        function remove() {
            var confirm = $mdDialog.confirm()
                .title(vm.dialogTitle)
                .textContent(vm.dialogMessage)
                .ariaLabel('Confirmar eliminación')
                .ok(vm.deleteButton)
                .cancel(vm.cancelButton);
            $mdDialog.show(confirm).then(function () {
                Reportes.deleteReport(vm.report).then(function () {
                    toastr.success(vm.successDelete, vm.successTitle);
                    activate();
                }).catch(function () {
                    toastr.error(vm.errorDelete, vm.errorTitle);
                });
            }, function () {
                //Cancelled
            });


        }

        function editReport() {
            $state.go('triangular.admin-default.reportModify', {id: vm.report.id});
        }

    }

    function reportSearch() {
        return function (input, text) {
            if (!angular.isString(text) || text === '') {
                return input;
            }

            return _.filter(input, function (item) {
                return item.name.toLowerCase().indexOf(text.toLowerCase()) >= 0;
            });

        };
    }


})();
