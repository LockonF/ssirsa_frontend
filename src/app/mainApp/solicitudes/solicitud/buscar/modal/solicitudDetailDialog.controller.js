/**
 * Created by Luis_Olvera on 19/07/2016.
 */
(function () {
    'use strict';
    angular
        .module('app.mainApp')
        .controller('solicitudDetailDialogController',solicitudDetailDialogController);

    function solicitudDetailDialogController($mdDialog,OPTIONS,event,Persona_Admin,udn,tipoSol,TipoEquipo)
    {
        var vm = this;
        vm.udn=null;
        vm.persona=null;
        vm.tipoSol=tipoSol;
        vm.tipoEquipo=null;
        vm.solicitudData={
            "id": null,
            "udn": null,
            "fecha_inicio": new Date(),
            "fecha_termino": new Date(),
            "fecha_atendida": new Date(),
            "descripcion": null,
            "tipo_solicitud": null,
            "status": null,
            "comentario": null,
            "datos": [
                {
                    "cantidad": null,
                    "status_equipo": null,
                    "tipo_equipo": null
                }
            ],
            "persona": null
        };
        vm.solicitudVentaData={
            "id": null,
            "tipo_servicio": null,
            "cedis": null,
            "no_serie": null,
            "fecha_realizacion": null,
            "fecha_atencion": null,
            "modelo": null,
            "status": null,
            "comentario": null,
            "datos": [],
            "persona": null
        };
        activate();
        function activate() {
            if(tipoSol!='Venta') {
                udn.listObject().then(function (rest) {
                    vm.udns = rest;
                    for (var i = 0, len = vm.udns.length; i < len; i++) {
                        if (vm.udns[i].id == event.udn) {
                            vm.udn = vm.udns[i];
                        }
                    }
                }).catch(function (error) {
                });
                vm.solicitudData= event;
                vm.datos = event.datos;
                TipoEquipo.listWitout().then(function (res){
                    for (var j=0, len1 = vm.datos.length; j < len1; j++) {
                        for (var i = 0, len = res.length; i < len; i++) {
                            if (res[i].id == vm.datos[j].tipo_equipo) {
                                vm.tipoEquipo = res[i].nombre;
                                vm.datos[j].tipo_equipoName=vm.tipoEquipo;

                            }
                        }
                    }
                }).catch(function(res){

                })
            }
            else
            {
                vm.solicitudVentaData.id= event.id;
                vm.solicitudVentaData.tipo_servicio= event.tipo_servicio;
                vm.solicitudVentaData.cedis= event.cedis;
                vm.solicitudVentaData.no_serie= event.no_serie;
                vm.solicitudVentaData.fecha_realizacion= event.fecha_atencion;
                vm.solicitudVentaData.modelo= event.modelo;
            }
            Persona_Admin.listCanonico().then(function(rest){
                vm.personas_admin=rest;
                for (var i = 0, len = vm.personas_admin.length; i < len; i++) {
                    if (vm.personas_admin[i].id == event.persona) {
                        vm.persona = vm.personas_admin[i];
                    }
                }
            }).catch(function(error){
            });
        }

        vm.status=OPTIONS.status_equipment;
        vm.cancel = cancel;
        vm.submit = submit;
        vm.tiposEquipo=null;
        function submit()
        {
            $mdDialog.hide(vm.object);
        }

        function cancel()
        {
            $mdDialog.cancel();
        }
    }
})();