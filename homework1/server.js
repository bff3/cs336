/**
 * Sample (Node.js, non-Express) webserver for CS 336, Unit 3 - Run with either:
 *    node script.js
 *    npm start
 */
'use strict';
let Person = require("./Person");
const express = require('express');
const app = express();
const path = require('path');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res) {
  res.json(Person.dudeList);
});
app.listen(3000);
