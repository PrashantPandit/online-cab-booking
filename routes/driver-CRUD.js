var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var DriverSchema = mongoose.Schema({
  cabrdriverName: String,
  cabrdriverNameLast: String,
  cabrdriverAdd:String,
  cabrdriverPhoneno: Number,
  cabrdriverLicenseno: Number,
  cabrdriverEmail:String,
  cabrType:String,
  cabrMake:String,
  cabrModel:String,
  cabrRegno:String

});

var Driver = mongoose.model('Driver', DriverSchema, 'driver');


router.get('/getCabr', function(req, res){
  console.log("Reached Driver Get Function on Server");
  Driver.find({}, function(err, docs){
    res.json(docs);
  });
});

router.get('/getCabr/:id', function(req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
    Driver.find({ _id: req.params.id }, function(err, docs) {
        res.json(docs);

    });
});

router.post('/addCabr', function(req, res){
  console.log(req.body);
  var dAddress = req.body.cabrdriverAdd;
  var dPhone = req.body.cabrdriverPhoneno;
  var dLin = req.body.cabrdriverLicenseno;
  var cType = req.body.cabrType;
  var cMake = req.body.cabrMake;
  var cModel = req.body.cabrModel;
  var cRegno = req.body.cabrRegno;


  var driver = new Driver ({

    cabrdriverAdd: dAddress,
    cabrdriverPhoneno: dPhone,
    cabrdriverLicenseno: dLin,
    cabrType: cType,
    cabrMake: cMake,
    cabrModel: cModel,
    cabrRegno:  cRegno

  });

  console.log(driver);
  driver.save(function(err, docs){
    if(err) throw err;
    console.log("Driver Details Saved");
    res.json(docs);
  });
})

router.delete('/deleteCabr/:id', function(req, res) {
    console.log("REACHED Delete FUNCTION ON SERVER");
    Driver.remove({ _id: req.params.id }, function(err, docs) {
        res.json(docs);
    });
})


module.exports = router;
module.exports = mongoose.model('Driver', DriverSchema, 'driver');
