/**
 * Created by franciscojaviercerdamartinez on 6/2/16.
 */
(function () {
    angular
        .module('app.mainApp.solicitudes')
        .controller('realizarSolicitudController',realizarSolicitudController);

    function realizarSolicitudController(udn,modelo_cabinet,$mdDialog,$mdEditDialog,toastr,Solicitudes,Solicitud_Servicio,Solicitudes_Admin,Persona_Admin, Session, Socket){
        var vm = this; 
        /*vm.selectedDate = moment().startOf('day').format();
         $mdDateLocaleProvider.formatDate = function(date) {
         return moment(date).format('DD/MM/YYYY');
         };*/
        vm.udn=null;
        vm.persona=null;
        vm.time=null;
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
            "datos":[],
            "persona":null,
            "modelo_cabinet":null
        };
        vm.requisito_vacio = {
            "id":null,
            "udn":null,
            "fecha_inicio":new Date(),
            "fecha_termino":new Date(),
            "fecha_atendida":new Date(),
            "descripcion":null,
            "tipo_solicitud": null,
            "status": null,
            "comentario": null,
            "datos":[],
            "persona":null,
            "modelo_cabinet":null
        };
        vm.requisitoVenta = {
            "id":null,
            "razon_social": null,
            "nombre_negocio": null,
            "direccion": null,
            "telefono": null,
            "contacto_negocio": null,
            "fecha_atencion":new Date(),
            "udn":null,
            "created_at":new Date(),
            "updated_at":new Date()
        };
        vm.requisitoVenta_vacio = {
            "id":null,
            "razon_social": null,
            "nombre_negocio": null,
            "direccion": null,
            "telefono": null,
            "contacto_negocio": null,
            "fecha_atencion":new Date(),
            "udn":null,
            "created_at":new Date(),
            "updated_at":new Date()
        }
        vm.crearRequisito=crearRequisito;
        vm.eliminarRequisito=eliminarRequisito;
        vm.showCreateDialog=showCreateDialog;
        vm.edit=edit;
        vm.eliminarDato=eliminarDato;
        vm.guardarSolicitudAdmin=guardarSolicitudAdmin;
        vm.guardarSolicitudVenta=guardarSolicitudVenta;
        vm.guardarSolicitudCliente=guardarSolicitudCliente;
        vm.Requisitos = [];
        vm.udns=null;
        vm.personas=null;
        vm.tiposEquipo=null;
        vm.isClient=true;
        activate();
        function activate(){
            udn.list().then(function(rest){
                vm.udns=rest;
                console.log(vm.isClient);
            }).catch(function(error){

            });

            modelo_cabinet.list().then(function(rest){
                vm.tiposEquipo=rest;
            }).catch(function(error){
                console.log(error);
            });

            Persona_Admin.list().then(function(rest){
                vm.personas=rest;
                console.log(vm.personas);
            }).catch(function (error){
                console.log(error);
            });

            vm.isClient = Session.userRole == 'Cliente';
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

        function guardarSolicitudAdmin(){
            vm.requisito.fecha_inicio=moment(vm.requisito.fecha_inicio).format('YYYY-MM-DD');
            vm.requisito.fecha_termino=moment(vm.requisito.fecha_termino).format('YYYY-MM-DD');
            vm.requisito.fecha_atendida=moment(vm.requisito.fecha_atendida).format('YYYY-MM-DD HH:mm:ss');
            vm.requisito.udn=vm.udn;
            vm.requisito.persona=vm.persona;
            console.log(vm.requisito);
            Solicitudes_Admin.create(vm.requisito).then(function(resp){
                console.log(resp);
                var notification = {
                    id_solicitud: 1,
                    type_notification: vm.requisito.tipo_solicitud,
                    updated_at: moment().toDate()
                };
                Socket.emit('new:msg', {
                    canal: 'Administrador',
                    username:  Session.userInformation.id,
                    solicitud:vm.requisito,
                    name:Session.userInformation.nombre,
                    notification: notification,
                    type:"normal"
                });
                vm.requisito= _.clone(vm.requisito_vacio);
                vm.udn=null;
                toastr.success('exito al guardar','exito');
                console.log(vm.udn);



            }).catch(function(err){
                toastr.error('error al guardar','error');
                console.log(err);
            })
        }

        function guardarSolicitudCliente(){
            vm.requisito.fecha_inicio=moment(vm.requisito.fecha_inicio).format('YYYY-MM-DD');
            vm.requisito.fecha_termino=moment(vm.requisito.fecha_termino).format('YYYY-MM-DD');
            vm.requisito.udn=vm.udn;
            console.log(vm.requisito);
            Solicitudes.create(vm.requisito).then(function(resp){
                vm.requisito= _.clone(vm.requisito_vacio);
                vm.udn=null;
                toastr.success('exito al guardar','exito');
                console.log(vm.udn);



            }).catch(function(err){
                toastr.error('error al guardar','error');
                console.log(err);
            })
        }

        function guardarSolicitudVenta(){
            vm.requisitoVenta.fecha_atencion=moment(vm.requisitoVenta.fecha_atencion).format('YYYY-MM-DD');
            vm.requisitoVenta.created_at=moment(vm.requisitoVenta.created_at).format('YYYY-MM-DD');
            vm.requisitoVenta.updated_at=moment(vm.requisitoVenta.updated_at).format('YYYY-MM-DD');
            vm.requisitoVenta.udn=vm.udn;
            console.log(vm.requisitoVenta);
            Solicitud_Servicio.create(vm.requisitoVenta).then(function(resp){
                console.log(resp);
                var notification = {
                    id_solicitud: 1,
                    type_notification: "Venta",
                    updated_at: moment().toDate()
                };
                Socket.emit('new:msg', {
                    canal: 'Administrador',
                    username:  Session.userInformation.id,
                    name:Session.userInformation.nombre,
                    solicitud:vm.requisitoVenta,
                    notification: notification,
                    type:"normal"
                });
                vm.requisitoVenta= _.clone(vm.requisitoVenta_vacio);
                vm.udn=null;
                toastr.success('exito al guardar','exito');
                console.log(vm.udn);
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
