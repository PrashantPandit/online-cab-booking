module.exports = function ($rootScope, $scope, $http, Auth, $location, $window, $cookies) {

  contr();
  function contr() {
  Auth.Logout();
};

$scope.login = function(){
  Auth.Login($scope.user, function(response){
    if (response.data.success === true) {
      if(response.data.userDetail.UserType == 'Customer' || response.data.userDetail.UserType == 'Admin'){
        $location.path('/Home');
        $rootScope.$emit('loginuser', {});
      }else if (response.data.userDetail.UserType == 'Driver') {
        $location.path('/Driver');
        $rootScope.$emit('loginuser', {});
      }
    }else {
      alert("UserName or Password Incorrect..");
    }
  });
};
};
