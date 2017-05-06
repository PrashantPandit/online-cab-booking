module.exports = function($scope, $http, $filter,$timeout, cabDriver, Tariff){


  $('.timepicker').timepicker({
      timeFormat: 'HH:mm',
      interval: 1,
      dynamic: true,
      dropdown: true,
      scrollbar: true
  });
        var cabDriverRefresh = function(){
          var promise =  cabDriver.getcabDriver();
          promise.then(function(data){
            $scope.cabrList = data;
            $scope.cabdriver = "";
          })
        };
          cabDriverRefresh();

          $scope.addcabDriver = function () {
            $scope.cabr.cabrdriverPhoneno = $scope.dvrd.MobileNumber;
            var promise  =  cabDriver.addcabDriver($scope.cabr);
            promise.then(function(data){
              cabDriverRefresh();
            })
          };

          $scope.deletecabDriver = function(cabr){
            var promise = cabDriver.deletecabDriver(cabr);
            promise.then(function(data){
              cabDriverRefresh();
            })
          };

          var driverdetailRefresh = function (){
            var promise = cabDriver.getcabDriverDetail();
            promise.then(function(data){
              $scope.dvrdList = data;
              $scope.dvrd = "";
            })
          };
          driverdetailRefresh();

          $scope.addDvrDtl = function (){
            $scope.dvrd.UserType = 'Driver';
            $scope.dvrd.Password = 'bhima';
            var promise = cabDriver.addDriverDetail($scope.dvrd);
            promise.then(function(data){
              driverdetailRefresh();
            })
          };

          $scope.deleteDvrDtl = function(dvrd){
            var promise = cabDriver.deleteDriverDetail(dvrd);
            promise.then(function(data){
              driverdetailRefresh();
            })
          };


          var TariffRefresh = function(){
            var promise =  Tariff.getTariff();
            promise.then(function(data){
              $scope.TrfList = data;
              $scope.Trf = "";
            })
          };
            TariffRefresh();

            $scope.addTariff = function () {
              var promise  =  Tariff.addTariff($scope.Trf);
              promise.then(function(data){
                TariffRefresh();
              })
            };

            $scope.deleteTariff = function(Trf){
              var promise = Tariff.deleteTariff(Trf);
              promise.then(function(data){
                TariffRefresh();
              })
            };

        $(".nav-tabs a").click(function(){
     $(this).tab('show');
 });
}
