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
        .constant('EVENTS_GENERAL', {
            notFound: 'not-found',
            notFount_select: 'not-found-select'
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
                    name:"Solicitud de envió",
                    value: "Envio"
                },
                {
                    id: 1,
                    name:"Solicitud de recolección",
                    value: "Recoleccion"
                },
                {
                    id: 2,
                    name:"Solicitud de punto de venta",
                    value: "Venta"
                }
            ],
            filtrarSolicitud: [
                {

                    name:"Todas las solicitudes de esté tipo",
                    value: "Todas"
                },
                {

                    name:"Por Folio",
                    value: "Por Folio"
                },
                {
                    name:"Por Estatus",
                    value: "Por Estatus"
                }
            ],
            estatusSol: [
                {
                    name:"Confirmada",
                    value: "Confirmada"
                },
                {
                    name:"No Confirmada",
                    value: "No Confirmada"
                },
                {
                    name:"Cancelada",
                    value: "Cancelada"
                },
                {
                    name:"Cerrada",
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
            }],
            antiguedad:[
                {id:'A',value:'A'},
                {id:'B',value:'B'},
                {id:'C',value:'C'},
                {id:'D',value:'D'},
                {id:'E',value:'E'},
                {id:'F',value:'F'}
            ],
            estatus_cabinet:[
                {display:'Reparación Mayor',value:'Reparacion Mayor'},
                {display:'Sistema Tapado',value:'Sistema Tapado'},
                {display:'Reparación Media',value:'Reparacion Media'},
                {display:'Reparación Menor',value:'Reparacion Menor'},
                {display:'Fuga Interna',value:'Fuga Interna'},
                {display:'Obsoleto',value:'Obsoleto'},
                {display:'N/A',value:'N/A'}
            ],
            type_out:[
                {
                    id:0,
                    value:"Normal",
                    value_service:"normal"
                },
                {
                    id:2,
                    value:"Fuga Interna",
                    value_service:"fuga_interna"
                },
                {
                    id:3,
                    value:"Obsoleto",
                    value_service:"obsoleto"
                },
                {
                    id:4,
                    value:"No validada",
                    value_service:"all"
                }
            ]
        });
})();
