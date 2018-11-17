var Person = require("./Person"); //Person function
var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var app = express();
var db;

var PEOPLE_FILE = path.join(__dirname, 'public/people.json');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//get list of people
app.get('/api/people', function(req, res) {
  db.collection('homework3').find().toArray(function (err, result) {
    if (err) throw err
    res.json(result);
  });
});

//serves the person requested by the app at /person/id
app.get('/api/person/:id', function(req, res) {
  db.collection('homework3').find({loginID: req.params.id}).toArray(function (err, result) {
    if (err) throw err
      res.json(result[0]);
  });
});

app.delete('/api/person/:id', function(req, res) {
  db.collection('homework3').deleteOne({loginID: req.params.id}).toArray(function (err, result) {
    if (err) throw err
      res.json(result[0]);
  });
});

app.put('/api/person/:id', function(req, res) {
  db.collection('homework3').updateOne(
    {loginID: req.params.id},
    {
      "first_name": req.body.firstName,
      "last_name": req.body.lastName,
      "loginID": req.body.id,
      "startDate": req.body.startDate
    }
  );
});

//add person
app.post('/api/people', function(req, res) {
  //var newPerson = new Person(req.body);
   db.collection('homework3').insertOne({
     "first_name": req.body.firstName,
     "last_name": req.body.lastName,
     "loginID": req.body.id,
     "startDate": req.body.startDate
   });
});

//serves page which allows person creation and viewing list of people
app.get('/people', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/people.html'));
});

//serves page for post, put, get and delete
app.get('/person/:id', function(req, res){
  db.collection('homework3').find({loginID: req.params.id}).toArray(function (err, result) {
    if (err) throw err
    //console.log(result);
    if (result[0] == null) {
      res.sendStatus(404);
    } else {
      res.sendFile(path.join(__dirname, 'public/loginID.html'));
    }
  });
});


//for /people/id/name
app.get('/person/:id/name', function(req, res){
  db.collection('homework3').find({loginID: req.params.id}).toArray(function (err, result) {
    if (err) throw err
    var dude = new Person(result[0]);
      res.send(dude.fullname());
    });
});

//for /people/id/year
app.get('/person/:id/years', function(req, res){
  db.collection('homework3').find({loginID: req.params.id}).toArray(function (err, result) {
    if (err) throw err
    var dude = new Person(result[0]);
    res.send(dude.seniority().toString());
  });
});

//any other path gets a 404
app.get('*', function(req, res) {
    res.sendStatus(404);
});

app.listen(app.get('port'), function() {
  MongoClient.connect('mongodb://cs336:'+process.env.MONGO_PASSWORD+'@ds155213.mlab.com:55213/lab10bff3', function (err, client) {
    if (err) throw err
    db = client;
  });
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});
