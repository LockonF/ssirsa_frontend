/**
 * Created by Emmanuel on 12/09/2016.
 */
/**
 * Created by Emmanuel on 11/09/2016.
 */
(function () {
    'use_strict';

    angular
        .module('app.mainApp.catalogos')
        .controller('clienteController', clienteController);

    function clienteController(Clientes, toastr, $scope, Translate) {
        var vm = this;


        //Functions
        vm.create = create;
        vm.update = update;
        vm.remove = remove;
        vm.search = search;
        vm.clear = clear;
        vm.selectedItemChange=selectedItemChange;
        vm.clickCopy=clickCopy;

        vm.clients = null;
        vm.filteredClients = [];
        vm.client = null;
        vm.searchParameter='';
        activate();

        function activate() {
            vm.successTitle=Translate.translate('Clients.Notify.Success');
            vm.errorTitle=Translate.translate('Clients.Notify.Error');
            vm.warningTitle=Translate.translate('Clients.Notify.Warning');
            vm.listErrorMessage=Translate.translate('Clients.Notify.Messages.ERROR_GETTING_CLIENTS');
            vm.errorCreate=Translate.translate('Clients.Notify.Messages.ERROR_CREATING_CLIENT');
            vm.succesCreate=Translate.translate('Clients.Notify.Messages.SUCCESS_CREATING_CLIENT');
            vm.errorRemove=Translate.translate('Clients.Notify.Messages.ERROR_REMOVING_CLIENT');
            vm.successRemove=Translate.translate('Clients.Notify.Messages.SUCCESS_REMOVING_CLIENT');
            vm.errorUpdate=Translate.translate('Clients.Notify.Messages.ERROR_UPDATING_CLIENT');
            vm.successUpdate=Translate.translate('Clients.Notify.Messages.SUCCESS_UPDATING_CLIENT');

            vm.clients=Clientes.getAll();
            vm.filteredClients=vm.clients;
        }

        function create() {
            Clientes.post(vm.project).then(function(res){
                toastr.success(vm.succesCreate,vm.successTitle);
            }).catch(function(err){
                toastr.error(vm.errorCreate,vm.errorTitle);
                console.log(err);
            });
        }

        function update() {
            Clientes.put(vm.project).then(function(res){
                toastr.success(vm.successUpdate,vm.successTitle);
            }).catch(function(err){
                toastr.error(vm.errorUpdate,vm.errorTitle);
            });
            vm.projects=Clientes.getAll();
            vm.filteredProjects=vm.projects;
        }

        function remove() {
            Clientes.remove(vm.projects).then(function(res){
                toastr.succes(vm.successRemove,vm.successTitle);
            }).catch(function(err){
                toastr.error(vm.errorRemove,vm.errorTitle);
                console.log(err);
            });
            vm.projects=Clientes.getAll();
            vm.filteredProjects=vm.projects;
        }

        function search(text) {
            vm.filteredProjects = _.filter(vm.projects, function (item) {
                return item.descripcion.includes(text);
            });
            return vm.filteredProjects;
        }

        function clear() {
            vm.project = null;
            $scope.formProject.$setPristine();
        }

        function selectedItemChange(item) {
            vm.project = item;
            $scope.formProject.$invalid=true;
        }

        function clickCopy(item){
            vm.project=item.clone();
        }

    }

})();