module.exports = function ($http, $parse, $location, $sessionStorage, $cookies) {

  return {
    restrict : 'E',
    templateUrl : '../views/Navbar.html',
    controller : 'NavbarController'
  };
};
