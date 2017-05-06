'use strict';

// window.$ = window.jQuery = require('jquery');

var angular = require('angular');
              require('angular-route');
           require('ngstorage');
           require('angular-cookies');

var app = angular.module('myApp', ['ngRoute', 'ngCookies', 'ngStorage']);

require('./vendor/angular-cookies.min.js');
require('./vendor/ngStorage.min.js');
require('../css/app.css');
require('./controller');
require('./service');
require('./directives');


app.config(function ($routeProvider, $locationProvider){
  $routeProvider

  .when("/Home", {
    templateUrl: 'views/Home.html',

  })

  .when("/Admin", {
    templateUrl: 'views/Admin.html',
    controller: 'AdminController',
  })

  .when("/Login", {
    templateUrl: 'views/Login.html',
    controller: 'LoginController',
  })

  .when("/Register", {
    templateUrl: 'views/Register.html',
    controller: 'RegisterController',
  })

  .when("/UnAuthorized", {
    templateUrl: 'views/UnAuthorized.html',
  })

  .when("/Driver", {
    templateUrl: 'views/Driver.html',
    controller: 'DriverController',
  })

  .when("/Navbar", {
    templateUrl: 'views/Navbar.html',
    controller: 'NavbarController',
  })
  .when("/CabBooking", {
    templateUrl: 'views/CabBooking.html',
    controller: 'BookingController',
  })

  // .when("/AdvancedBooking", {
  //   templateUrl: 'views/AdvancedBooking.html',
  //   controller: 'AdvancedController',
  // })

  .when("/Ride", {
    templateUrl: 'views/Ride.html',
    controller: 'MyRideController',
  })

  .otherwise({
    redirectTo : '/Home',
  });
});




app.run(function($rootScope, $http, $location, $sessionStorage, $cookies) {
    if ($sessionStorage.tokenDetails) {
        $http.defaults.headers.common.Authorization = $sessionStorage.tokenDetails.token;
    }

    // redirect to login page if not logged in and trying to access a restricted page
    $rootScope.$on('$locationChangeStart', function(event, next, current) {
        var publicPages = ['/Home','/', '/Login', '/Register'];
        var AdminPages = ['/Home' , '/' , '/Admin'];
        var CustomerPages = ['/CabBooking', '/Ride' , '/' , '/Home'];
        var DriverPages = ['/Driver' , '/Ride' , '/','/Home'];
        var authUser = $cookies.getObject('authUser');
        if (authUser != undefined) {
            var loggedInUser = authUser.currentUser.userInfo;
        }
        var restrictedPage = publicPages.indexOf($location.path()) === -1;
        if (restrictedPage && !$sessionStorage.tokenDetails && $location.path() != '') {
            $location.path('/Login');
        }else {
          if(authUser != undefined) {
            if(authUser.currentUser.userInfo.UserType == 'Admin'){
              var admin  = AdminPages.indexOf($location.path()) === -1;
              if(admin) {
                $location.path('/UnAuthorized');
              }
            }
            if (authUser.currentUser.userInfo.UserType == 'Customer'){
              var Customer = CustomerPages.indexOf($location.path()) === -1;
              if(Customer){
                $location.path('/UnAuthorized');
              }
            }
            if (authUser.currentUser.userInfo.UserType == 'Driver'){
              var Driver = DriverPages.indexOf($location.path()) === -1;
              if(Driver){
                $location.path('/UnAuthorized');
              }
            }
          }
        }
    });
});

if (module.hot) {
      module.hot.accept();
}
