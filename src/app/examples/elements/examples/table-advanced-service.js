(function() {
    'use strict';

    angular
        .module('app.examples.elements')
        .factory('GithubService', Service);

    Service.$inject = ['$http', '$q'];

    /* @ngInject */
    function Service($http) {
        return {
            getUsers: getUsers
        };

        ////////////////

        function getUsers(query) {
            var order = query.order === 'id' ? 'desc':'asc';
            return $http.get('https://api.github.com/search/users?q='+query.filter+'+repos:%3E10+followers:%3E100&order='+order+'&sort=joined&per_page='+query.limit+'&page='+query.page).
            success(function(data) {
                return data;
            });
        }
    }
})();
