# SSSIRSA frontend

Este proyecto está enfocado a la gestión del negocia de SSSIRSA
### Version
1.0.0

### Tecnologías

Este proyecto fue desarrollando utilizando tecnologías como:

* [AngularJS] - Framework web usado para aplicaciones web
* [Triangular oxygenna] - Sorprendente tema hecho en Angular y Angular Material
* [node.js] - evented I/O for the backend
* [Gulp] - es un sistema de construcción que ayuda a minificar y detectar cambios en código 
* [Bower] - es un manejador de paquetes web.
* [Karma] - gestor de pruebas agnóstico al framework hecho por Google
* [Jasmine] - framework de pruebas unitarias
 

### Instalación local
Primero necesitas Gulp y Bower
```sh
$ npm install -g bower
$ npm install -g gulp
```
Posteriormente

```sh
$ git clone [git-repo-url] 
$ cd sssirsa_frontend
$ npm install
$ bower install
```

Cuando se hayan instalado las dependencias de Node y Bower
```sh
$ gulp serve
```

### Testing

Para empezar a probar, se deben de generar los archivos en /test/spec y luego los siguientes comandos

```sh
$ gulp karma
$ karma start karma.conf.js
```

El primero anexará todos los archivos necesarios para correr el proyecto y el segundo iniciará las pruebas indicadas en
los archivos de testing


###Colaboradores:
- Daniel Zuriel Franco Rodríguez (https://github.com/LockonF)
- Francisco Javier Cerda Martinez (https://github.com/DarkXavier) 
- Amezcua Aguilar Christian Adan Israel (https://github.com/adan92)
- Luis Enrique Hernandez Olvera(https://github.com/FENIX2605)

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [triangular oxygenna]: <http://triangular.oxygenna.com> 
   [node.js]: <http://nodejs.org> 
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>
   [bower]: <http://bower.io/>
   [ssh]:<http://support.suso.com/supki/SSH_Tutorial_for_Linux> 
   [virtualbox]:<https://www.virtualbox.org/>
   [Karma]: <https://karma-runner.github.io/>
   [Jasmine]: <http://jasmine.github.io/>
