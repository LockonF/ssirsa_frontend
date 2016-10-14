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

    function clienteController(Clientes, toastr, $scope, Translate, $mdDialog) {
        var vm = this;

        vm.res=350;
        //Functions
        vm.create = create;
        vm.update = update;
        vm.remove = remove;
        vm.search = search;
        vm.clear = clear;
        //vm.selectedItemChange = selectedItemChange;
        vm.clickCopy = clickCopy;
        vm.querySearch=querySearch;

        vm.myHeight=window.innerHeight-250;
        vm.myStyle={"min-height":""+vm.myHeight+"px"};

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
        vm.deleteButton=Translate.translate('MAIN.BUTTONS.DELETE');
        vm.cancelButton=Translate.translate('MAIN.BUTTONS.CANCEL');
        vm.dialogTitle=Translate.translate('MAIN.DIALOG.DELETE_TITLE');
        vm.dialogMessage=Translate.translate('MAIN.DIALOG.DELETE_MESSAGE');

        activate();

        var client={
            "nombre":"",
            "apellido_paterno":"",
            "apellido_materno":"",
            "direccion":"",
            "telefono":""
        };

        var user={
            "email":"",
            "role":"",
            "username":"",
            "password":""
        };

        function activate() {
            vm.isNew=true;
            vm.searchParameter='';
            vm.clients=Clientes.list();
            vm.filteredClients=vm.clients;
            vm.client=angular.copy(client);
            Clientes.getClienteId().then(function(res){
                vm.role=res[0].id;
            });
            vm.user=user;
        }

        function create() {
            vm.user.role=vm.role;
            vm.client.user=vm.user;
            Clientes.create(vm.client).then(function(res){
                toastr.success(vm.succesCreate,vm.successTitle);
                activate();
                vm.clear();
            }).catch(function(err){
                toastr.error(vm.errorCreate,vm.errorTitle);
                console.log(err);
            });
        }

        function update() {
            Clientes.modify(vm.client).then(function(res){
                toastr.success(vm.successUpdate,vm.successTitle);
                activate();
                vm.clear();
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
                Clientes.remove(vm.client).then(function (res) {
                    toastr.success(vm.successRemove, vm.successTitle);
                    activate();
                    vm.clear();
                }).catch(function (err) {
                    toastr.error(vm.errorRemove, vm.errorTitle);
                    console.log(err);
                });
            },function(){
                //Cancelled
            });
        }

        function search(text) {
            if(text.length>0) {
                vm.filteredClients = _.filter(vm.clients, function (item) {
                    return item.nombre.toLowerCase().includes(text.toLowerCase());
                });
            }
            return vm.filteredClients;
        }

        function clear() {
            $scope.formClient.$setPristine();
            $scope.formClient.$setUntouched();
            $scope.formClient.$invalid=true;
            vm.searchParameter='';
            vm.filteredClients=vm.clients;
            vm.client=angular.copy(client);
            vm.user=angular.copy(user);
            vm.selectedClient=null;
            vm.isNew=true;
            vm.user.password="";
        }

        function clickCopy(item) {
            vm.isNew=false;
            vm.selectedClient=item;
            vm.client=angular.copy(item);
            vm.user.username=vm.client.user.username;
            vm.user.email=vm.client.user.email;
            vm.user
            $scope.formClient.$invalid=true;
        }
        
        function querySearch(query) {
            var results = query ? search(query) : vm.clients;
            return results;

        }
    }

})();