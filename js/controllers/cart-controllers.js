/*global angular */
'use strict';

var cartCtrl = angular.module('cartCtrl', []);

cartCtrl.controller('ListCtrl', ['$scope', 'Items', function ($scope, Items) {
    $scope.items = Items.get();
}]);

cartCtrl.controller('CheckoutCtrl', [
    function () {}
]);
