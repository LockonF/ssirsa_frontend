/**
 * Created by Emmanuel on 18/07/2016.
 */
(function () {
    'use_strict';

    angular
        .module('app.mainApp')
        .factory('dynamicMenu', dynamicMenu);

    function dynamicMenu(triMenu, Session) {
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
                default:
                    triMenu.menu = [];
            }
        }

        function loadAdminMenu() {
            triMenu.menu = [];
            var adminMenu = [
                {
                    name: 'Bienvenida',
                    icon: 'zmdi zmdi-home',
                    type: 'dropdown',
                    priority: 1,
                    children: [
                        {
                            name: 'Inicio',
                            state: 'triangular.admin-default.bienvenida',
                            type: 'link'
                        }
                    ]
                },
                {
                    name: 'Gestion de Usuarios',
                    icon: 'zmdi zmdi-account',
                    type: 'dropdown',
                    priority: 2,
                    children: [
                        {
                            name: 'Nuevo usuario',
                            state: 'triangular.admin-default.gestion_user',
                            type: 'link'
                        },
                        {
                            name: 'Buscar usuarios',
                            state: 'triangular.admin-default.buscarUsuario',
                            type: 'link'
                        }
                    ]
                },
                {
                    name: 'Solicitudes',
                    icon: 'zmdi zmdi-bookmark',
                    type: 'dropdown',
                    priority: 3,
                    children: [
                        {
                            name: 'Buscar Solicitudes',
                            state: 'triangular.admin-default.buscarSolicitud',
                            type: 'link'
                        },
                        {
                            name: 'Crear Solicitud',
                            state: 'triangular.admin-default.realizarSolicitud',
                            type: 'link'
                        },
                        {
                            name: 'Calendario',
                            state: 'triangular.admin-default.calendar',
                            type: 'link'

                        }
                    ]
                },
                {
                    name: 'Servicios',
                    icon: 'fa fa-wrench',
                    type: 'dropdown',
                    priority: 4,
                    children: [{
                        name: 'Inicio',
                        state: 'triangular.admin-default.tecnico',
                        type: 'link'
                    },
                        {
                            name: 'Entradas',
                            state: 'triangular.admin-default.entrada',
                            type: 'link'
                        },
                        {
                            name: 'Registro Etapa',
                            state: 'triangular.admin-default.etapa',
                            type: 'link'
                        },
                        {
                            name: 'Pre-Checklist',
                            state: 'triangular.admin-default.checklist',
                            type: 'link'
                        }, {
                            name: 'Diagnostico',
                            state: 'triangular.admin-default.diagnostic',
                            type: 'link'
                        },
                        {
                            name: 'Asignación de Linea',
                            state: 'triangular.admin-default.asignacionLinea',
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
                        },{
                            name: 'MAIN.MENU.CATALOGS.CABINET_MODEL',
                            state: 'triangular.admin-default.model-cabinet',
                            type: 'link'
                        }, {
                            name: 'MAIN.MENU.CATALOGS.PROJECTS',
                            state: 'triangular.admin-default.proyectos',
                            type: 'link'
                        },
                        {
                            name:'MAIN.MENU.CATALOGS.CLIENT',
                            state: 'triangular.admin-default.clientes',
                            type:'link'
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
                        name: 'MAIN.MENU.CATALOGS.CONSUMABLE_CATALOG',
                        state: 'triangular.admin-default.catalogo-insumo',
                        type: 'link'
                    },{
                        name: 'MAIN.MENU.CATALOGS.PROVIDER',
                        state: 'triangular.admin-default.proveedor',
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
                    name: 'Bienvenida',
                    icon: 'zmdi zmdi-home',
                    type: 'dropdown',
                    priority: 1,
                    children: [
                        {
                            name: 'Inicio',
                            state: 'triangular.admin-default.bienvenida',
                            type: 'link'
                        }
                    ]
                },
                {
                    name: 'Solicitudes',
                    icon: 'zmdi zmdi-bookmark',
                    type: 'dropdown',
                    priority: 3,
                    children: [
                        {
                            name: 'Buscar Solicitudes',
                            state: 'triangular.admin-default.buscarSolicitud',
                            type: 'link'
                        },
                        {
                            name: 'Crear Solicitud',
                            state: 'triangular.admin-default.realizarSolicitud',
                            type: 'link'
                        }
                    ]
                },
                {
                    name: 'Inventarios',
                    icon: 'fa fa-archive',
                    type: 'dropdown',
                    priority: 5,
                    children: [{
                        name: 'Cabinets',
                        state: 'triangular.admin-default.cabinets',
                        type: 'link'
                    }, {
                        name: 'Insumos',
                        state: 'triangular.admin-default.insumos',
                        type: 'link'
                    }, {
                        name: 'Catalogo de Insumos',
                        state: 'triangular.admin-default.catalogoInsumos',
                        type: 'link'
                    }, {
                        name: 'Categoria Insumos',
                        state: 'triangular.admin-default.construccion',
                        type: 'link'
                    }, {
                        name: 'Proveedores',
                        state: 'triangular.admin-default.construccion',
                        type: 'link'
                    }

                    ]
                }
            ];
            console.log(capturistaMenu);
            triMenu.menu = capturistaMenu;
        }

        function loadClienteMenu() {
            triMenu.menu = [];
            var clienteMenu = [
                {
                    name: 'Bienvenida',
                    icon: 'zmdi zmdi-home',
                    type: 'dropdown',
                    priority: 1,
                    children: [
                        {
                            name: 'Inicio',
                            state: 'triangular.admin-default.bienvenida',
                            type: 'link'
                        }
                    ]
                },
                {
                    name: 'Solicitudes',
                    icon: 'zmdi zmdi-bookmark',
                    type: 'dropdown',
                    priority: 3,
                    children: [
                        {
                            name: 'Buscar Solicitudes',
                            state: 'triangular.admin-default.buscarSolicitud',
                            type: 'link'
                        },
                        {
                            name: 'Crear Solicitud',
                            state: 'triangular.admin-default.realizarSolicitud',
                            type: 'link'
                        }
                    ]
                }

            ];

            //triMenu.menu.unshift(adminMenu);
            triMenu.menu = clienteMenu;
        }

        function loadTecnicoMenu() {
            triMenu.menu = [];
            var tecnicoMenu = [
                {
                    name: 'Bienvenida',
                    icon: 'zmdi zmdi-home',
                    type: 'dropdown',
                    priority: 1,
                    children: [
                        {
                            name: 'Inicio',
                            state: 'triangular.admin-default.bienvenida',
                            type: 'link'
                        }
                    ]
                },
                {
                    name: 'Servicios',
                    icon: 'fa fa-wrench',
                    type: 'dropdown',
                    priority: 2,
                    children: [{
                        name: 'Inicio',
                        state: 'triangular.admin-default.tecnico',
                        type: 'link'
                    },
                        {
                            name: 'Registro Etapa',
                            state: 'triangular.admin-default.etapa',
                            type: 'link'
                        },
                        {
                            name: 'Pre-Checklist',
                            state: 'triangular.admin-default.checklist',
                            type: 'link'
                        }, {
                            name: 'Diagnostico',
                            state: 'triangular.admin-default.diagnostic',
                            type: 'link'
                        },
                        {
                            name: 'Asignación de Linea',
                            state: 'triangular.admin-default.asignacionLinea',
                            type: 'link'
                        }
                    ]
                }

            ];

            //triMenu.menu.unshift(adminMenu);
            triMenu.menu = tecnicoMenu;
        }

    }
})();
