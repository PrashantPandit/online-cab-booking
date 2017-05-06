'use strict';

var app = require('angular').module('myApp');

app.service('cabDriver', require('./cabDriverService'));
app.service('Tariff', require('./TariffService'));
app.service('Auth', require('./authSevice'));
