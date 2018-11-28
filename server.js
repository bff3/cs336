/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var app = express();
var db;
var APP_PATH = path.join(__dirname, 'dist');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(APP_PATH));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/api/comments', function(req, res) {
  db.collection('comments').find().toArray(function (err, result) {
    if (err) throw err
    res.json(result);
  });
});

app.post('/api/comments', function(req, res) {
    db.collection('comments').insertOne({
        id: Date.now(),
        author: req.body.author,
        text: req.body.text
      });
      db.collection('comments').find().toArray(function (err, result) {
        if (err) throw err
        res.json(result);
      })
});

app.use('*', express.static(APP_PATH));

app.listen(app.get('port'), function() {
  MongoClient.connect('mongodb://cs336:'+process.env.MONGO_PASSWORD+'@ds155213.mlab.com:55213/lab10bff3', function (err, client) {
    if (err) throw err
    db = client;
  });
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});
