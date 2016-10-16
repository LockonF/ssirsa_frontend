/**
 * Created by Emmanuel on 15/10/2016.
 */
(function(){
    'use_strict';
    
    angular
        .module('app.mainApp.tecnico')
        .controller('CabinetDialogController',CabinetDialogController);
    function CabinetDialogController($mdDialog, Cabinet, MarcaCabinet, ModeloCabinet, cabinetID){
        var vm = this;

        //Functions
        vm.create=create;
        vm.cancel=cancelClick;
        vm.filterModels=filterModels;

        //Blank variables templates
        var cabinet = {
            "economico": "",
            "deleted": false,
            "status": null,
            "id_unilever": "",
            "antiguedad": null,
            "activo": false,
            "capitalizado": false,
            "no_serie": "",
            "tipo_entrada": "",
            "year": null,
            "no_incidencias": "1",
            "linea_x": null,
            "linea_y": null,
            "linea_z": null,
            "foto": null,
            "modelo": null,
            "insumo": null
        };
                
        activate();
        
        function activate(){
            vm.cabinet=angular.copy(cabinet);
            vm.marca=null;
            vm.cabinet.economico=cabinetID;
            vm.marcas=MarcaCabinet.list();
            vm.modelos=[];
        }

        function filterModels(){
            vm.modelos=MarcaCabinet.getModels(vm.marca);
            console.log(vm.modelos);
        }
        
        function create(){
            Cabinet.createClean(vm.cabinet).then(function(res){
                $mdDialog.hide(vm.cabinet);
            }).catch(function(err){
                $mdDialog.cancel(err);
            });
        }

        function cancelClick(){
            $mdDialog.cancel();   
        }
        
    }
})();