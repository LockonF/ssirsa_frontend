/**
 * Created by Luis_Olvera on 02/09/2016.
 */
angular.module('app.mainApp.solicitudes').filter('offset', function() {
    return function(input, start) {
        if(input!=null)
        {
            return input.slice(parseInt(start,10));
        }
        return null;
    };
});