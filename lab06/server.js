/**
 * This implements some HTTP method/code, form and cookie examples.
 */

const Person = require("./Person");
const express = require('express');
const app = express();
const http_status = require('http-status-codes');
const bodyParser = require('body-parser');

const HOST = "localhost";
const PORT = 3000;

var dude0 = new Person('Ben','Fynan', '1133', '1996/12/29');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

// --------------------------------
// HTTP route and return code examples.
app.get('/request', function(req, res) {
    res.status(200).send("Hello, GET!");
});


var Hello;
app.put('/request', function(req, res) {
    res.status(201).send("Hello, PUT! " + JSON.stringify(req.body));
    console.log(req.body);
});

app.post('/request', function(req, res) {
    res.status(202).send('Hello, POST!<br>Posted message: <code>'
	     + JSON.stringify(req.body) + '</code>');
       console.log(req.body);
});

app.post('/forms/', function(req, res) {
    res.status(201).send('Hello, form POST!<br>Posted message: <code>'
	     + req.body.user_message + '</code>');
});

app.delete('/request/*', function(req, res) {
  console.log(JSON.stringify(dude0));
  var id = req.url.substring(req.url.lastIndexOf('/') + 1);
  delete dude0[id];
  res.status(202).send("deleted: " + id);
  console.log(JSON.stringify(dude0));
});

app.head('/request', function(req, res) {
    res.status(200).send("Hello, HEAD!");
});

app.all('*', function(req, res) {
    res.status(405).send("you made a boo-boo");
});

app.listen(PORT, HOST, () => {
    console.log("listening on " + HOST + ":" + PORT + "...");
});
