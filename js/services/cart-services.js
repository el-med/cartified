/*global angular */
'use strict';

var cart = angular.module('services.cart', []);

// Predefined items to fill our shop
cart.service('Items', [ function () {
    this.get = function () {
        return {
            '1': {
                id: 1,
                brand: 'Nike',
                label: "Lunargato II"
            },
            '2': {
                id: 2,
                brand: 'adidas',
                label: "Nitrocharge 2.0 Trx FG"
            },
            '3': {
                id: 3,
                brand: 'Puma',
                label: "Xenon TR SL2"
            }
        };
    };
}]);