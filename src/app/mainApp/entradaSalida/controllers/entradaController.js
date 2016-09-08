/**
 * Created by Emmanuel on 29/08/2016.
 */
(function(){
    'use strict';
    
    angular
        .module('app.mainApp.entradaSalida')
        .controller('entradaController',entradaController);
    
    function entradaController (EntradaSalida, toastr, $mdDialog, MarcaCabinet, ModeloCabinet){
        var vm = this;
        //vm.status="idle";//idle, uploading, complete
        vm.guardar = guardar;
        vm.selectionFile=selectionFile;
        vm.selectionImage=selectionImage;
        vm.showMassiveUpload=showMassiveUpload;
        vm.showManualUpload=showManualUpload;
        vm.removeImage=removeImage;
        vm.nextTab=nextTab;
        vm.uploadFile=uploadFile;
        vm.showMarcaDialog=showMarcaDialog;
        vm.showModeloDialog=showModeloDialog;

        activate();
        
        vm.selectedTab=0;
        vm.idEntrada=null;
        
        //Visualizations
        vm.hideEntrada=false;
        vm.hideSalida=true;
        vm.hideMassiveUpload=true;
        vm.hideManualUpload=true;
        vm.hideRegisteredCabinets=true;
        vm.hideUnregisteredCabinets=true;

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
        vm.cabinets=null;
        vm.responseMassiveUpload={
            "id":"",
            "creados":[

            ],
            "no_creados":[

            ],
            "modelos_no_existentes":[

            ]

        };

        vm.entrada={
            "id":null,
            "fecha": "",
            "nombre_chofer": "",
            "ife_chofer":"",
            "pedimento": "",
            "accion": "entrada",
            "linea_transporte": "",
            "proyecto": "",
            "sucursal": "",
            "tipo_transporte": "",
            "udn": null,
            "file":null,

            "creados":null,
            "no_creados":null,
            "modelos_no_existentes":null

        };

        //Functions
        function guardar() {
            vm.entrada.fecha = getToday();

            var fd = new FormData();

            fd.append('accion','entrada');
            fd.append('fecha',vm.entrada.fecha);
            fd.append('pedimento',vm.entrada.pedimento);
            fd.append('nombre_chofer',vm.entrada.nombre_chofer);
            fd.append('linea_transporte',vm.entrada.linea_transporte);
            fd.append('proyecto',vm.entrada.proyecto);
            fd.append('sucursal',vm.entrada.sucursal);
            fd.append('tipo_transporte',vm.entrada.tipo_transporte);
            fd.append('udn',vm.entrada.udn);

            if(vm.entrada.id!=null)
                fd.append("id",vm.entrada.id);
            if(vm.cabinets!=null)
                fd.append('cabinets',vm.cabinets);
            if(vm.entrada.ife_chofer!=null)
                fd.append('ife_chofer',vm.entrada.ife_chofer);
            //Is massive upload
            if(vm.entrada.file!=null) {
                fd.append('file', vm.entrada.file);
                EntradaSalida.postEntradaMasiva(fd).then(function (res) {
                    vm.entrada=res;
                    vm.hideRegisteredCabinets=false;
                    vm.hideUnregisteredCabinets=false;
                }).catch(function (err) {

                });
            }
            else {
                EntradaSalida.postEntrada(fd).then(function (res) {

                }).catch(function (err) {

                });
            }

        }
        function selectionImage($file) {
            vm.entrada.ife_chofer=$file;
        }
        function selectionFile($file) {
            vm.entrada.file=$file;
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
        function  showMassiveUpload(){
            vm.hideManualUpload=true;
            vm.hideMassiveUpload=false;
        }
        function showManualUpload(){
            vm.hideManualUpload=false;
            vm.hideMassiveUpload=true;
        }
        function removeImage() {
            vm.entrada.ife_chofer=null;
        }
        function nextTab(){
            vm.selectedTab=vm.selectedTab+1;
        }
        function uploadFile(){
            EntradaSalida.postEntradaMasiva(vm.entrada).then(function(res){
                vm.responseMassiveUpload=res;
            }).catch(function(err){
                
            });
        }
        function showMarcaDialog(ev) {
            $mdDialog.show({
                controller: dialogController,
                templateUrl: 'app/mainApp/entradaSalida/dialogs/marca.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            }).then(function(answer) {
                //Accepted
                $mdDialog.hide();
                }, function() {
                    //Cancelled
                $mdDialog.cancel();
                });

        }
        function showModeloDialog(ev) {
            $mdDialog.show({
                controller: dialogController,
                templateUrl: 'app/mainApp/entradaSalida/dialogs/modelo.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            }).then(function(answer) {
                //Accepted
                $mdDialog.hide();
            }, function() {
                //Cancelled
                $mdDialog.cancel();
            });

        }

        function dialogController($scope,$mdDialog){
            $scope.marcas=null;
            MarcaCabinet.getAll().then(function(res){
                $scope.marcas=res;
            }).catch(function(err){

            });
            $scope.marca=null;
            $scope.modelo=null;
            $scope.hide=function(){
                $mdDialog.hide();
            };
            $scope.registrarMarca=function(){
                MarcaCabinet.create($scope.marca);
            };
            $scope.registrarModelo=function(){
                ModeloCabinet.create($scope.modelo);
            };
            $scope.cancel = function() {
                $mdDialog.cancel();
            };
        }


    }
    
})();