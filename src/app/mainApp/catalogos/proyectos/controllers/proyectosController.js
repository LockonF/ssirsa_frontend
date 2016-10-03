/**
 * Created by Emmanuel on 11/09/2016.
 */
(function () {
    'use_strict';

    angular
        .module('app.mainApp.catalogos')
        .controller('proyectosController', proyectosController);

    function proyectosController(Proyectos, toastr, $scope, Translate, $mdDialog) {
        var vm = this;


        //Functions
        vm.create = create;
        vm.update = update;
        vm.remove = remove;
        vm.search = search;
        vm.clear = clear;
        vm.clickCopy=clickCopy;
        vm.querySearch=querySearch;
        
        activate();
        vm.successTitle=Translate.translate('Projects.Notify.Success');
        vm.errorTitle=Translate.translate('Projects.Notify.Error');
        vm.warningTitle=Translate.translate('Projects.Notify.Warning');
        vm.listErrorMessage=Translate.translate('Projects.Notify.Messages.ERROR_GETTING_PROJECTS');
        vm.errorCreate=Translate.translate('Projects.Notify.Messages.ERROR_CREATING_PROJECT');
        vm.succesCreate=Translate.translate('Projects.Notify.Messages.SUCCESS_CREATING_PROJECT');
        vm.errorRemove=Translate.translate('Projects.Notify.Messages.ERROR_REMOVING_PROJECT');
        vm.successRemove=Translate.translate('Projects.Notify.Messages.SUCCESS_REMOVING_PROJECT');
        vm.errorUpdate=Translate.translate('Projects.Notify.Messages.ERROR_UPDATING_PROJECT');
        vm.successUpdate=Translate.translate('Projects.Notify.Messages.SUCCESS_UPDATING_PROJECT');
        vm.deleteButton=Translate.translate('MAIN.BUTTONS.DELETE');
        vm.cancelButton=Translate.translate('MAIN.BUTTONS.CANCEL');
        vm.dialogTitle=Translate.translate('MAIN.DIALOG.DELETE_TITLE');
        vm.dialogMessage=Translate.translate('MAIN.DIALOG.DELETE_MESSAGE');
        
        function activate() {
            vm.projects=Proyectos.list();
            vm.filteredProjects=vm.projects;
            vm.project=null;
        }

        function create() {
            Proyectos.create(vm.project).then(function(res){
                toastr.success(vm.succesCreate,vm.successTitle);
                vm.clear();
                activate();
            }).catch(function(err){
                toastr.error(vm.errorCreate,vm.errorTitle);
                console.log(err);
            });
        }

        function update() {
            Proyectos.modify(vm.project).then(function(res){
                toastr.success(vm.successUpdate,vm.successTitle);
                vm.clear();
                activate();
            }).catch(function(err){
                toastr.error(vm.errorUpdate,vm.errorTitle);
                console.log(err);
            });
        }

        function remove() {
            var confirm = $mdDialog.confirm()
                .title(vm.dialogTitle)
                .textContent(vm.dialogMessage)
                .ariaLabel('Confirmar eliminación')
                .ok(vm.deleteButton)
                .cancel(vm.cancelButton);
            $mdDialog.show(confirm).then(function() {
                Proyectos.remove(vm.project).then(function (res) {
                    toastr.success(vm.successRemove, vm.successTitle);
                    vm.clear();
                    activate();
                }).catch(function (err) {
                    toastr.error(vm.errorRemove, vm.errorTitle);
                    console.log(err);
                });
            }, function (){
                //Cancelled
            });
        }

        function search(text) {
            vm.filteredProjects = _.filter(vm.projects, function (item) {
                return item.descripcion.toLowerCase().includes(text.toLowerCase());
            });
            return vm.filteredProjects;
        }

        function clickCopy(item) {
            vm.selectedProject=item;
            vm.project=angular.copy(item);
            $scope.formProject.$invalid=true;
        }

        function clear() {
            $scope.formProject.$setPristine();
            $scope.formProject.$setUntouched();
            $scope.formProject.$invalid=true;
            vm.searchParameter='';
            vm.filteredProjects=vm.projects;
            vm.selectedProject=null;
            vm.project=null;
        }

        function querySearch(query) {
            var results = query ? search(query) : vm.projects;
            return results;

        }

    }

})();
