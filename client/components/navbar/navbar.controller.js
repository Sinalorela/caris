'use strict';

angular.module('qweApp')
    .controller('NavbarCtrl', function ($scope, $location) {
        $scope.menu = [{
            'title': 'Home',
            'link': '/'

        }];
        $scope.import=[{
            'title': 'import',
            'link':'/add'
        }];


        $scope.isCollapsed = true;
        $scope.isActive = function(route) {
            return route === $location.path();
        };
//        $scope.isCollapsed = true;
//        $scope.isLoggedIn = Auth.isLoggedIn;
//        $scope.isAdmin = Auth.isAdmin;
//        $scope.getCurrentUser = Auth.getCurrentUser;

        $scope.logout = function () {
            Auth.logout();
            $location.path('/login');
        };

        $scope.isActive = function (route) {
            return route === $location.path();
        };


    });