(function () {
    angular
        .module('app')
        .constant('AUTH_EVENTS', {
            loginSuccess: 'auth-login-success',
            loginFailed: 'auth-login-failed',
            logoutSuccess: 'auth-logout-success',
            sessionTimeout: 'auth-session-timeout',
            notAuthenticated: 'auth-not-authenticated',
            notAuthorized: 'auth-not-authorized',
            sessionRestore: 'auth-session-restored'
        })
        .constant('OPTIONS', {
            status: [
                {
                    id: 0,
                    value: "No Confirmada"
                },
                {
                    id: 1,
                    value: "Confirmada"
                },
                {
                    id: 2,
                    value: "Cancelada"
                },
                {
                    id: 3,
                    value: "Cerrada"
                }
            ],
            type_request:[
                {
                    id: 0,
                    value: "Solicitud de envío",
                    value_id: "Envio"
                },
                {
                    id: 1,
                    value: "Solicitud de recolección",
                    value_id: "Recoleccion"
                },
                {
                    id: 2,
                    value: "Solicitud de punto de venta"
                }
            ],
            status_equipment:[
                {
                    id: 0,
                    value: "Nuevo"
                },
                {
                    id: 1,
                    value: "Reparado"
                }
            ],
            tipoSolicitud: [
                {
                    id: 0,
                    value: "Envio"
                },
                {
                    id: 1,
                    value: "Recoleccion"
                },
                {
                    id: 2,
                    value: "Venta"
                },
                {
                    id: 3,
                    value: "Cerrada"
                }
            ],
            steps:[{
                nombre: 'Depuración',
                value: 'E1'
            }, {
                nombre: 'Diagnostico',
                value: 'E2'
            }, {
                nombre: 'Armado y Reparación',
                value: 'E3'
            }, {
                nombre: 'Limpieza',
                value: 'E3.1'
            }, {
                nombre: 'Armado',
                value: 'E3.2'
            }, {
                nombre: 'Vacío y Carga de Gas',
                value: 'E3.3'
            }, {
                nombre: 'Terminado',
                value: 'E4'
            }, {
                nombre: 'Bodega',
                value: 'E5'
            }, {
                nombre: 'Carritos y Bicicletas',
                value: 'E6'
            }, {
                nombre: 'Servicio en Punto de Venta',
                value: 'E7'
            }, {
                nombre: 'Confinamiento',
                value: 'EC'
            }, {
                nombre: 'Destrucción',
                value: 'ED'
            }]
        })
})();
