/**
 * Created by Emmanuel on 11/09/2016.
 */
(function () {
    'use_strict';

    angular
        .module('app.mainApp.catalogos')
        .controller('proyectosController', proyectosController);

    function proyectosController(Proyectos, toastr, $scope, Translate, $mdDialog, Helper) {
        var vm = this;
        vm.toggleDeleted = true;


        //Functions
        vm.create = create;
        vm.update = update;
        vm.remove = remove;
        vm.search = search;
        vm.clear = clear;
        vm.clickCopy = clickCopy;
        vm.querySearch = querySearch;
        vm.toggleDeletedFunction = toggleDeletedFunction;
        vm.restore = restore;


        activate();
        vm.successTitle = Translate.translate('Projects.Notify.Success');
        vm.errorTitle = Translate.translate('Projects.Notify.Error');
        vm.warningTitle = Translate.translate('Projects.Notify.Warning');
        vm.listErrorMessage = Translate.translate('Projects.Notify.Messages.ERROR_GETTING_PROJECTS');
        vm.errorCreate = Translate.translate('Projects.Notify.Messages.ERROR_CREATING_PROJECT');
        vm.succesCreate = Translate.translate('Projects.Notify.Messages.SUCCESS_CREATING_PROJECT');
        vm.errorRemove = Translate.translate('Projects.Notify.Messages.ERROR_REMOVING_PROJECT');
        vm.successRemove = Translate.translate('Projects.Notify.Messages.SUCCESS_REMOVING_PROJECT');
        vm.errorUpdate = Translate.translate('Projects.Notify.Messages.ERROR_UPDATING_PROJECT');
        vm.successUpdate = Translate.translate('Projects.Notify.Messages.SUCCESS_UPDATING_PROJECT');
        vm.successRestore = Translate.translate('Projects.Notify.Messages.SUCCESS_RESTORE_PROJECT');
        vm.errorRestore = Translate.translate('Projects.Notify.Messages.ERROR_RESTORE_PROJECT');
        vm.acceptButton = Translate.translate('MAIN.BUTTONS.ACCEPT');
        vm.deleteButton = Translate.translate('MAIN.BUTTONS.DELETE');
        vm.cancelButton = Translate.translate('MAIN.BUTTONS.CANCEL');
        vm.dialogTitle = Translate.translate('MAIN.DIALOG.DELETE_TITLE');
        vm.dialogMessage = Translate.translate('MAIN.DIALOG.DELETE_MESSAGE');
        vm.errorMessage = Translate.translate('MAIN.MSG.ERROR_MESSAGE');
        vm.dialogMessage2 = Translate.translate('Projects.Notify.Messages.CONFIRM_RESTORE');
        vm.informationTitle = Translate.translate('Projects.Notify.Information');
        vm.duplicateMessage = Translate.translate('Projects.Notify.Messages.EXISTING_ELEMENT');

        function activate() {
            vm.project = null;
            Proyectos.listObject().then(function (res) {
                vm.projects = Helper.filterDeleted(res, vm.toggleDeleted);
                vm.filteredProjects = vm.projects;
            }).catch(function () {
                toastr.error(vm.errorMessage, vm.errorTitle);
                vm.projects = {};
                vm.filteredProjects = {};
            });
        }

        function create() {
            Proyectos.create(vm.project).then(function () {
                toastr.success(vm.succesCreate, vm.successTitle);
                vm.clear();
                activate();
            }).catch(function (err) {
                if(err.data.descripcion != null){
                    toastr.info(vm.duplicateMessage,vm.informationTitle);
                }
                else 
                    toastr.error(vm.errorCreate, vm.errorTitle);
            });
        }

        function update() {
            Proyectos.modify(vm.project).then(function (res) {
                toastr.success(vm.successUpdate, vm.successTitle);
                vm.clear();
                activate();
            }).catch(function (err) {
                if(err.data.descripcion != null){
                    toastr.info(vm.duplicateMessage,vm.informationTitle);
                }
                else
                    toastr.error(vm.errorUpdate, vm.errorTitle);
            });
        }

        function remove() {
            var confirm = $mdDialog.confirm()
                .title(vm.dialogTitle)
                .textContent(vm.dialogMessage)
                .ariaLabel('Confirmar eliminación')
                .ok(vm.deleteButton)
                .cancel(vm.cancelButton);
            $mdDialog.show(confirm).then(function () {
                Proyectos.remove(vm.project).then(function (res) {
                    toastr.success(vm.successRemove, vm.successTitle);
                    vm.clear();
                    activate();
                }).catch(function (err) {
                    toastr.error(vm.errorRemove, vm.errorTitle);
                });
            }, function () {
                //Cancelled
            });
        }

        function search(text) {
            if (text.length > 0) {
                vm.filteredProjects = _.filter(vm.projects, function (item) {
                    return item.descripcion.toLowerCase().includes(text.toLowerCase());
                });
            }
            return vm.filteredProjects;
        }

        function clickCopy(item) {
            vm.selectedProject = item;
            vm.project = angular.copy(item);
            $scope.formProject.$invalid = true;
        }

        function clear() {
            $scope.formProject.$setPristine();
            $scope.formProject.$setUntouched();
            $scope.formProject.$invalid = true;
            vm.searchParameter = '';
            vm.filteredProjects = vm.projects;
            vm.selectedProject = null;
            vm.project = null;
        }

        function querySearch(query) {
            var results = query ? search(query) : vm.projects;
            return results;

        }

        function toggleDeletedFunction() {
            activate();
            clear();
        }

        function restore() {
            vm.project.deleted = false;
            var confirm = $mdDialog.confirm()
                .title(vm.dialogTitle)
                .textContent(vm.dialogMessage2)
                .ariaLabel('Confirmar eliminación')
                .ok(vm.acceptButton)
                .cancel(vm.cancelButton);
            $mdDialog.show(confirm).then(function () {
                Proyectos.modify(vm.project).then(function (res) {
                    toggleDeletedFunction();
                    toastr.success(vm.successRestore, vm.successTitle);
                }).catch(function (err) {
                    toastr.error(vm.errorRestore, vm.errorTitle);
                });
            }, function () {
                //Cancelled
            });
        }

    }

})();
