/**
 * Created by Luis_Olvera on 15/06/2016.
 */
(function () {
    angular
        .module('app.mainApp.solicitudes')
        .controller('buscarSolicitudController',buscarSolicitudController);

    function buscarSolicitudController(Translate,$mdEditDialog,Solicitudes,Solicitudes_Admin,udn,modelo_cabinet,Solicitud_Servicio,Solicitud_Servicio_Admin,Session,OPTIONS,toastr,$mdDialog){
        var vm = this;
        vm.flag=0;
        vm.query={
            order: 'id',
            limit: 5,
            page: 1
        };
        vm.filtrarSolicitud=OPTIONS.filtrarSolicitud;
        vm.tipoSols=OPTIONS.tipoSolicitud;
        vm.estatusSols=OPTIONS.estatusSol;
        vm.id=null;
        vm.FechaFin=new Date();
        //Filtro de busqueda
        vm.tipo_solicitud=null;
        vm.filtro_busqueda=null;
        vm.busqueda_status=null;
        vm.folio=null;
        vm.sol=null;
        vm.solicitudesArray=[];
        //-------------------
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
            "modelo_cabinet":null
        };

        vm.remove=remove;
        vm.removeVenta=removeVenta;
        vm.removeCliente=removeCliente;
        vm.removeVentaCliente=removeVentaCliente;
        vm.buscarSolicitudes=buscarSolicitudes;
        vm.busqueda=busqueda;
        vm.borrarSolicitudVenta=borrarSolicitudVenta;
        vm.borrarSolicitud=borrarSolicitud;
        vm.edit=edit;
        vm.editVenta=editVenta;
        vm.editSelect=editSelect;
        vm.editCalendar=editCalendar;
        vm.editVentaCalendar=editVentaCalendar;


        vm.Requisitos = [];
        vm.solicitudes=null;
        vm.solicitudesVentas=null;
        vm.isClient=true;
        activate();
        init();
        function init() {
            vm.successTitle = Translate.translate('MAIN.MSG.SUCCESS_TITLE');
            vm.errorTitle = Translate.translate('MAIN.MSG.ERROR_TITLE');
            vm.successCreateMessage = Translate.translate('MAIN.MSG.GENERIC_SUCCESS_CREATE');
            vm.errorMessage = Translate.translate('MAIN.MSG.ERROR_MESSAGE');
            vm.successUpdateMessage = Translate.translate('MAIN.MSG.GENERIC_SUCCESS_UPDATE');
            vm.successDeleteMessage = Translate.translate('MAIN.MSG.GENERIC_SUCCESS_DELETE');
        }
        function activate(){
            vm.udns=udn.list();

            modelo_cabinet.list().then(function(rest){
                vm.tiposEquipo=rest;
                //console.log(vm.tiposEquipo);
            }).catch(function(error){

            });
            vm.isClient = Session.userRole == 'Cliente';
            console.log(vm.isClient);

        }


        function edit(event,object,field) {
            console.log("EDIT");
            var config =
            {
                modelValue: object[field],
                placeholder: 'Edita el campo',
                save: function (input) {

                    object[field] = input.$modelValue;
                    console.log("Fui activado");
                    updateObject(object);
                },
                targetEvent: event,
                validators: {
                    'md-maxlength': 30
                }
            };

            function updateObject(obj){
                console.log("guardar");
                console.log(obj);
                obj.fecha_inicio = moment(obj.fecha_inicio).format('YYYY-MM-DD');
                obj.fecha_termino = moment(obj.fecha_termino).format('YYYY-MM-DD');
                obj.fecha_atendida = moment(obj.fecha_atendida).toISOString();
                Solicitudes_Admin.updateSolicitud(obj).then(function () {
                    /*var notification = {
                     id_solicitud: 1,
                     type_notification: obj.tipo_solicitud,
                     updated_at: moment().toDate()
                     };
                     Socket.emit('new:msg', {
                     canal: 'Administrador',
                     username: Session.userInformation.id,
                     solicitud: obj,
                     name: Session.userInformation.nombre,
                     notification: notification,
                     type: "normal"
                     });
                     cancel();*/
                    toastr.success(vm.successUpdateMessage, vm.successTitle);


                }).catch(function (res) {
                    toastr.error(vm.errorMessage, vm.errorTitle);
                })
            }

            $mdEditDialog.small(config).then(function(ctrl){
            }).catch(function(err){
            });
        }

        function editCalendar(obj) {
            console.log("EDITCalendar");
            console.log("guardar");
            console.log(obj);
            obj.fecha_inicio = moment(obj.fecha_inicio).format('YYYY-MM-DD');
            obj.fecha_termino = moment(obj.fecha_termino).format('YYYY-MM-DD');
            obj.fecha_atendida = moment(obj.fecha_atendida).toISOString();
            Solicitudes_Admin.updateSolicitud(obj).then(function () {

                toastr.success(vm.successUpdateMessage, vm.successTitle);


            }).catch(function (res) {
                toastr.error(vm.errorMessage, vm.errorTitle);
            })
        }

        function editSelect(obj) {
            console.log("EDITCalendar");
            console.log("guardar");
            console.log(obj);
            obj.fecha_inicio = moment(obj.fecha_inicio).format('YYYY-MM-DD');
            obj.fecha_termino = moment(obj.fecha_termino).format('YYYY-MM-DD');
            obj.fecha_atendida = moment(obj.fecha_atendida).toISOString();
            Solicitudes_Admin.updateSolicitud(obj).then(function () {

                toastr.success(vm.successUpdateMessage, vm.successTitle);


            }).catch(function (res) {
                toastr.error(vm.errorMessage, vm.errorTitle);
            })
        }

        function borrarSolicitudVenta(id){
            Solicitud_Servicio_Admin.borrarSol(id).then(function(resp){
                //console.log(id);
                vm.busqueda();
                //console.log(resp);
            }).catch(function(err){
                console.log(err);
            })

            busqueda();
        }

        function borrarSolicitud(id){
            Solicitudes_Admin.borrarSol(id).then(function(resp){
                //console.log(id);
                vm.busqueda();
                //console.log(resp);
            }).catch(function(err){

                console.log(err);
            })

            busqueda();
        }

        function editVenta(event,object,field) {
            console.log("EDIT");
            var config =
            {
                modelValue: object[field],
                placeholder: 'Edita el campo',
                save: function (input) {

                    object[field] = input.$modelValue;
                    console.log("Fui activado");
                    updateObject(object);
                },
                targetEvent: event,
                validators: {
                    'md-maxlength': 30
                }
            };

            function updateObject(obj){
                console.log("guardar");
                console.log(obj);
                Solicitud_Servicio_Admin.updateSolicitud(obj).then(function () {
                    toastr.success(vm.successUpdateMessage, vm.successTitle);
                }).catch(function (res) {
                    toastr.error(vm.errorMessage, vm.errorTitle);
                })
            }

            $mdEditDialog.small(config).then(function(ctrl){
            }).catch(function(err){
            });
        }

        function editVentaCalendar(obj) {
            console.log("EDITCalendar");
            console.log(obj);
            obj.fecha_atencion = moment(obj.fecha_atencion).format('DD/MM/YYYY HH:mm');
            Solicitud_Servicio_Admin.updateSolicitud(obj).then(function () {

                toastr.success(vm.successUpdateMessage, vm.successTitle);


            }).catch(function (res) {
                toastr.error(vm.errorMessage, vm.errorTitle);
            })
        }

        function removeVenta(ev,id) {
            var confirm = $mdDialog.confirm()
                .title('Confirmación para eliminar')
                .textContent('¿Esta seguro de eliminar este elemento?')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Aceptar')
                .cancel('Cancelar');
            $mdDialog.show(confirm).then(function() {
                Solicitud_Servicio_Admin.borrarSolVenta(id).then(function(resp){
                    //console.log(id);
                    vm.busqueda();
                    toastr.success(vm.successDeleteMessage, vm.successTitle);
                    //console.log(resp);
                }).catch(function(err){
                    toastr.warning(vm.errorMessage, vm.errorTitle);
                    console.log(err);
                })
            }, function() {

            });

        }

        function remove(ev,id) {
            var confirm = $mdDialog.confirm()
                .title('Confirmación para eliminar')
                .textContent('¿Esta seguro de eliminar este elemento?')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Aceptar')
                .cancel('Cancelar');
            $mdDialog.show(confirm).then(function() {
                Solicitudes_Admin.borrarSol(id).then(function(resp){
                    //console.log(id);
                    vm.busqueda();
                    toastr.success(vm.successDeleteMessage, vm.successTitle);
                    //console.log(resp);
                }).catch(function(err){
                    toastr.warning(vm.errorMessage, vm.errorTitle);
                    console.log(err);
                })
            }, function() {

            });

        }

        function removeVentaCliente(ev,id) {
            var confirm = $mdDialog.confirm()
                .title('Confirmación para eliminar')
                .textContent('¿Esta seguro de eliminar este elemento?')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Aceptar')
                .cancel('Cancelar');
            $mdDialog.show(confirm).then(function() {
                Solicitud_Servicio.borrarSolVenta(id).then(function(resp){
                    //console.log(id);
                    vm.busqueda();
                    toastr.success(vm.successDeleteMessage, vm.successTitle);
                    //console.log(resp);
                }).catch(function(err){
                    toastr.warning(vm.errorMessage, vm.errorTitle);
                    console.log(err);
                })
            }, function() {

            });

        }

        function removeCliente(ev,id) {
            var confirm = $mdDialog.confirm()
                .title('Confirmación para eliminar')
                .textContent('¿Esta seguro de eliminar este elemento?')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Aceptar')
                .cancel('Cancelar');
            $mdDialog.show(confirm).then(function() {
                Solicitudes.borrarSol(id).then(function(resp){
                    //console.log(id);
                    vm.busqueda();
                    toastr.success(vm.successDeleteMessage, vm.successTitle);
                    //console.log(resp);
                }).catch(function(err){
                    toastr.warning(vm.errorMessage, vm.errorTitle);
                    console.log(err);
                })
            }, function() {

            });

        }

        function buscarSolicitudes(){
            console.log("vm.tipo_solicitud");
            console.log(vm.tipo_solicitud);
            if(!vm.isClient){
                //Solicitudes_Admin.consultaEsp(vm.requisito).then(function (rest){
                Solicitudes_Admin.list().then(function (rest){
                    console.log("Soy admin--");
                    console.log(vm.requisito);
                    vm.solicitudes = rest;
                    console.log(vm.solicitudes);
                }).catch(function(error){
                    console.log(error);
                })
            }else {

                Solicitudes.list().then(function (rest) {
                    console.log("Soy cliente");
                    vm.solicitudes = rest;
                    console.log(vm.solicitudes);
                    //if(vm.solicitudes)
                    //console.log(vm.udns);
                }).catch(function (error) {
                    console.log(error);
                });
            }
        }

        function busqueda() {
            if(vm.filtro_busqueda=='Todas'){
                vm.busqueda_status=null;
            }
            vm.solicitudes = null;
            vm.sol=null;
            vm.solicitudesArray = [];
            console.log("entre a busqueda");
            switch (vm.tipo_solicitud) {
                case 'Envio':
                    console.log("entre a envio");
                    console.log(vm.filtro_busqueda);
                    if(vm.filtro_busqueda == 'Por Folio')
                    {
                        //vm.solicitudesVentas=null;
                        if(!vm.isClient){
                            //Solicitudes_Admin.consultaEsp(vm.requisito).then(function (rest){
                            Solicitudes_Admin.list().then(function (rest){
                                console.log("Soy admin--");
                                vm.solicitudes = rest;
                                console.log(vm.solicitudes);

                                console.log("solicitudes--");
                                for(var i=0,len = vm.solicitudes.length; i<len;i++)
                                {
                                    //console.log(vm.solicitudes.length);
                                    //console.log("vm.folio" +  vm.solicitudes.fecha_inicio);
                                    if(vm.solicitudes[i].id==vm.folio && vm.solicitudes[i].tipo_solicitud=='Envio')
                                    {
                                        vm.sol = vm.solicitudes[i];
                                        vm.sol.fecha_inicio = moment(vm.sol.fecha_inicio).format('DD/MM/YYYY');
                                        vm.sol.fecha_termino = moment(vm.sol.fecha_termino).format('DD/MM/YYYY');
                                        vm.sol.fecha_atendida = moment(vm.sol.fecha_atendida).format('DD/MM/YYYY HH:mm');
                                        console.log(vm.sol);
                                    }
                                }
                                if(vm.sol!=null) {
                                    console.log("si se encontro el folio");
                                    console.log("vm.folio" +  vm.sol.fecha_inicio);
                                    vm.solicitudes = [];
                                    vm.solicitudes.push(vm.sol);
                                }else{
                                    //console.log("no se encontro el folio");
                                    toastr.warning('Folio no encontrado','Advertencia');
                                    vm.solicitudes = null;
                                }
                            }).catch(function(error){
                                console.log(error);
                            })
                        }else {

                            Solicitudes.list().then(function (rest) {
                                console.log("Soy cliente");
                                vm.solicitudes = rest;
                                console.log(vm.solicitudes);

                                console.log("solicitudes--");
                                for(var i=0,len = vm.solicitudes.length; i<len;i++)
                                {
                                    //console.log(vm.solicitudes.length);
                                    //console.log(vm.folio);
                                    if(vm.solicitudes[i].id==vm.folio && vm.solicitudes[i].tipo_solicitud=='Envio')
                                    {
                                        vm.sol = vm.solicitudes[i];
                                        vm.sol.fecha_inicio = moment(vm.sol.fecha_inicio).format('DD/MM/YYYY');
                                        vm.sol.fecha_termino = moment(vm.sol.fecha_termino).format('DD/MM/YYYY');
                                        console.log(vm.sol);
                                    }
                                }
                                if(vm.sol!=null) {
                                    //console.log("si se encontro el folio");
                                    vm.solicitudes = [];
                                    vm.solicitudes.push(vm.sol);
                                }else{
                                    //console.log("no se encontro el folio");
                                    toastr.warning('Folio no encontrado','Advertencia');
                                    vm.solicitudes = null;
                                }
                            }).catch(function (error) {
                                console.log(error);
                            });
                        }


                    }
                    else//vm.filtro_busqueda == 'Por Estatus' Envio
                    {
                        if(!vm.isClient){
                            Solicitudes_Admin.consultaEsp(vm.busqueda_status).then(function (rest) {
                                console.log(rest.length);
                                if(rest.length>0) {
                                    console.log("mayor a 0");
                                    vm.solicitudes = rest;
                                    for(var i=0,len = vm.solicitudes.length; i<len;i++)
                                    {
                                        //console.log(vm.solicitudes.length);
                                        //console.log(vm.folio);
                                        if(vm.solicitudes[i].tipo_solicitud=='Envio')
                                        {
                                            vm.sol = vm.solicitudes[i];
                                            vm.sol.fecha_inicio = moment(vm.sol.fecha_inicio).format('DD/MM/YYYY');
                                            vm.sol.fecha_termino = moment(vm.sol.fecha_termino).format('DD/MM/YYYY');
                                            vm.sol.fecha_atendida = moment(vm.sol.fecha_atendida).format('DD/MM/YYYY HH:mm');
                                            vm.solicitudesArray.push(vm.sol);
                                            console.log(vm.sol);
                                        }
                                    }
                                    vm.solicitudes = null;
                                    vm.solicitudes = vm.solicitudesArray;
                                    vm.solicitudesArray = [];
                                    console.log("vm.solicitudes::");
                                    console.log(vm.solicitudes);
                                    if(vm.solicitudes==null) {
                                        toastr.warning('Solicitudes ' + vm.busqueda_status + 's no encontradas', 'Advertencia');
                                    }

                                }else{
                                    toastr.warning('Solicitudes '+vm.busqueda_status+'s no encontradas','Advertencia');
                                    vm.solicitudes = null;
                                }
                            }).catch(function (error) {
                                console.log(error);
                            });
                        }else{
                            Solicitudes.consultaEsp(vm.busqueda_status).then(function (rest) {
                                if(rest.length>0) {
                                    vm.solicitudes = rest;
                                    console.log(vm.solicitudes);
                                    for(var i=0,len = vm.solicitudes.length; i<len;i++)
                                    {
                                        //console.log(vm.solicitudes.length);
                                        //console.log(vm.folio);
                                        if(vm.solicitudes[i].tipo_solicitud=='Envio')
                                        {
                                            vm.sol = vm.solicitudes[i];
                                            vm.sol.fecha_inicio = moment(vm.sol.fecha_inicio).format('DD/MM/YYYY');
                                            vm.sol.fecha_termino = moment(vm.sol.fecha_termino).format('DD/MM/YYYY');
                                            vm.solicitudesArray.push(vm.sol);
                                            console.log(vm.sol);
                                        }
                                    }
                                    vm.solicitudes = null;
                                    vm.solicitudes = vm.solicitudesArray;
                                    vm.solicitudesArray = [];
                                    console.log(vm.solicitudes);
                                }else{
                                    toastr.warning('Solicitudes '+vm.busqueda_status+'s no encontradas','Advertencia');
                                    vm.solicitudes = null;
                                }
                            }).catch(function (error) {
                                console.log(error);
                            });
                        }

                    }
                    break;
                case 'Recoleccion':
                    console.log("entre a Recoleccion");
                    console.log(vm.filtro_busqueda);
                    if(vm.filtro_busqueda == 'Por Folio')
                    {
                        //vm.solicitudesVentas=null;
                        if(!vm.isClient){
                            //Solicitudes_Admin.consultaEsp(vm.requisito).then(function (rest){
                            Solicitudes_Admin.list().then(function (rest){
                                console.log("Soy admin--");
                                vm.solicitudes = rest;
                                console.log(vm.solicitudes);

                                console.log("solicitudes--");
                                for(var i=0,len = vm.solicitudes.length; i<len;i++)
                                {
                                    //console.log(vm.solicitudes.length);
                                    //console.log(vm.folio);
                                    if(vm.solicitudes[i].id==vm.folio && vm.solicitudes[i].tipo_solicitud=='Recoleccion')
                                    {
                                        vm.sol = vm.solicitudes[i];
                                        vm.sol.fecha_inicio = moment(vm.sol.fecha_inicio).format('DD/MM/YYYY');
                                        vm.sol.fecha_termino = moment(vm.sol.fecha_termino).format('DD/MM/YYYY');
                                        vm.sol.fecha_atendida = moment(vm.sol.fecha_atendida).format('DD/MM/YYYY HH:mm');
                                        console.log(vm.sol);
                                    }
                                }
                                if(vm.sol!=null) {
                                    //console.log("si se encontro el folio");
                                    vm.solicitudes = [];
                                    vm.solicitudes.push(vm.sol);
                                }else{
                                    //console.log("no se encontro el folio");
                                    toastr.warning('Folio no encontrado','Advertencia');
                                    vm.solicitudes = null;
                                }
                            }).catch(function(error){
                                console.log(error);
                            })
                        }else {

                            Solicitudes.list().then(function (rest) {
                                console.log("Soy cliente");
                                vm.solicitudes = rest;
                                console.log(vm.solicitudes);

                                console.log("solicitudes--");
                                for(var i=0,len = vm.solicitudes.length; i<len;i++)
                                {
                                    //console.log(vm.solicitudes.length);
                                    //console.log(vm.folio);
                                    if(vm.solicitudes[i].id==vm.folio && vm.solicitudes[i].tipo_solicitud=='Recoleccion')
                                    {
                                        vm.sol = vm.solicitudes[i];
                                        vm.sol.fecha_inicio = moment(vm.sol.fecha_inicio).format('DD/MM/YYYY');
                                        vm.sol.fecha_termino = moment(vm.sol.fecha_termino).format('DD/MM/YYYY');
                                        console.log(vm.sol);
                                    }
                                }
                                if(vm.sol!=null) {
                                    //console.log("si se encontro el folio");
                                    vm.solicitudes = [];
                                    vm.solicitudes.push(vm.sol);
                                }else{
                                    //console.log("no se encontro el folio");
                                    toastr.warning('Folio no encontrado','Advertencia');
                                    vm.solicitudes = null;
                                }
                            }).catch(function (error) {
                                console.log(error);
                            });
                        }


                    }
                    else//vm.filtro_busqueda == 'Por Estatus' Recoleccion
                    {
                        if(!vm.isClient){
                            Solicitudes_Admin.consultaEsp(vm.busqueda_status).then(function (rest) {
                                console.log(rest.length);
                                if(rest.length>0) {
                                    vm.solicitudes = rest;
                                    for(var i=0,len = vm.solicitudes.length; i<len;i++)
                                    {
                                        //console.log(vm.solicitudes.length);
                                        //console.log(vm.folio);
                                        if(vm.solicitudes[i].tipo_solicitud=='Recoleccion')
                                        {
                                            vm.sol = vm.solicitudes[i];
                                            vm.sol.fecha_inicio = moment(vm.sol.fecha_inicio).format('DD/MM/YYYY');
                                            vm.sol.fecha_termino = moment(vm.sol.fecha_termino).format('DD/MM/YYYY');
                                            vm.sol.fecha_atendida = moment(vm.sol.fecha_atendida).format('DD/MM/YYYY HH:mm');
                                            vm.solicitudesArray.push(vm.sol);
                                            console.log(vm.sol);
                                        }
                                    }

                                    vm.solicitudes = null;
                                    vm.solicitudes = vm.solicitudesArray;
                                    vm.solicitudesArray = [];
                                    console.log("vm.solicitudes::");
                                    console.log(vm.solicitudes);
                                    if(vm.solicitudes==null) {
                                        toastr.warning('Solicitudes ' + vm.busqueda_status + 's no encontradas', 'Advertencia');
                                    }
                                }else{
                                    toastr.warning('Solicitudes '+vm.busqueda_status+'s no encontradas','Advertencia');
                                    vm.solicitudes = null;
                                }
                            }).catch(function (error) {
                                console.log(error);
                            });
                        }else{
                            Solicitudes.consultaEsp(vm.busqueda_status).then(function (rest) {
                                if(rest.length>0) {
                                    vm.solicitudes = rest;
                                    console.log(vm.solicitudes);
                                    for(var i=0,len = vm.solicitudes.length; i<len;i++)
                                    {
                                        //console.log(vm.solicitudes.length);
                                        //console.log(vm.folio);
                                        if(vm.solicitudes[i].tipo_solicitud=='Recoleccion')
                                        {
                                            vm.sol = vm.solicitudes[i];
                                            vm.sol.fecha_inicio = moment(vm.sol.fecha_inicio).format('DD/MM/YYYY');
                                            vm.sol.fecha_termino = moment(vm.sol.fecha_termino).format('DD/MM/YYYY');
                                            vm.sol.fecha_atendida = moment(vm.sol.fecha_atendida).format('DD/MM/YYYY HH:mm');
                                            vm.solicitudesArray.push(vm.sol);
                                            console.log(vm.sol);
                                        }
                                    }
                                    vm.solicitudes = null;
                                    vm.solicitudes = vm.solicitudesArray;
                                    vm.solicitudesArray = [];
                                    console.log(vm.solicitudes);
                                }else{
                                    toastr.warning('Solicitudes '+vm.busqueda_status+'s no encontradas','Advertencia');
                                    vm.solicitudes = null;
                                }
                            }).catch(function (error) {
                                console.log(error);
                            });
                        }

                    }
                    break;
                case 'Venta':
                    console.log("solicitudesVentas1");
                    console.log("vm.tipo_solicitud");
                    console.log(vm.tipo_solicitud);

                    if(!vm.isClient) {
                        Solicitud_Servicio_Admin.list().then(function (rest) {
                            vm.solicitudesVentas = rest;
                            console.log("vm.solicitudesVentas = ");
                            console.log(vm.solicitudesVentas);
                            if(rest.length>0) {
                                vm.solicitudesVentas = rest;
                                for(var i=0,len = vm.solicitudesVentas.length; i<len;i++)
                                {

                                        vm.sol = vm.solicitudesVentas[i];
                                        vm.sol.fecha_atencion = moment(vm.sol.fecha_atencion).format('DD/MM/YYYY HH:mm');
                                        vm.solicitudesArray.push(vm.sol);
                                        console.log(vm.sol);
                                }

                                vm.solicitudesVentas = null;
                                vm.solicitudesVentas = vm.solicitudesArray;
                                vm.solicitudesArray = [];
                                console.log("vm.solicitudes::");
                                console.log(vm.solicitudesVentas);
                                if(vm.solicitudesVentas==null) {
                                    toastr.warning('Solicitudes ' + vm.busqueda_status + 's no encontradas', 'Advertencia');
                                }
                            }else{
                                toastr.warning('Solicitudes '+vm.busqueda_status+'s no encontradas','Advertencia');
                                vm.solicitudes = null;
                            }


                        }).catch(function (error) {
                            console.log(error);
                        })
                        console.log("solicitudesVentas2");
                    }else{
                        Solicitud_Servicio.list().then(function (rest) {
                            vm.solicitudesVentas = rest;
                            console.log("vm.solicitudesVentas = ");
                            console.log(vm.solicitudesVentas);
                        }).catch(function (error) {
                            console.log(error);
                        })
                        console.log("solicitudesVentas2");
                    }
                    break;
            }
        }

    }

})();
