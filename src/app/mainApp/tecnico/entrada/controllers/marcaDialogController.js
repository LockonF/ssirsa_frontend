/**
 * Created by personal on 20-Oct-16.
 */
(function(){
    'use_strict';

    angular
        .module('app.mainApp.tecnico')
        .controller('CabinetDialogController',CabinetDialogController);
    function CabinetDialogController($mdDialog, MarcaCabinet, Translate, toastr){
        var vm = this;

        //Functions
        vm.create=create;
        vm.cancel=cancelClick;

        //Blank variables templates
        vm.marca = {
            "categoría":"",
            "descripcion":""
        };


        function create(){
            MarcaCabinet.create(vm.marca).then(function(){
                $mdDialog.hide();
            }).catch(function(err){
                $mdDialog.cancel(err);
            });
        }

        function cancelClick(){
            $mdDialog.cancel(null);
        }


    }
})();
