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
                    value: "Solicitud de envío"
                },
                {
                    id: 1,
                    value: "Solicitud de recolección"
                },
                {
                    id: 2,
                    value: "Solicitud de punto de venta"
                }
            ],
            status_equipment:[
                {
                    value: "Nuevo"
                },
                {
                    value: "Reparado"
                }
            ]
        })
})();
