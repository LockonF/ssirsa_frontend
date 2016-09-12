/**
 * Created by Emmanuel on 11/09/2016.
 */
(function () {
    'use_strict';

    angular
        .module('app.mainApp.catalogos')
        .controller('proyectosController', proyectosController);

    function proyectosController(Proyectos, toastr, $scope, Translate) {
        var vm = this;


        //Functions
        vm.create = create;
        vm.update = update;
        vm.remove = remove;
        vm.search = search;
        vm.clear = clear;
        vm.selectedItemChange=selectedItemChange;
        vm.clickCopy=clickCopy;

        vm.projects = null;
        vm.filteredProjects = [];
        vm.project = null;
        vm.searchParameter='';
        activate();

        function activate() {
            vm.successTitle=Translate.translate('Projects.Notify.Success');
            vm.errorTitle=Translate.translate('Projects.Notify.Error');
            vm.warningTitle=Translate.translate('Projects.Notify.Warning');
            vm.listErrorMessage=Translate.translate('Projects.Notify.Messages.ERROR_GETTING_PROJECTS');
            vm.errorCreate=Translate.translate('Projecs.Notify.Messages.ERROR_CREATING_PROJECT');
            vm.succesCreate=Translate.translate('Projects.Notify.Messages.SUCCESS_CREATING_PROJECT');

            vm.projects=Proyectos.getAll();
            vm.filteredProjects=vm.projects;
        }

        function create() {
            Proyectos.post(vm.project).then(function(res){
                toastr.success(vm.succesCreate,vm.successTitle);
            }).catch(function(err){
                toastr.error(vm.errorCreate,vm.errorTitle);
                console.log(err);
            });
        }

        function update() {
            Proyectos.put(vm.project);
            activate();
        }

        function remove() {

        }

        function search(text) {
            vm.filteredProjects = _.filter(vm.projects, function (item) {
                return item.descripcion.includes(text);
            });
            return vm.filteredProjects;
        }

        function clear() {
            vm.project = null;
            $scope.formProject.$setPristine();
        }

        function selectedItemChange(item) {
            vm.project = item;
            $scope.formProject.$invalid=true;
        }

        function clickCopy(item){
            vm.project=item.clone();
        }

    }

})();