/**
 * Created by Emmanuel on 03/09/2016.
 */
(function(){
    'use_strict'
    angular
        .module('app.mainApp.entradaSalida')
        .controller('modeloDialogcontroller',modeloDialogController);

    function modeloDialogController(MarcaCabinet, ModeloCabinet){

        vm.save=save;
        vm.cancel=cancel;

        activate()
        vm.modelo={
            "nombre": "",
            "descripcion": "",
            "palabra_clave": "",
            "tipo_refrigerante": "",
            "cantidad": "",
            "tipo_compresor": "",
            "marca": ""
        }
        vm.marcas={
            "id":"",
            "categoria":"",
            "descripcion":""
        }
        
        function activate(){
            MarcaCabinet.getAll().then(function(res){
                vm.marcas=res;
            }).catch(function(err){
                console.log(err);
            });
        }

        function save(){
            ModeloCabinet.create(vm.modelo).then(function(res){
                
            }).catch(function(err){
                
            });
        }

        function cancel(){

        }
    }
})();