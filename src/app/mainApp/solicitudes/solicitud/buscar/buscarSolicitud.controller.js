/**
 * Created by Luis_Olvera on 15/06/2016.
 */
(function () {
    angular
        .module('app.mainApp.solicitudes')
        .controller('buscarSolicitudController', buscarSolicitudController);

    function buscarSolicitudController(Translate, $mdEditDialog, Solicitudes, Solicitudes_Admin, udn, Persona, ModeloCabinet, Solicitud_Servicio, Solicitud_Servicio_Admin, Session, OPTIONS, toastr, $mdDialog) {
        var vm = this;
        vm.flag = 0;
        vm.query = {
            order: 'id',
            limit: 5,
            page: 1
        };
        vm.minDate = new Date();
        vm.filtrarSolicitud = OPTIONS.filtrarSolicitud;
        vm.tipoSols = OPTIONS.tipoSolicitud;
        vm.estatusSols = OPTIONS.estatusSol;
        vm.id = null;
        vm.FechaFin = new Date();
        vm.tipo_solicitud = null;
        vm.filtro_busqueda = null;
        vm.busqueda_status = null;
        vm.folio = null;
        vm.sol = null;
        vm.solicitudesVentasAux=null;
        vm.solicitudesArray = [];
        vm.requisito = {
            "id": null,
            "udn": null,
            "fecha_inicio": new Date(),
            "fecha_termino": new Date(),
            "fecha_atendida": new Date(),
            "descripcion": null,
            "tipo_solicitud": null,
            "status": null,
            "comentario": null,
            "datos": [],
            "modelo_cabinet": null
        };

        vm.remove = remove;
        vm.removeVenta = removeVenta;
        vm.removeCliente = removeCliente;
        vm.removeVentaCliente = removeVentaCliente;
        vm.buscarSolicitudes = buscarSolicitudes;
        vm.busqueda = busqueda;
        vm.borrarSolicitudVenta = borrarSolicitudVenta;
        vm.borrarSolicitud = borrarSolicitud;
        vm.edit = edit;
        vm.editVenta = editVenta;
        vm.editVentaTel=editVentaTel;
        vm.editSelect = editSelect;
        vm.editSelectVenta=editSelectVenta;
        vm.editCalendar = editCalendar;
        vm.editVentaCalendar = editVentaCalendar;
        vm.showCreateDialog=showCreateDialog;


        vm.Requisitos = [];
        vm.solicitudes = null;
        vm.solicitudesVentas = null;
        vm.isClient = true;
        activate();
        init();
        function init() {
            vm.successTitle = Translate.translate('MAIN.MSG.SUCCESS_TITLE');
            vm.errorTitle = Translate.translate('MAIN.MSG.ERROR_TITLE');
            vm.successCreateMessage = Translate.translate('MAIN.MSG.GENERIC_SUCCESS_CREATE');
            vm.errorMessage = Translate.translate('MAIN.MSG.ERROR_MESSAGE');
            vm.successUpdateMessage = Translate.translate('MAIN.MSG.GENERIC_SUCCESS_UPDATE');
            vm.successDeleteMessage = Translate.translate('MAIN.MSG.GENERIC_SUCCESS_DELETE');
            vm.deleteButton=Translate.translate('MAIN.BUTTONS.DELETE');
            vm.cancelButton=Translate.translate('MAIN.BUTTONS.CANCEL');
            vm.dialogTitle=Translate.translate('MAIN.DIALOG.DELETE_TITLE');
            vm.dialogMessage=Translate.translate('MAIN.DIALOG.DELETE_MESSAGE');
            vm.PatternMessage=Translate.translate('SEARCH_REQUEST.FORM.LABEL.PATTERNMESSAGE');
            vm.notFound=Translate.translate('SEARCH_REQUEST.FORM.LABEL.NOFOUND');
        }

        function activate() {
            vm.udns = udn.list();

            vm.tiposEquipo = ModeloCabinet.list();
            vm.isClient = Session.userRole == 'Cliente';

        }


        function edit(event, object, field) {
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

            function updateObject(obj) {
                obj.fecha_inicio = moment(obj.fecha_inicio).format('YYYY-MM-DD');
                obj.fecha_termino = moment(obj.fecha_termino).format('YYYY-MM-DD');
                obj.fecha_atendida = moment(obj.fecha_atendida).toISOString();
                if(vm.isClient)
                {
                    Solicitudes.modify(obj).then(function () {
                        toastr.success(vm.successUpdateMessage, vm.successTitle);
                    }).catch(function (res) {
                        toastr.error(vm.errorMessage, vm.errorTitle);
                    })
                }else{
                    Solicitudes_Admin.updateSolicitud(obj).then(function () {
                        toastr.success(vm.successUpdateMessage, vm.successTitle);
                    }).catch(function (res) {
                        toastr.error(vm.errorMessage, vm.errorTitle);
                    })
                }
            }

            $mdEditDialog.small(config).then(function (ctrl) {
            }).catch(function (err) {
                toastr.warning(vm.errorMessage, vm.errorTitle);
            });
        }

        function showCreateDialog(event,object) {
            var config = {
                controller: 'solicitudDetailDialogController',
                controllerAs: 'vm',
                bindToController: true,
                templateUrl: 'app/mainApp/solicitudes/solicitud/buscar/modal/solicitudDetailDialog.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose: true,
                fullscreen: false,
                locals: {
                    event: object,
                    tipoSol: vm.tipo_solicitud,
                    edit: true
                }
            };
            $mdDialog.show(config).then(function (object) {
                    vm.requisito.datos.push(object);
                }
            );
        }

        function editCalendar(obj) {
            var obj2=angular.copy(obj);
            obj2.fecha_inicio = moment(obj.fecha_inicio).format('YYYY-MM-DD');
            obj2.fecha_termino = moment(obj.fecha_termino).format('YYYY-MM-DD');
            obj2.fecha_atendida = moment(obj.fecha_atendida).toISOString();
            Solicitudes_Admin.updateSolicitud(obj2).then(function () {
                toastr.success(vm.successUpdateMessage, vm.successTitle);
            }).catch(function (res) {
                toastr.error(vm.errorMessage, vm.errorTitle);
            })
        }

        function editSelect(obj) {
            obj.fecha_inicio = moment(obj.fecha_inicio).format('YYYY-MM-DD');
            obj.fecha_termino = moment(obj.fecha_termino).format('YYYY-MM-DD');
            obj.fecha_atendida = moment(obj.fecha_atendida).toISOString();
            Solicitudes_Admin.updateSolicitud(obj).then(function () {
                toastr.success(vm.successUpdateMessage, vm.successTitle);
            }).catch(function (res) {
                toastr.error(vm.errorMessage, vm.errorTitle);
            })
        }

        function editSelectVenta(obj) {
            Solicitud_Servicio_Admin.updateSolicitud(obj).then(function () {
                toastr.success(vm.successUpdateMessage, vm.successTitle);
            }).catch(function (res) {
                toastr.error(vm.errorMessage, vm.errorTitle);
            })
        }

        function borrarSolicitudVenta(id) {
            Solicitud_Servicio_Admin.borrarSol(id).then(function (resp) {
                vm.busqueda();
            }).catch(function (err) {
                toastr.warning(vm.errorMessage, vm.errorTitle);
            })

            busqueda();
        }

        function borrarSolicitud(id) {
            Solicitudes_Admin.borrarSol(id).then(function (resp) {
                vm.busqueda();
            }).catch(function (err) {
                toastr.warning(vm.errorMessage, vm.errorTitle);
            })

            busqueda();
        }

        function editVenta(event, object, field) {
            if(!vm.isClient) {
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
                        'pattern': "^[A-Za-z_ 0-9áéíóúÁÉÍÓÚñN#\.]*$",
                        'md-maxlength': 30,
                        'oninvalid': "setCustomValidity(Favor de introducir solo caracteres validos)",
                        'onchange': "try{setCustomValidity('')}catch(e){}"
                    }
                };

                function updateObject(obj) {
                    Solicitud_Servicio_Admin.updateSolicitud(obj).then(function () {
                        toastr.success(vm.successUpdateMessage, vm.successTitle);
                    }).catch(function (res) {
                        toastr.error(vm.errorMessage, vm.errorTitle);
                    })
                }

                $mdEditDialog.small(config).then(function (ctrl) {
                }).catch(function (err) {
                    toastr.warning(vm.errorMessage, vm.errorTitle);
                });
            }
        }

        function editVentaTel(event, object, field) {
            if(!vm.isClient) {
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
                        'pattern': "^[A-Za-z_ 0-9áéíóúÁÉÍÓÚñN#\.]*$",
                        'md-maxlength': 30,
                        'oninvalid': "setCustomValidity(Favor de introducir solo caracteres validos)",
                        'onchange': "try{setCustomValidity('')}catch(e){}",
                        'only-digits': "true"
                    }
                };

                function updateObject(obj) {
                    Solicitud_Servicio_Admin.updateSolicitud(obj).then(function () {
                        toastr.success(vm.successUpdateMessage, vm.successTitle);
                    }).catch(function (res) {
                        toastr.error(vm.errorMessage, vm.errorTitle);
                    })
                }

                $mdEditDialog.small(config).then(function (ctrl) {
                }).catch(function (err) {
                    toastr.warning(vm.errorMessage, vm.errorTitle);
                });
            }
        }

        function editVentaCalendar(obj) {
            obj.fecha_atencion = moment(obj.fecha_atencion).format('DD/MM/YYYY HH:mm');
            Solicitud_Servicio_Admin.updateSolicitud(obj).then(function () {
                toastr.success(vm.successUpdateMessage, vm.successTitle);
            }).catch(function (res) {
                toastr.error(vm.errorMessage, vm.errorTitle);
            })
        }

        function removeVenta(ev, id) {
            var confirm = $mdDialog.confirm()
                .title(vm.dialogTitle)
                .textContent(vm.dialogMessage)
                .ariaLabel('Confirmar eliminación')
                .ok(vm.deleteButton)
                .cancel(vm.cancelButton);
            $mdDialog.show(confirm).then(function () {
                Solicitud_Servicio_Admin.borrarSolVenta(id).then(function (resp) {
                    vm.busqueda();
                    toastr.success(vm.successDeleteMessage, vm.successTitle);
                }).catch(function (err) {
                    toastr.warning(vm.errorMessage, vm.errorTitle);
                })
            }, function () {

            });

        }

        function remove(ev, id) {
            var confirm = $mdDialog.confirm()
                .title(vm.dialogTitle)
                .textContent(vm.dialogMessage)
                .ariaLabel('Confirmar eliminación')
                .ok(vm.deleteButton)
                .cancel(vm.cancelButton);
            $mdDialog.show(confirm).then(function () {
                Solicitudes_Admin.borrarSol(id).then(function (resp) {
                    vm.busqueda();
                    toastr.success(vm.successDeleteMessage, vm.successTitle);
                }).catch(function (err) {
                    toastr.warning(vm.errorMessage, vm.errorTitle);
                })
            }, function () {

            });

        }

        function removeVentaCliente(ev, id) {
            var confirm = $mdDialog.confirm()
                .title(vm.dialogTitle)
                .textContent(vm.dialogMessage)
                .ariaLabel('Confirmar eliminación')
                .ok(vm.deleteButton)
                .cancel(vm.cancelButton);
            $mdDialog.show(confirm).then(function () {
                Solicitud_Servicio.borrarSolVenta(id).then(function (resp) {
                    vm.busqueda();
                    toastr.success(vm.successDeleteMessage, vm.successTitle);
                }).catch(function (err) {
                    toastr.warning(vm.errorMessage, vm.errorTitle);
                })
            }, function () {

            });

        }

        function removeCliente(ev, id) {
            var confirm = $mdDialog.confirm()
                .title(vm.dialogTitle)
                .textContent(vm.dialogMessage)
                .ariaLabel('Confirmar eliminación')
                .ok(vm.deleteButton)
                .cancel(vm.cancelButton);
            $mdDialog.show(confirm).then(function () {
                Solicitudes.borrarSol(id).then(function (resp) {
                    vm.busqueda();
                    toastr.success(vm.successDeleteMessage, vm.successTitle);
                }).catch(function (err) {
                    toastr.warning(vm.errorMessage, vm.errorTitle);
                })
            }, function () {

            });

        }

        function buscarSolicitudes() {
            if (!vm.isClient) {
                Solicitudes_Admin.list().then(function (rest) {
                    vm.solicitudes = rest;
                }).catch(function (error) {
                    toastr.warning(vm.errorMessage, vm.errorTitle);
                })
            } else {

                Solicitudes.list().then(function (rest) {
                    vm.solicitudes = rest;
                }).catch(function (error) {
                    toastr.warning(vm.errorMessage, vm.errorTitle);
                });
            }
        }

        function busqueda() {
            if (vm.filtro_busqueda == 'Todas') {
                vm.busqueda_status = null;
            }
            vm.solicitudes = null;
            vm.solicitudesVentas=null;
            vm.sol = null;
            vm.solicitudesArray = [];
            switch (vm.tipo_solicitud) {
                case 'Envio':
                    if (vm.filtro_busqueda == 'Por Folio') {
                        if (!vm.isClient) {
                            Solicitudes_Admin.list().then(function (rest) {
                                vm.solicitudes = rest;
                                for (var i = 0, len = vm.solicitudes.length; i < len; i++) {
                                    if (vm.solicitudes[i].id == vm.folio && vm.solicitudes[i].tipo_solicitud == 'Envio') {
                                        vm.sol = vm.solicitudes[i];
                                        vm.sol.fecha_inicio = moment(vm.sol.fecha_inicio).format('DD/MM/YYYY');
                                        vm.sol.fecha_termino = moment(vm.sol.fecha_termino).format('DD/MM/YYYY');
                                        vm.sol.fecha_atendida = moment(vm.sol.fecha_atendida).format('DD/MM/YYYY HH:mm');
                                    }
                                }
                                if (vm.sol != null) {
                                    vm.solicitudes = [];
                                    vm.solicitudes.push(vm.sol);
                                } else {
                                    toastr.warning(vm.notFound, 'Advertencia');
                                    vm.solicitudes = null;
                                }
                            }).catch(function (error) {
                                toastr.warning(vm.errorMessage, vm.errorTitle);
                                vm.solicitudes = null;
                            })
                        } else {

                            Solicitudes.list().then(function (rest) {
                                vm.solicitudes = rest;
                                for (var i = 0, len = vm.solicitudes.length; i < len; i++) {
                                    if (vm.solicitudes[i].id == vm.folio && vm.solicitudes[i].tipo_solicitud == 'Envio') {
                                        vm.sol = vm.solicitudes[i];
                                        vm.sol.fecha_inicio = moment(vm.sol.fecha_inicio).format('DD/MM/YYYY');
                                        vm.sol.fecha_termino = moment(vm.sol.fecha_termino).format('DD/MM/YYYY');
                                    }
                                }
                                if (vm.sol != null) {
                                    vm.solicitudes = [];
                                    vm.solicitudes.push(vm.sol);
                                } else {
                                    toastr.warning(vm.notFound, 'Advertencia');
                                    vm.solicitudes = null;
                                }
                            }).catch(function (error) {
                                toastr.warning(vm.errorMessage, vm.errorTitle);
                                vm.solicitudes = null;
                            });
                        }


                    }
                    else {
                        if (!vm.isClient) {
                            Solicitudes_Admin.consultaEsp(vm.busqueda_status).then(function (rest) {
                                if (rest.length > 0) {
                                    vm.solicitudes = rest;
                                    for (var i = 0, len = vm.solicitudes.length; i < len; i++) {
                                        if (vm.solicitudes[i].tipo_solicitud == 'Envio') {
                                            vm.sol = vm.solicitudes[i];
                                            vm.sol.fecha_inicio = moment(vm.sol.fecha_inicio).format('DD/MM/YYYY');
                                            vm.sol.fecha_termino = moment(vm.sol.fecha_termino).format('DD/MM/YYYY');
                                            vm.sol.fecha_atendida = moment(vm.sol.fecha_atendida).format('DD/MM/YYYY HH:mm');
                                            vm.solicitudesArray.push(vm.sol);
                                        }
                                    }
                                    vm.solicitudes = null;
                                    vm.solicitudes = vm.solicitudesArray;
                                    vm.solicitudesArray = [];
                                    if (vm.solicitudes == null) {
                                        toastr.warning(vm.notFound, 'Advertencia');
                                    }

                                } else {
                                    toastr.warning(vm.notFound, 'Advertencia');
                                    vm.solicitudes = null;
                                }
                            }).catch(function (error) {
                                toastr.warning(vm.errorMessage, vm.errorTitle);
                                vm.solicitudes = null;
                            });
                        } else {
                            Solicitudes.consultaEsp(vm.busqueda_status).then(function (rest) {
                                if (rest.length > 0) {
                                    vm.solicitudes = rest;
                                    for (var i = 0, len = vm.solicitudes.length; i < len; i++) {
                                        if (vm.solicitudes[i].tipo_solicitud == 'Envio') {
                                            vm.sol = vm.solicitudes[i];
                                            vm.sol.fecha_inicio = moment(vm.sol.fecha_inicio).format('DD/MM/YYYY');
                                            vm.sol.fecha_termino = moment(vm.sol.fecha_termino).format('DD/MM/YYYY');
                                            vm.solicitudesArray.push(vm.sol);
                                        }
                                    }
                                    vm.solicitudes = null;
                                    vm.solicitudes = vm.solicitudesArray;
                                    vm.solicitudesArray = [];
                                } else {
                                    toastr.warning(vm.notFound, 'Advertencia');
                                    vm.solicitudes = null;
                                }
                            }).catch(function (error) {
                                toastr.warning(vm.errorMessage, vm.errorTitle);
                                vm.solicitudes = null;
                            });
                        }

                    }
                    break;
                case 'Recoleccion':
                    if (vm.filtro_busqueda == 'Por Folio') {
                        if (!vm.isClient) {
                            Solicitudes_Admin.list().then(function (rest) {
                                vm.solicitudes = rest;
                                if(vm.solicitudes.length<=0){
                                    toastr.warning(vm.notFound, 'Advertencia');
                                    vm.solicitudes=null;
                                }else {

                                    for (var i = 0, len = vm.solicitudes.length; i < len; i++) {
                                        if (vm.solicitudes[i].id == vm.folio && vm.solicitudes[i].tipo_solicitud == 'Recoleccion') {
                                            vm.sol = vm.solicitudes[i];
                                            vm.sol.fecha_inicio = moment(vm.sol.fecha_inicio).format('DD/MM/YYYY');
                                            vm.sol.fecha_termino = moment(vm.sol.fecha_termino).format('DD/MM/YYYY');
                                            vm.sol.fecha_atendida = moment(vm.sol.fecha_atendida).format('DD/MM/YYYY HH:mm');
                                        }
                                    }
                                    if (vm.sol != null) {
                                        vm.solicitudes = [];
                                        vm.solicitudes.push(vm.sol);
                                    } else {
                                        toastr.warning(vm.notFound, 'Advertencia');
                                        vm.solicitudes = null;
                                    }
                                }
                            }).catch(function (error) {
                                toastr.warning(vm.errorMessage, vm.errorTitle);
                                vm.solicitudes = null;
                            })
                        } else {

                            Solicitudes.list().then(function (rest) {
                                vm.solicitudes = rest;
                                if(vm.solicitudes.length<=0){
                                    toastr.warning(vm.notFound, 'Advertencia');
                                    vm.solicitudes=null;
                                }else {
                                    for (var i = 0, len = vm.solicitudes.length; i < len; i++) {
                                        if (vm.solicitudes[i].id == vm.folio && vm.solicitudes[i].tipo_solicitud == 'Recoleccion') {
                                            vm.sol = vm.solicitudes[i];
                                            vm.sol.fecha_inicio = moment(vm.sol.fecha_inicio).format('DD/MM/YYYY');
                                            vm.sol.fecha_termino = moment(vm.sol.fecha_termino).format('DD/MM/YYYY');
                                        }
                                    }
                                    if (vm.sol != null) {
                                        vm.solicitudes = [];
                                        vm.solicitudes.push(vm.sol);
                                    } else {
                                        toastr.warning(vm.notFound, 'Advertencia');
                                        vm.solicitudes = null;
                                    }
                                }
                            }).catch(function (error) {
                                toastr.warning(vm.errorMessage, vm.errorTitle);
                                vm.solicitudes = null;
                            });
                        }


                    }
                    else {
                        if (!vm.isClient) {
                            Solicitudes_Admin.consultaEsp(vm.busqueda_status).then(function (rest) {
                                if (rest.length > 0) {
                                    vm.solicitudes = rest;
                                    for (var i = 0, len = vm.solicitudes.length; i < len; i++) {
                                        if (vm.solicitudes[i].tipo_solicitud == 'Recoleccion') {
                                            vm.sol = vm.solicitudes[i];
                                            vm.sol.fecha_inicio = moment(vm.sol.fecha_inicio).format('DD/MM/YYYY');
                                            vm.sol.fecha_termino = moment(vm.sol.fecha_termino).format('DD/MM/YYYY');
                                            vm.sol.fecha_atendida = moment(vm.sol.fecha_atendida).format('DD/MM/YYYY HH:mm');
                                            vm.solicitudesArray.push(vm.sol);
                                        }
                                    }

                                    vm.solicitudes = null;
                                    vm.solicitudes = vm.solicitudesArray;
                                    vm.solicitudesArray = [];
                                    if(vm.solicitudes.length<=0){
                                        vm.solicitudes=null;
                                    }
                                    if (vm.solicitudes == null) {
                                        toastr.warning(vm.notFound, 'Advertencia');
                                    }
                                } else {
                                    toastr.warning(vm.notFound, 'Advertencia');
                                    vm.solicitudes = null;
                                }
                            }).catch(function (error) {
                                toastr.warning(vm.errorMessage, vm.errorTitle);
                                vm.solicitudes = null;
                            });
                        } else {
                            Solicitudes.consultaEsp(vm.busqueda_status).then(function (rest) {
                                if (rest.length > 0) {
                                    vm.solicitudes = rest;
                                    for (var i = 0, len = vm.solicitudes.length; i < len; i++) {
                                        if (vm.solicitudes[i].tipo_solicitud == 'Recoleccion') {
                                            vm.sol = vm.solicitudes[i];
                                            vm.sol.fecha_inicio = moment(vm.sol.fecha_inicio).format('DD/MM/YYYY');
                                            vm.sol.fecha_termino = moment(vm.sol.fecha_termino).format('DD/MM/YYYY');
                                            vm.sol.fecha_atendida = moment(vm.sol.fecha_atendida).format('DD/MM/YYYY HH:mm');
                                            vm.solicitudesArray.push(vm.sol);
                                        }
                                    }
                                    vm.solicitudes = null;
                                    vm.solicitudes = vm.solicitudesArray;
                                    vm.solicitudesArray = [];
                                } else {
                                    toastr.warning(vm.notFound, 'Advertencia');
                                    vm.solicitudes = null;
                                }
                            }).catch(function (error) {
                                toastr.warning(vm.errorMessage, vm.errorTitle);
                                vm.solicitudes = null;
                            });
                        }

                    }
                    break;
                case 'Venta':
                    if (!vm.isClient) {
                        Solicitud_Servicio_Admin.list().then(function (rest) {
                            vm.solicitudesVentas = rest;
                            if (rest.length > 0) {
                                vm.solicitudesVentas = rest;
                                for (var i = 0, len = vm.solicitudesVentas.length; i < len; i++) {

                                    vm.sol = vm.solicitudesVentas[i];
                                    vm.sol.fecha_atencion = moment(vm.sol.fecha_atencion).format('DD/MM/YYYY HH:mm');
                                    vm.solicitudesArray.push(vm.sol);
                                }

                                vm.solicitudesVentas = null;
                                vm.solicitudesVentas = vm.solicitudesArray;
                                vm.solicitudesArray = [];
                                if (vm.solicitudesVentas == null) {
                                    toastr.warning(vm.notFound, 'Advertencia');
                                }
                            } else {
                                toastr.warning(vm.notFound, 'Advertencia');
                                vm.solicitudes = null;
                                vm.solicitudesVentas=null;
                            }


                        }).catch(function (error) {
                            toastr.warning(vm.errorMessage, vm.errorTitle);
                            vm.solicitudesVentas=null;
                        })
                    } else {
                        Solicitud_Servicio.list().then(function (rest) {
                            vm.solicitudesVentas = rest;
                            if(vm.solicitudesVentas.length<=0){
                                toastr.warning(vm.notFound, 'Advertencia');
                                vm.solicitudesVentas=null;
                            }

                        }).catch(function (error) {
                            toastr.warning(vm.errorMessage, vm.errorTitle);
                            vm.solicitudesVentas=null;
                        })
                    }
                    break;
            }
        }

    }

})();
