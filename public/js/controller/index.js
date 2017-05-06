'use strict';

var app = require('angular').module('myApp');

app.controller('AdminController', require('./AdminCtrl'));
app.controller('LoginController', require('./LoginCtrl'));
app.controller('RegisterController', require('./RegisterCtrl'));
app.controller('NavbarController', require('./NavbarCtrl'));
app.controller('BookingController', require('./CabBookingCtrl'));
app.controller('DriverController', require('./DriverCtrl'));
