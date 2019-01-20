var express = require('express');
var router = express.Router();
var firebaseadmin = require("firebase-admin");

var serviceAccount = require("./../test.json");


firebaseadmin.initializeApp({
  credential: firebaseadmin.credential.cert(serviceAccount),
  databaseURL: "https://cloudninedemo-30c2c.firebaseio.com"
});


router.get('/', function(req, res, next) {
  var db=firebaseadmin.database().ref("/"); 
  db.once("value", function (details) {
    console.log(details.val());
      if(details.val()){
      var arr=Object.keys(details.val()); 
    }
    
    res.render('index', {title: 'Express'});
  });
});


router.get('/getUser', function(req, res, next) {
  var db=firebaseadmin.database().ref("/"); 
  db.once("value", function (details) { 
    console.log(details.val());
    if(details.val()){
      var arr=Object.keys(details.val()); 
      var arrVal=Object.values(details.val());
    }
    if(arr==null && arrVal==null){
      res.render('Nodata',{});
    }
    
    res.render('viewUser', { array:arr , arrVal:arrVal});
  });
});



router.post('/collect', function(req, res, next) {
  var db=firebaseadmin.database().ref("/"+req.body.title); 
  // db.set(obj);
  var obj={
    title:req.body.title,
    author:req.body.author,
    genre:req.body.genre
  }
  db.set(obj);
  var db=firebaseadmin.database().ref("/"); 
  db.once("value", function (details) {
    var arr=Object.keys(details.val());
    var arrVal=Object.values(details.val());
  res.render('formsubmission',{});
});
});

router.post('/delete', function(req, res, next) {
  var x=req.body.deleteval;
  var db=firebaseadmin.database().ref("/"+x);
  db.set(null)
  .catch(function (error) {
    console.error(error);
  });
  res.render('delete',{});
});





router.post('/deleteAll', function(req, res) {
  var db=firebaseadmin.database().ref("/"); 
  db.once("value", function (details) { 
    console.log(details.val());
    if(details.val()){
      var arr=Object.keys(details.val()); 
      var arrVal=Object.values(details.val());
    }
  
  db.set(null)
  .catch(function (error) {
    console.error(error);


  });
});
  res.render('delete',{});
  
});

router.post('/updatedata', function(req, res) {
  var db=firebaseadmin.database().ref("/");
  db.once("value", function (details) { 
    console.log(details.val());
    if(details.val()){
      var arr=Object.keys(details.val()); 
      var arrVal=Object.values(details.val());
    }

  res.render('update',{array:arr,arrVal:arrVal});
  });
});



router.post('/update', function(req, res, next) {
  var x=req.body.updateval;
  var db=firebaseadmin.database().ref("/"+x); 
  db.once("value", function (details) {
    console.log(details.val());
      if(details.val()){
      var arr=Object.keys(details.val()); 
      var arrVal=Object.values(details.val());
    }
    
    res.render('update', {array:arr , arrVal:arrVal});
  
  });
});

router.post('/updated', function(req, res, next) {
  var x=req.body.chat;
  var db=firebaseadmin.database().ref("/"+x);
  db.set(null)
  .catch(function (error) {
    console.error(error);
  });
  res.render('updated',{});
});

module.exports = router;
