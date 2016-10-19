/**
 * Created by Emmanuel on 15/10/2016.
 */
(function(){
    'use_strict';
    
    angular
        .module('app.mainApp.tecnico')
        .controller('CabinetDialogController',CabinetDialogController);
    function CabinetDialogController($mdDialog, Cabinet, MarcaCabinet, ModeloCabinet, cabinetID, Helper){
        var vm = this;

        //Functions
        vm.create=create;
        vm.cancel=cancelClick;
        vm.filterModels=filterModels;

        //Blank variables templates
        var cabinet = {
            "economico": "",
            "deleted": false,
            "status": "N/A",
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
            MarcaCabinetlistObject().then(function(res){
                MarcaCabinet=Helper.filterDeleted(res,true);
            });
            vm.marcas= Helper.filterDeleted( MarcaCabinet.list() );
            vm.modelos=[];
        }

        function filterModels(){
            vm.modelos=MarcaCabinet.getModels(vm.marca);
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