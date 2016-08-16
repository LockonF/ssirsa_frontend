/**
 * Created by franciscojaviercerdamartinez on 6/2/16.
 */
(function () {
    angular
        .module('app.mainApp.solicitudes')
        .controller('realizarSolicitudController',realizarSolicitudController);

    function realizarSolicitudController(udn,tipoEquipo,$mdDialog,$mdEditDialog,toastr,Solicitudes,PersonaLocalService){
        var vm = this;
        /*vm.selectedDate = moment().startOf('day').format();
        $mdDateLocaleProvider.formatDate = function(date) {
            return moment(date).format('DD/MM/YYYY');
        };*/
        vm.id=0;
        vm.requisito = {
            "id":null,
            "udn":null,
            "fecha_inicio":new Date(),
            "fecha_termino":new Date(),
            "fecha_atendida":new Date(),
            "descripcion":null,
            "tipo_solicitud": null,
            "status": null,
            "comentario": null,
            "datos":[]
        };
        vm.requisito_vacio = {
            "id":null,
            "udn":null,
            "fecha_inicio":new Date(),
            "fecha_termino":new Date(),
            "descripcion":null,
            "tipo_solicitud": null,
            "status": null,
            "comentario": null,
            "datos":[]
        };
        vm.crearRequisito=crearRequisito;
        vm.eliminarRequisito=eliminarRequisito;
        vm.showCreateDialog=showCreateDialog;
        vm.edit=edit;
        vm.eliminarDato=eliminarDato;
        vm.guardarSolicitud=guardarSolicitud;
        vm.Requisitos = [];
        vm.udns=null;
        vm.tiposEquipo=null;
        vm.isClient=true;
        activate();
        function activate(){
            udn.list().then(function(rest){
                vm.udns=rest;
                //console.log(vm.udns);
                console.log(vm.isClient);
            }).catch(function(error){

            });

            tipoEquipo.list().then(function(rest){
                vm.tiposEquipo=rest;
                //console.log(vm.tiposEquipo);
            }).catch(function(error){

            });
            if(PersonaLocalService.role.name == 'Cliente'){
                vm.isClient=true;
            }else{
                vm.isClient=false;
            }
            console.log(vm.isClient);

        }
        // Crear requisito

        function crearRequisito() {
            console.log(vm.requisito)
            console.log("Tipo: "+vm.requisito.rTipo)
            if (vm.requisito != null) {
                console.log("requisitos antes de agregarlo");
                console.log(vm.Requisitos);
                vm.id=vm.id+1;//ID
                console.log("El id es:"+vm.id);
                //vm.Requisitos.id=vm.id;

                vm.Requisitos.push(vm.requisito);
                console.log("requisitos despues de agregarlo");
                console.log(vm.Requisitos);
                console.log("Tipo: "+vm.requisito.tipo);
                vm.requisito = {
                    "id":vm.id,
                    "rUDN":vm.requisito.rUDN,
                    "rFechaIni":new Date(),
                    "rFechaFin":new Date(),
                    "rDesc":null,
                    "rTipo": vm.requisito.rTipo,
                    "rEstatus": null,
                    "rCantidad": null
                };

                console.log("Los requisitos son:");
                console.log(vm.Requisitos);
            }
        }

        // Eliminar Requisito


        function eliminarRequisito(requisito) {

            vm.requisitocopy=requisito;
            var index=0;

            for (index = 0; index < vm.Requisitos.length; ++index) {//Cambiar a un for each

                console.log("El requisito a borrar es:"+vm.requisitocopy.rTipo);
                console.log(vm.Requisitos[index]);
                if (vm.Requisitos[index].id == vm.requisitocopy.id) {

                    console.log(index);
                    //if(vm.Requisitos[index].Descripcion==vm.requisitocopy.Descripcion){
                        console.log("voy a borrar");
                        console.log(vm.Requisitos[index]);
                        vm.Requisitos.splice(index, 1);
                    //
                }
                else{console.log("Aun no lo encuentro")}

            }

        }

        function editarRequisito(requisito) {


        }

        function showCreateDialog(event)
        {
            //var visualization = chooseTemplateController(model);
            var config = {
                controller:'solicitudDataDialogController',
                controllerAs: 'vm',
                bindToController:true,
                templateUrl:'app/mainApp/solicitudes/solicitudDataDialog.tmpl.html',
                parent:angular.element(document.body),
                targetEvent:event,
                clickOutsideToClose:true,
                fullscreen: false
            };

            $mdDialog.show(config).then(function(object){
                    //Agregar el objeto al arreglo de datos de la solicitud
                    vm.requisito.datos.push(object);
                },function() {
                }
            );
        }

        function eliminarDato(dato){
            var  resultado=_.indexOf(vm.requisito.datos,dato);
            if(resultado!=-1){
                vm.requisito.datos.splice(resultado,1);
            }
        }

        function guardarSolicitud(){
            vm.requisito.fecha_inicio=moment(vm.requisito.fecha_inicio).format('YYYY-MM-DD');
            vm.requisito.fecha_termino=moment(vm.requisito.fecha_termino).format('YYYY-MM-DD');
            Solicitudes.create(vm.requisito).then(function(resp){
                vm.requisito= _.clone(vm.requisito_vacio);
                toastr.success('exito al guardar','exito');
            }).catch(function(err){
                toastr.error('error al guardar','error');
                console.log(err);
            })
        }

        function edit(event,object,field) {
            var config =
            {
                modelValue: object[field],
                placeholder: 'Edita el campo',
                save: function (input) {

                    object[field] = input.$modelValue;
                    updateObject(object);
                },
                targetEvent: event,
                validators: {
                    'md-maxlength': 30
                }
            };

            function updateObject(funcion){
            }

            $mdEditDialog.small(config).then(function(ctrl){
            }).catch(function(err){
            });
        }

    }

})();