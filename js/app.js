/*global angular */
'use strict';

var cartified = angular.module('cartified', ['ngRoute', 'cartCtrl', 'services.cart']);

cartified.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'list.html',
            controller: 'ListCtrl'
        }).when('/checkout', {
            templateUrl: 'checkout.html',
            controller: 'CheckoutCtrl'
        }).otherwise({
            redirectTo: '/'
        });
    }]);
