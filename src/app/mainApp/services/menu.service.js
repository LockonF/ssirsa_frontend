/**
 * Created by Emmanuel on 18/07/2016.
 */
(function () {
    'use_strict';

    angular
        .module('app.mainApp')
        .factory('dynamicMenu', dynamicMenu);

    function dynamicMenu(triMenu, Session, menuReport) {

        return {
            loadMenu: loadMenu
        };


        function loadMenu() {
            triMenu.menu = [];
            var role = Session.userRole;
            switch (role) {

                case "Administrador":
                    loadAdminMenu();
                    break;
                case "Capturista":
                    loadCapturistaMenu();
                    break;
                case "Cliente":
                    loadClienteMenu();
                    break;
                case "Tecnico A":
                    loadTecnicoMenu();
                    break;
                case "Tecnico B":
                    loadTecnicoMenu();
                    break;
                case "Tecnico C":
                    loadTecnicoMenu();
                    break;
                case "Tecnico D":
                    loadTecnicoMenu();
                    break;
                case "Tecnico E":
                    loadTecnicoMenu();
                    break;
                default:
                    triMenu.menu = [];
            }
        }

        function loadAdminMenu() {
            triMenu.menu = [];
            var adminMenu = [
                {
                    name: 'MAIN.MENU.WELCOME',
                    icon: 'zmdi zmdi-home',
                    type: 'dropdown',
                    priority: 1,
                    children: [
                        {
                            name: 'MAIN.MENU.START',
                            state: 'triangular.admin-default.bienvenida',
                            type: 'link'
                        }
                    ]
                },
                {
                    name: 'MAIN.MENU.CRUD_USER',
                    icon: 'zmdi zmdi-account',
                    type: 'dropdown',
                    priority: 2,
                    children: [
                        {
                            name: 'MAIN.MENU.NEW_USER',
                            state: 'triangular.admin-default.gestion_user',
                            type: 'link'
                        },
                        {
                            name: 'MAIN.MENU.ADMIN_USER',
                            state: 'triangular.admin-default.admin_user',
                            type: 'link'
                        }
                    ]
                },
                {
                    name: 'MAIN.MENU.SOLICITUD',
                    icon: 'zmdi zmdi-bookmark',
                    type: 'dropdown',
                    priority: 3,
                    children: [
                        {
                            name: 'MAIN.MENU.SEARCH_SOLICITUD',
                            state: 'triangular.admin-default.buscarSolicitud',
                            type: 'link'
                        },
                        {
                            name: 'MAIN.MENU.CREATES_SOLICITUD',
                            state: 'triangular.admin-default.realizarSolicitud',
                            type: 'link'
                        },
                        {
                            name: 'MAIN.MENU.CALENDAR',
                            state: 'triangular.admin-default.calendar',
                            type: 'link'

                        }
                    ]
                },
                {
                    name: 'MAIN.MENU.SERVICES',
                    icon: 'fa fa-wrench',
                    type: 'dropdown',
                    priority: 4,
                    children: [
                        {
                            name: 'MAIN.MENU.START',
                            state: 'triangular.admin-default.tecnico',
                            type: 'link'
                        },
                        {
                            name: 'MAIN.MENU.IN',
                            state: 'triangular.admin-default.entrada',
                            type: 'link'
                        }, {
                            name: 'MAIN.MENU.OUT.TITLE',
                            type: 'dropdown',
                            children: [{
                                name: 'MAIN.MENU.OUT.NEW',
                                type: 'link',
                                state: 'triangular.admin-default.salida-crear'
                            }, {
                                name: 'MAIN.MENU.OUT.LIST',
                                type: 'link',
                                state: 'triangular.admin-default.salida-list'
                            }]
                        },
                        {
                            name: 'MAIN.MENU.REGISTER_STEP',
                            state: 'triangular.admin-default.etapa',
                            type: 'link'
                        },
                        /* Comentado por si acaso vuelven a pedir que este en el menu pero ya lo absorvio etapa servicio
                         {
                         name: 'MAIN.MENU.PRECHECK',
                         state: 'triangular.admin-default.checklist',
                         type: 'link'
                         }, {
                         name: 'MAIN.MENU.DIAGNOSTIC',
                         state: 'triangular.admin-default.diagnostic',
                         type: 'link'
                         },
                         {
                         name: 'MAIN.MENU.SERVICEONSTORE',
                         state: 'triangular.admin-default.servicioPuntoVenta',
                         type: 'link'
                         },*/
                        {
                            name: 'MAIN.MENU.LINE',
                            state: 'triangular.admin-default.asignacionLinea',
                            type: 'link'
                        },
                        {
                            name: 'MAIN.MENU.SERVICEAWAY',
                            state: 'triangular.admin-default.puntoVenta',
                            type: 'link'
                        }
                    ]
                }, {
                    name: 'MAIN.MENU.CATALOGS.TITLE',
                    icon: 'fa fa-book',
                    type: 'dropdown',
                    priority: 5,
                    children: [

                        {
                            name: 'MAIN.MENU.CATALOGS.TRANSPORT_LINE',
                            state: 'triangular.admin-default.linea-transporte',
                            type: 'link'
                        }, {
                            name: 'MAIN.MENU.CATALOGS.TRANSPORT_TYPE',
                            state: 'triangular.admin-default.tipo-transporte',
                            type: 'link'
                        }, {
                            name: 'MAIN.MENU.CATALOGS.UDN',
                            state: 'triangular.admin-default.udn-catalog',
                            type: 'link'
                        }, {
                            name: 'MAIN.MENU.CATALOGS.SUBSIDIARY',
                            state: 'triangular.admin-default.sucursal',
                            type: 'link'
                        }, {
                            name: 'MAIN.MENU.CATALOGS.CABINET_BRAND',
                            state: 'triangular.admin-default.marca-cabinet',
                            type: 'link'
                        }, {
                            name: 'MAIN.MENU.CATALOGS.CABINET_MODEL',
                            state: 'triangular.admin-default.model-cabinet',
                            type: 'link'
                        }, {
                            name: 'MAIN.MENU.CATALOGS.PROJECTS',
                            state: 'triangular.admin-default.proyectos',
                            type: 'link'
                        },
                        {
                            name: 'MAIN.MENU.CATALOGS.CLIENT',
                            state: 'triangular.admin-default.clientes',
                            type: 'link'
                        },
                        {
                            name: 'MAIN.MENU.CATALOGS.EQUIPMENT_TYPE',
                            state: 'triangular.admin-default.catalogo-tipo-equipo',
                            type: 'link'
                        }, {
                            name: 'MAIN.MENU.CATALOGS.STAGE',
                            state: 'triangular.admin-default.catalogo-etapas',
                            type: 'link'
                        }, {
                            name: 'MAIN.MENU.CATALOGS.CONSUMABLE_CATALOG',
                            state: 'triangular.admin-default.catalogo-insumo',
                            type: 'link'
                        }


                    ]
                },
                {
                    name: 'MAIN.MENU.INVENTORY.TITLE',
                    icon: 'fa fa-archive',
                    type: 'dropdown',
                    priority: 6,
                    children: [{
                        name: 'MAIN.MENU.INVENTORY.CABINETS',
                        state: 'triangular.admin-default.cabinets',
                        type: 'link'
                    }, {
                        name: 'MAIN.MENU.INVENTORY.CONSUMABLES',
                        state: 'triangular.admin-default.insumos',
                        type: 'link'
                    }, {
                        name: 'MAIN.MENU.CATALOGS.CONSUMABLE_CATEGORY',
                        state: 'triangular.admin-default.categoria',
                        type: 'link'
                    }, {
                        name: 'MAIN.MENU.CATALOGS.PROVIDER',
                        state: 'triangular.admin-default.proveedor',
                        type: 'link'
                    }

                    ]
                }, {
                    name: 'MAIN.MENU.REPORTS.TITLE',
                    icon: 'fa fa-line-chart',
                    type: 'dropdown',
                    priority: 7,
                    children: [
                        {
                            name: 'MAIN.MENU.REPORTS.ADMIN',
                            state: 'triangular.admin-default.reportes',
                            type: 'link'
                        },
                        {
                            name: 'MAIN.MENU.REPORTS.LIST',
                            state: 'triangular.admin-default.list',
                            type: 'link'
                        }
                    ]
                }
            ];
            triMenu.menu = adminMenu;
        }

        function loadCapturistaMenu() {
            triMenu.menu = [];
            var capturistaMenu = [
                {
                    name: 'MAIN.MENU.WELCOME',
                    icon: 'zmdi zmdi-home',
                    type: 'dropdown',
                    priority: 1,
                    children: [
                        {
                            name: 'MAIN.MENU.START',
                            state: 'triangular.admin-default.bienvenida',
                            type: 'link'
                        }
                    ]
                },
                {
                    name: 'MAIN.MENU.SOLICITUD',
                    icon: 'zmdi zmdi-bookmark',
                    type: 'dropdown',
                    priority: 3,
                    children: [
                        {
                            name: 'MAIN.MENU.SEARCH_SOLICITUD',
                            state: 'triangular.admin-default.buscarSolicitud',
                            type: 'link'
                        },
                        {
                            name: 'MAIN.MENU.CREATES_SOLICITUD',
                            state: 'triangular.admin-default.realizarSolicitud',
                            type: 'link'
                        }
                    ]
                },
                {
                    name: 'MAIN.MENU.STOCK',
                    icon: 'fa fa-archive',
                    type: 'dropdown',
                    priority: 5,
                    children: [{
                        name: 'MAIN.MENU.CABINETS',
                        state: 'triangular.admin-default.cabinets',
                        type: 'link'
                    }, {
                        name: 'MAIN.MENU.INVENTORY.CONSUMABLES',
                        state: 'triangular.admin-default.insumos',
                        type: 'link'
                    }, {
                        name: 'MAIN.MENU.CATALOGS.CONSUMABLE_CATEGORY',
                        state: 'triangular.admin-default.categoria',
                        type: 'link'
                    }, {
                        name: 'MAIN.MENU.CATALOGS.PROVIDER',
                        state: 'triangular.admin-default.proveedor',
                        type: 'link'
                    }

                    ]
                }
            ];
            triMenu.menu = capturistaMenu;
        }

        function loadClienteMenu() {
            triMenu.menu = [];
            var clienteMenu = [
                {
                    name: 'MAIN.MENU.WELCOME',
                    icon: 'zmdi zmdi-home',
                    type: 'dropdown',
                    priority: 1,
                    children: [
                        {
                            name: 'MAIN.MENU.START',
                            state: 'triangular.admin-default.bienvenida',
                            type: 'link'
                        }
                    ]
                },
                {
                    name: 'MAIN.MENU.SOLICITUD',
                    icon: 'zmdi zmdi-bookmark',
                    type: 'dropdown',
                    priority: 3,
                    children: [
                        {
                            name: 'MAIN.MENU.SEARCH_SOLICITUD',
                            state: 'triangular.admin-default.buscarSolicitud',
                            type: 'link'
                        },
                        {
                            name: 'MAIN.MENU.CREATES_SOLICITUD',
                            state: 'triangular.admin-default.realizarSolicitud',
                            type: 'link'
                        }
                    ]
                }
            ];
            triMenu.menu = clienteMenu;
        }

        function loadTecnicoMenu() {
            triMenu.menu = [];
            var tecnicoMenu = [
                {
                    name: 'MAIN.MENU.WELCOME',
                    icon: 'zmdi zmdi-home',
                    type: 'dropdown',
                    priority: 1,
                    children: [
                        {
                            name: 'MAIN.MENU.START',
                            state: 'triangular.admin-default.bienvenida',
                            type: 'link'
                        }
                    ]
                },
                {
                    name: 'MAIN.MENU.SERVICES',
                    icon: 'fa fa-wrench',
                    type: 'dropdown',
                    priority: 4,
                    children: [
                        {
                            name: 'MAIN.MENU.START',
                            state: 'triangular.admin-default.tecnico',
                            type: 'link'
                        },
                        {
                            name: 'MAIN.MENU.REGISTER_STEP',
                            state: 'triangular.admin-default.etapa',
                            type: 'link'
                        },
                        /* lo mismo de arriba
                         {
                         name: 'MAIN.MENU.PRECHECK',
                         state: 'triangular.admin-default.checklist',
                         type: 'link'
                         }, {
                         name: 'MAIN.MENU.DIAGNOSTIC',
                         state: 'triangular.admin-default.diagnostic',
                         type: 'link'
                         },
                         */
                        {
                            name: 'MAIN.MENU.LINE',
                            state: 'triangular.admin-default.asignacionLinea',
                            type: 'link'
                        },
                        {
                            name: 'MAIN.MENU.SERVICEAWAY',
                            state: 'triangular.admin-default.puntoVenta',
                            type: 'link'
                        }


                    ]
                }
            ];
            triMenu.menu = tecnicoMenu;
        }

    }
})();
