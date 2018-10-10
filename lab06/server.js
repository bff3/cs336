/**
 * This implements some HTTP method/code, form and cookie examples.
 */

const express = require('express');
const app = express();
const http_status = require('http-status-codes');
const bodyParser = require('body-parser');

const HOST = "localhost";
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

// --------------------------------
// HTTP route and return code examples.
app.get('/request', function(req, res) {
    res.send("Hello, GET!");
    res.writeHead(http_status.OK, {"Content-Type": "text/plain"});
});

app.put('/request', function(req, res) {
    res.send("Hello, PUT!");
});

app.post('/request', function(req, res) {
    res.send('Hello, POST!<br>Posted message: <code>'
	     + req.body.user_message + '</code>');
});
app.delete('/request', function(req, res) {
    res.send("Hello, DELETE!");
});

app.head('/request', function(req, res) {
    res.send("Hello, HEAD!");
});

app.listen(PORT, HOST, () => {
    console.log("listening on " + HOST + ":" + PORT + "...");
});
