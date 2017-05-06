module.exports = function($http, $scope, $rootScope, $sessionStorage, $cookies, Auth){

  var map, infoWindow;
  $scope.initMap =  function () {
     map = new google.maps.Map(document.getElementById('map'), {
       center: {lat: 18.5204, lng: 73.8567},
       zoom: 10
     });
     infoWindow = new google.maps.InfoWindow;

     // Try HTML5 geolocation.
     if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(function(position) {
         var pos = {
           lat: position.coords.latitude,
           lng: position.coords.longitude
         };
        coords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
         infoWindow.setPosition(pos);
         infoWindow.setContent('Location found.');
         infoWindow.open(map);
         map.setCenter(pos);
         var marker = new google.maps.Marker({
           position: pos,
           map: map,
           icon: '../resourses/images/cab1.jpg',
           title: "Your Location"
         })

         sendLocation(position.coords.latitude, position.coords.longitude);
       }, function() {
         handleLocationError(true, infoWindow, map.getCenter());
       });
     } else {
       // Browser doesn't support Geolocation
       handleLocationError(false, infoWindow, map.getCenter());
     }
   }

   function handleLocationError(browserHasGeolocation, infoWindow, pos) {
     infoWindow.setPosition(pos);
     infoWindow.setContent(browserHasGeolocation ?
                           'Error: The Geolocation service failed.' :
                           'Error: Your browser doesn\'t support geolocation.');
     infoWindow.open(map);
   }

   function sendLocation(latitude, longitude){
     var authUser = $cookies.getObject('authUser');
     var driverInfo = authUser.currentUser.userInfo;
     socket.emit('init', {
       location:{
         lat: latitude,
         lng: longitude
       },
       driver: driverInfo
     });
   }
   
   $scope.showCorrentBookings = function(){
     socket.on('DriverDetails', function (data){
       document.getElementById('custName').innerHTML = data.Customer.name;
       document.getElementById('contactno').innerHTML = data.Customer.mobile;
       document.getElementById('pickup').innerHTML = data.Pickup;
       document.getElementById('Destination').innerHTML = data.Drop;
       document.getElementById('fare').innerHTML = data.CabFare;
         $('#Modal').modal();
     });
   }
};
