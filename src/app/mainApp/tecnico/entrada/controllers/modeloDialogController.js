/**
 * Created by personal on 20-Oct-16.
 */
(function(){
    'use_strict';

    angular
        .module('app.mainApp.tecnico')
        .controller('CabinetDialogController',CabinetDialogController);
    function CabinetDialogController($mdDialog, Cabinet, MarcaCabinet, cabinetID, Helper, Translate, toastr){
        var vm = this;

        /*
         $scope.marcas = null;
         $scope.marcas = MarcaCabinet.list();
         $scope.marca = null;
         $scope.modelo = null;
         $scope.hide = function () {
         $mdDialog.hide();
         };
         $scope.registrarModelo = function () {
         ModeloCabinet.create($scope.modelo);
         $mdDialog.hide();
         };
         $scope.cancel = function () {
         $mdDialog.cancel();
         };
         }
         */

        //Functions
        vm.create=create;
        vm.cancel=cancelClick;

        activate();

        function activate(){
            vm.marca=null;
            MarcaCabinet.listObject().then(function(res){
                vm.marcas=Helper.filterDeleted(res,true);
            }).catch(function(err){
                toastr.error(vm.errorMessage,vm.errorTitle);
                vm.marcas=[];
            });
        }


        function create(){
            Cabinet.createClean(vm.cabinet).then(function(res){
                $mdDialog.hide(vm.cabinet.economico);
            }).catch(function(err){
                $mdDialog.cancel(err);
            });
        }

        function cancelClick(){
            $mdDialog.cancel(null);
        }

    }
})();
