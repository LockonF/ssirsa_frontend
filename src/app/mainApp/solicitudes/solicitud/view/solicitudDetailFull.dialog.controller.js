(function () {
    'use strict';
    angular
        .module('app.mainApp')
        .controller('solicitudFullDetailDialogController', solicitudFullDetailDialogController);

    function solicitudFullDetailDialogController($mdDialog, Solicitudes_Admin, solicitud, Persona_Admin, udn, TipoEquipo, type) {
        var vm = this;
        vm.tipoSol = type;
        vm.cancel = cancel;
        vm.udn = null;
        vm.persona = null;
        vm.solicitud = null;
        vm.datos = [];
        activate();
        function activate() {
            vm.tipos = TipoEquipo.list();
            vm.personas = Persona_Admin.list();
            Solicitudes_Admin.getOne(solicitud).then(function (res) {
                vm.solicitud = res;
                initInfo(vm.solicitud);
            });
        }

        function initInfo(solicitud) {
            udn.getOne(solicitud.udn).then(function (res) {
                vm.udn = res;
                vm.datos = _.each(solicitud.datos, function (element, index) {
                    var tipo = searchTipo(element.tipo_equipo);
                    if (tipo != null) {
                        _.extend(element, {tipo_equipo: tipo.nombre});
                    } else {
                        _.extend(element, {tipo_equipo: "No tiene"});
                    }
                });
                vm.persona = _.findWhere(vm.personas, {id: solicitud.persona});
                vm.fecha=moment(solicitud.created_at).format('DD/MM/YYYY hh:mm:ss');
            });
        }

        function searchTipo(id) {
            return _.findWhere(vm.tipos, {id: id});
        }


        function cancel() {
            $mdDialog.cancel();
        }
    }
})();
