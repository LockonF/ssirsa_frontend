/**
 * Created by Emmanuel on 29/08/2016.
 */
(function(){
    'use strict';
    
    angular
        .module('app.mainApp.entradaSalida')
        .controller('entradaController',entradaController);
    
    function entradaController (toastr, Helper, Upload, EnvironmentConfig, OAuthToken, EntradaSalida){
        var vm = this;
        vm.status="idle";//idle, uploading, complete
        vm.guardar = guardar;
        vm.selectionFile=selectionFile;
        activate();

        vm.hideEntrada=false;
        vm.hideSalida=true;

        //Selected's
        vm.selectedUdn="";
        vm.selectedTransportLine="";
        vm.selectedTransportKind="";
        vm.selectedSubsidiary="";
        vm.selectedProject="";

        //Models
        vm.lineasTransporte=[
            {
                "id": "",
                "razon_social": "",
                "direccion": "",
                "telefonos": "",
                "responsable": ""
            }
        ];
        vm.tiposTransporte=[
        {
            "id": "",
            "descripcion": ""
        }
        ];
        vm.udns=[
            {
                "id": "",
                "zona": "",
                "centro": "",
                "agencia": "",
                "direccion": "",
                "telefono": []
            }
        ];
        vm.Sucursales=[
            {
                "id": "",
                "nombre": "",
                "direccion": "",
                "telefonos": [],
                "responsable": ""
            }
        ];
        vm.Proyectos=[
            {
                "id": "",
                "descripcion": ""
            }
        ];
        vm.cabinetes=[{
            "economico":"201"
        }];
        vm.entrada={
            "fecha": "",
            "nombre_chofer": "",
            "ife_chofer":"",
            "pedimento": "",
            "accion": "entrada",
            "linea_transporte": "",
            "proyecto": "",
            "sucursal": "",
            "tipo_transporte": "",
            "udn": "",
            "cabinets":vm.cabinetes
        };

        //Functions
        function guardar() {

            var fr = new FileReader();
            vm.status = 'uploading';

            vm.entrada.fecha = getToday();
            vm.entrada.linea_transporte=vm.selectedTransportLine;
            vm.entrada.proyecto=vm.selectedProject;
            vm.entrada.sucursal=vm.selectedSubsidiary;
            vm.entrada.tipo_transporte=vm.selectedTransportKind;
            vm.entrada.udn=vm.selectedUdn;

            vm.entrada.ife_chofer=vm.picFile;


            var fd = new FormData();
            fd.append('accion','entrada');
            fd.append('cabinets',vm.cabinetes);
            fd.append('fecha',vm.entrada.fecha);
            fd.append('pedimento',vm.entrada.pedimento);
            fd.append('nombre_chofer',vm.entrada.nombre_chofer);
            fd.append('linea_transporte',vm.entrada.linea_transporte);
            fd.append('proyecto',vm.entrada.proyecto);
            fd.append('sucursal',vm.entrada.sucursal);
            fd.append('tipo_transporte',vm.entrada.tipo_transporte);
            fd.append('udn',vm.entrada.udn);
            fd.append('ife_chofer',vm.entrada.ife_chofer);

            console.log(vm.entrada.ife_chofer);
            EntradaSalida.postEntrada(fd).then(function (res) {

            }).catch(function (err) {

            });


            console.log(vm.entrada);
            /*
            Upload.upload({
                url: EnvironmentConfig.site.rest.api+'entrada_salida',
                headers: {'Authorization': OAuthToken.getAuthorizationHeader()},
                method: 'POST',
                data: vm.entrada
            }).then(function (res) {
                vm.status = 'idle';
                //vm.cabinet=null;
                vm.picFile=null;
                vm.statusReady=0;
                //toastr.success(vm.successCreateMessage, vm.successTitle);
                //vm.diagnostico=angular.copy(diagnostico);
            }, function (resp) {
                vm.status = 'idle';
                console.log(resp);
                //toastr.warning(vm.errorMessage, vm.errorTitle);
            });*/

        }
        function selectionFile($files) {
            if ($files.length > 0) {
                var file = $files[0];
                var extn=file.name.split(".").pop();
                if(file.size/1000000>1) {
                    //toastr.warning(vm.errorSize, vm.errorTitle);
                    vm.picFile = null

                }else if (!Helper.acceptFile(file.type))  {
                    if (!Helper.acceptFile(extn))  {
                        //toastr.warning(vm.errorTypeFile, vm.errorTitle);
                        vm.picFile = null;
                    }
                }
            }

        }
        function activate() {

            EntradaSalida.getLineasTransporte().then(function(res){
                vm.lineasTransporte=res;
            }).catch(function(err){

            });

            EntradaSalida.getTiposTransporte().then(function(res){
                vm.tiposTransporte=res;
            }).catch(function(err){

            });

            EntradaSalida.getSucursales().then(function(res){
                vm.Sucursales=res;
            }).catch(function(err){

            });

            EntradaSalida.getProyectos().then(function(res){
                vm.Proyectos=res;
            }).catch(function(err){

            });

            EntradaSalida.getUDN().then(function(res){
                vm.udns=res;
            }).catch(function(err){

            });

        }
        function getToday(){
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!
            var yyyy = today.getFullYear();

            if(dd<10) {
                dd='0'+dd
            }

            if(mm<10) {
                mm='0'+mm
            }

            return yyyy+'/'+mm+'/'+dd;
        }
        
    }
    
})();