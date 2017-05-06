module.exports = function ($scope, $http){


  $scope.reg = function (){
    $scope.user.UserType = 'Customer';
    $http.post('/user/register', $scope.user).then(function(data){

      if (data.data.success){
        alert('Registeration Successfull..');
      }else {
        alert('User Already Exist..');
      }
    });
  }

};
