var logger = require('morgan');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var server  = require('http').Server(app);
var io =  require('socket.io').listen(server);

var DriverCrud = require('./routes/driver-CRUD');
var Tariff = require('./routes/Tariff');
var Users = require('./routes/Users.js');
var Booking = require('./routes/bookcab.js');


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use('/cabr/', DriverCrud);
app.use('/tarif/', Tariff);
app.use('/user/', Users);
app.use('/bookcab/', Booking);


var mongo = require('mongodb');
var mongoose = require('mongoose');
var dbHost = 'mongodb://localhost:27017/OnlineCab';
mongoose.connect(dbHost);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log("Connected to MongoDB");
});


(function(){
   var webpack = require('webpack');
   var webpackConfig = require(process.env.WEBPACK_CONFIG ? process.env.WEBPACK_CONFIG : './webpack.config' );
   var compiler = webpack(webpackConfig);

   app.use(require("webpack-dev-middleware")(compiler, {
     publicPath: webpackConfig.output.publicPath,
     headers: {"X-custom-Webpack-Header" : "yes"},
     stats:{
       colors: true
     }
}));

app.use(require("webpack-hot-middleware")(compiler,{
  log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
}));

})();


 server.listen(4000, function (req, res) {
  console.log('Server running on port:4000');
});
