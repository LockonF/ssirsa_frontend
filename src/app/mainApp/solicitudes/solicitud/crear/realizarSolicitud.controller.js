
(function () {
    angular
        .module('app.mainApp.solicitudes')
        .controller('realizarSolicitudController', realizarSolicitudController);

    function realizarSolicitudController(OPTIONS, udn,TipoEquipo,Helper,$mdEditDialog, $mdDialog, Translate,toastr, Solicitudes, Solicitud_Servicio, Solicitudes_Admin, PersonaCapturista, Session,$scope) {
        var vm = this;

        var requisito = {
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
            "persona": null
        };
        var requisitoVenta = {
            "id": null,
            "razon_social": null,
            "nombre_negocio": null,
            "direccion": null,
            "telefono": null,
            "contacto_negocio": null,
            "fecha_atencion": new Date(),
            "udn": null,
            "created_at": new Date(),
            "updated_at": new Date()
        };

        var entrada = {
            "id": null,
            "razon_social": null,
            "nombre_negocio": null,
            "direccion": null,
            "telefono": null,
            "contacto_negocio": null,
            "fecha_atencion": new Date(),
            "udn": null,
            "created_at": new Date(),
            "updated_at": new Date(),
            "file":null
        };

        vm.query = {
            order: 'id',
            limit: 5,
            page: 1
        };
        vm.minDate = moment();
        vm.hideManualUpload = true;
        vm.hideMassiveUpload = false;
        vm.hideRegisteredSolicitud = true;
        vm.hideUnregisteredSolicitud = true;
        vm.udn = null;
        vm.tipo_solicitud=null;
        vm.persona = null;
        vm.types_request = OPTIONS.type_request;
        vm.status = OPTIONS.status;
        vm.status_equipment=OPTIONS.status_equipment;
        vm.udns = null;
        vm.personas = null;
        vm.isClient = true;
        vm.requisitoVenta = angular.copy(requisitoVenta);
        vm.entrada = angular.copy(entrada);
        vm.requisito = angular.copy(requisito);
        vm.showCreateDialog = showCreateDialog;
        vm.cancel = cancel;
        vm.eliminar = eliminar;
        vm.edit=edit;
        vm.guardarSolicitudAdmin = guardarSolicitudAdmin;
        vm.guardarSolicitudVenta = guardarSolicitudVenta;
        vm.guardarSolicitudCliente = guardarSolicitudCliente;
        vm.showMassiveUpload = showMassiveUpload;
        vm.showManualUpload = showManualUpload;
        vm.selectionFile = selectionFile;
        vm.guardar=guardar;
        vm.search=search;
        vm.selectedItemChange=selectedItemChange;
        vm.isValid=false;
        vm.udnObject=null;
        vm.filterUDNs= null;
        vm.searchText = "";
        vm.isValid=false;
        activate();
        function activate() {
            vm.successTitle = Translate.translate('MAIN.MSG.SUCCESS_TITLE');
            vm.errorTitle = Translate.translate('MAIN.MSG.ERROR_TITLE');
            vm.successCreateMessage = Translate.translate('MAIN.MSG.GENERIC_SUCCESS_CREATE');
            vm.sucessMassive=Translate.translate('INPUT.Messages.SuccessMassive');
            vm.errorMassive=Translate.translate('INPUT.Messages.ErrorMassive');
            vm.errorMessage = Translate.translate('MAIN.MSG.ERROR_MESSAGE');
            vm.errorDuplicado = Translate.translate('CREATE_REQUEST.FORM.ERROR.ERRORDUPLICADO');
            vm.erroNumSolConf = Translate.translate('CREATE_REQUEST.FORM.ERROR.ERRORNUMSOLCONF');
            udn.listObject().then(function (res) {
                vm.udns=Helper.filterDeleted(res,true);
                vm.udns=_.sortBy(vm.udns, 'agencia');
                vm.filterUDNs= angular.copy(vm.udns);
            });
            vm.personas = PersonaCapturista.list();
            TipoEquipo.listWitout().then(function (res) {
                vm.tiposEquipo=Helper.filterDeleted(res,true);
                vm.tiposEquipo=_.sortBy(vm.tiposEquipo, 'nombre');
            });
            vm.isClient = Session.userRole === 'Cliente';
            vm.requisitoVenta.fecha_atencion=moment();
        }

        function showMassiveUpload() {
            vm.hideManualUpload = true;
            vm.hideMassiveUpload = false;
        }

        function showManualUpload() {
            vm.hideManualUpload = false;
            vm.hideMassiveUpload = true;
            vm.hideRegisteredSolicitud=true;
        }

        function selectionFile($file) {
            vm.entrada.file = $file;
        }

        function guardar() {
            var fd = new FormData();
            //Is massive upload
            if (vm.entrada.file != null) {
                vm.udn=vm.udnObject.id;
                fd.append('file', vm.entrada.file);
                fd.append('udn', vm.udn);
                Solicitud_Servicio.postEntradaMasiva(fd).then(function (res) {
                    vm.entrada = res;
                    vm.hideRegisteredSolicitud = false;
                    vm.hideUnregisteredSolicitud = true;
                    toastr.success(vm.sucessMassive, vm.successTitle);
                }).catch(function (err) {
                    toastr.error(vm.errorMassive, vm.errorTitle);
                });
            }
            else {
                Solicitud_Servicio.postEntrada(fd).then(function (res) {

                }).catch(function (err) {

                });
            }

        }

        function showCreateDialog(event) {
            var config = {
                controller: 'solicitudDataDialogController',
                controllerAs: 'vm',
                bindToController: true,
                templateUrl: 'app/mainApp/solicitudes/solicitud/crear/modal/solicitudDataDialog.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose: true,
                fullscreen: false
            };
            $mdDialog.show(config).then(function (object) {
                console.log(object);
                console.log(vm.requisito.datos);
                 var show = _.findWhere(vm.requisito.datos, {status_equipo: object.status_equipo, tipo_equipo:object.tipo_equipo});
                if(show==undefined){
                    vm.requisito.datos.push(object);
                }
                else{
                    toastr.warning(vm.errorDuplicado,'Error');
                }

            }
            );
        }


        function eliminar(dato) {
            var resultado = _.indexOf(vm.requisito.datos, dato);
            if (resultado != -1) {
                vm.requisito.datos.splice(resultado, 1);
            }
        }

        function cancel() {
            vm.requisitoVenta = angular.copy(requisitoVenta);
            vm.requisito = angular.copy(requisito);
            vm.tipo_solicitud = null;
            $scope.solicitudForm.$setPristine();
            $scope.solicitudForm.$setUntouched();
            vm.udn = null;
            vm.persona = null;
            vm.isClient = Session.userRole === 'Cliente';
            vm.requisitoVenta.fecha_atencion=moment();
            vm.entrada = angular.copy(entrada);
            vm.udnObject=null;
            vm.searchText=null;
        }

        function guardarSolicitudAdmin() {
            vm.udn=vm.udnObject.id;
            vm.requisito.fecha_inicio = moment(vm.requisito.fecha_inicio).format('YYYY-MM-DD');
            vm.requisito.fecha_termino = moment(vm.requisito.fecha_termino).format('YYYY-MM-DD');
            vm.requisito.fecha_atendida = moment(vm.requisito.fecha_atendida).format('YYYY-MM-DD HH:mm');
            console.log(vm.requisito.fecha_atendida);
            vm.requisito.udn = vm.udn;
            vm.requisito.persona = vm.persona;
            vm.requisito.tipo_solicitud=OPTIONS.type_request[vm.tipo_solicitud].value_id;
            Solicitudes_Admin.create(vm.requisito).then(function () {
                var notification = {
                    id_solicitud: 1,
                    type_notification: vm.requisito.tipo_solicitud,
                    updated_at: moment().toDate()
                };
                /*Socket.emit('new:msg', {
                    canal: 'Administrador',
                    username: Session.userInformation.id,
                    solicitud: vm.requisito,
                    name: Session.userInformation.nombre,
                    notification: notification,
                    type: "normal"
                });*/
                cancel();
                toastr.success(vm.successCreateMessage, vm.successTitle);
            }).catch(function (err) {
                if(err.status==400 && err.data.message=="Solo se pueden tener 4 solicitudes por día")
                {
                    toastr.error(vm.erroNumSolConf,vm.errorTitle);
                }else {
                    toastr.error(vm.errorMessage, vm.errorTitle);
                }
            })
        }

        function guardarSolicitudCliente() {
            vm.udn=vm.udnObject.id;
            vm.requisito.fecha_inicio = moment(vm.requisito.fecha_inicio).format('YYYY-MM-DD');
            vm.requisito.fecha_termino = moment(vm.requisito.fecha_termino).add(1,'days').format('YYYY-MM-DD');
            vm.requisito.udn = vm.udn;
            delete  vm.requisito.persona;
            vm.requisito.tipo_solicitud=OPTIONS.type_request[vm.tipo_solicitud].value_id;
            Solicitudes.create(vm.requisito).then(function () {
                cancel();
                toastr.success(vm.successCreateMessage, vm.successTitle);
            }).catch(function (res)  {
                toastr.error(vm.errorMessage, vm.errorTitle);
            })
        }
        function edit(event,object,field) {
            var config =
            {
                modelValue: object[field],
                placeholder: 'Edita el campo',
                save: function (input) {
                    object[field] = input.$modelValue;
                },
                targetEvent: event,
                type:'number'
            };
            $mdEditDialog.small(config).then(function(ctrl){
            }).catch(function(err){
            });
        }
        function guardarSolicitudVenta() {
            vm.udn=vm.udnObject.id;
            vm.requisitoVenta.fecha_atencion = moment(vm.requisitoVenta.fecha_atencion).format('YYYY-MM-DD');
            vm.requisitoVenta.created_at = moment(vm.requisitoVenta.created_at).format('YYYY-MM-DD');
            vm.requisitoVenta.updated_at = moment(vm.requisitoVenta.updated_at).format('YYYY-MM-DD');
            vm.requisitoVenta.udn = vm.udn;
            Solicitud_Servicio.create(vm.requisitoVenta).then(function () {
                var notification = {
                    id_solicitud: 1,
                    type_notification: "Venta",
                    updated_at: moment().toDate()
                };
                /*Socket.emit('new:msg', {
                    canal: 'Administrador',
                    username: Session.userInformation.id,
                    name: Session.userInformation.nombre,
                    solicitud: vm.requisitoVenta,
                    notification: notification,
                    type: "normal"
                });*/

                cancel();

                toastr.success(vm.successCreateMessage, vm.successTitle);
            }).catch(function (res) {
                toastr.error(vm.errorMessage, vm.errorTitle);
            });
        }

        function search(text) {
            if(!angular.isUndefined(text)) {
                vm.filterUDNs = _.filter(vm.udns, function (item) {
                    return item.agencia.toLowerCase().startsWith(text.toLowerCase()) || item.zona.toLowerCase().startsWith(text.toLowerCase());
                });
                vm.isValid = !((vm.udns.length == 0 && text.length > 0) || (text.length > 0 && !angular.isObject(vm.udnObject)));
                return vm.filterUDNs;
            }
        }

        function selectedItemChange(item) {
            vm.isValid =angular.isObject(item);
        }

    }

})();
