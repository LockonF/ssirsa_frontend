(function () {
    'use strict';
    angular
        .module('app')
        .service('numberPickerService', numberPickerService);

    function numberPickerService() {
        return {
            index: 0,
            assignExtend: function (dest, src) {
                var o = {};

                for (var key in src) {
                    if (dest[key]) {
                        o[key] = dest[key];
                    } else {
                        o[key] = src[key];
                        dest[key] = src[key];
                    }
                }
                return o;
            },
            isNumber: function (value) {
                var val = Number(value);
                return !isNaN(val) && val === +value;
            },
            toNumber: function (value) {
                return Number(value);
            },
            checkNumber: function (value) {
                var self = this,
                    //count no numbers
                    cnn = 0;

                if (angular.isArray(value)) {
                    angular.forEach(value, function (v) {
                        if (!self.isNumber(v)) {
                            cnn += 1;
                        }
                    });
                    if (cnn > 0) {
                        return false;
                    }
                    return true;
                }
                if (!this.isNumber(value)) {
                    return false;
                }
                return true;
            },
            transform: function (opts) {
                for (var key in opts) {
                    opts[key] = this.toNumber(opts[key]);
                }
            },
            getId: function () {
                this.index += 1;
                return 'number-picker-' + this.index;
            }
        };
    }
})();
