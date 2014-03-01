/*global angular */
'use strict';

var cartCtrl = angular.module('cartCtrl', []);


// dislpay a list of items
cartCtrl.controller('ListCtrl', ['$scope', 'Items', 'CartStorage', function ($scope, Items, CartStorage) {
    // fetch items list and display it 
    $scope.items = Items.get();
    $scope.$parent.selected = "/";
    $scope.total = CartStorage.getTotalItems();

    // Invoked whenever 'add to cart' button is clicked
    $scope.addToCart = function (item) {
        CartStorage.addItem({
            id: item.id,
            quantity: item.quantity
        });
        $scope.total += parseInt(item.quantity, 10);
    };

    $scope.$on('storageUpdate', function () {
        $scope.$apply(function () {
            $scope.total = CartStorage.getTotalItems();
        });
    });
}]);

// display the content of the shopping cart
cartCtrl.controller('CheckoutCtrl', ['$scope', 'Items', 'CartStorage', function ($scope, Items, CartStorage) {

    function getTotal() {
        var key, item, sum = 0;
        for (key in $scope.cart) {
            if ($scope.cart.hasOwnProperty(key)) {
                item = $scope.cart[key];
                sum += item.quantity * $scope.items[item.id].price;
            }
        }
        return sum;
    }

    $scope.$parent.selected = "/checkout";
    // Initialize cart items from localStorage
    $scope.cart = CartStorage.getCart();
    // the cart knows only item IDs and their quantity 
    // hence, we need items list to retrieve brand and labels
    $scope.items = Items.get();

    $scope.total = getTotal();

    $scope.changeQuantity = function (item) {
        CartStorage.changeQuantity(item.id, item.quantity);
        $scope.total = getTotal();
    };

    $scope.removeFromCart = function (item) {
        CartStorage.remove(item.id);
        // update the cart manually because
        // some browser do not fire storage change on same window
        delete $scope.cart[item.id];
        $scope.total =  getTotal();
    };

    $scope.clear = function () {
        CartStorage.clear();
        $scope.cart = []; // Update the cart manually
        $scope.total = 0;
    };

    // update the model whenever the storage is modifieded
    // this allow multiple browser tabs to have the same cart information
    $scope.$on('storageUpdate', function () {
        $scope.$apply(function () {
            $scope.cart = CartStorage.getCart();
            $scope.total = getTotal();
        });
    });
}]);
