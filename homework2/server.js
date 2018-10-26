var Person = require("./Person"); //Person function
var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var PEOPLE_FILE = path.join(__dirname, 'public/people.json');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//request for /people
app.get('/people', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/addPerson.html'));
});

app.get('/api/people', function(req, res) {
  fs.readFile(PEOPLE_FILE, function(err, data) {
    if (err) {
        console.error(err);
        process.exit(1);
    }

    var people = JSON.parse(data);
    res.json(people);
  });
});


app.post('/people', function(req, res) {
    fs.readFile(PEOPLE_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }

        var people = JSON.parse(data);
        // NOTE: In a real implementation, we would likely rely on a database or
        // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
        // treat Date.now() as unique-enough for our purposes.
        var newPerson = new Person(
                            req.body.firstName,
                            req.body.lastName,
                            req.body.id,
                            req.body.startDate);
        people.push(newPerson);
        fs.writeFile(PEOPLE_FILE, JSON.stringify(people, null, 4), function(err) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            res.json(people);
        });
    });
});

//function for searching a list
//takes list of people and id to search for
//returns person from list with matching id
//or 'NAP' if not found
function pSearch(people, id){
  var i;
  for (i = 0; i < people.length; i++) {
    if (people[i].loginID == id) {
      return people[i];
    }
  }
  return 'NAP';
}


//regex for filtering out id number
var getid = /[^\/people\/]\d*/;

//for /people/id requests
app.get(/\/person\/\d*$/, function(req, res){
  let id = getid.exec(req.url);
  let person = pSearch(people, id);
  if (person == 'NAP') {
    res.sendStatus(404);
  } else {
    res.json(person);
  }
});

//for /people/id/name
app.get(/\/person\/\d*\/name/, function(req, res){
  let id = getid.exec(req.url);
  let person = pSearch(people, id);
  if (person == 'NAP') {
    res.sendStatus(404);
  } else {
    res.send(person.fullname());
  }
});

//for /people/id/year
app.get(/\/person\/\d*\/years/, function(req, res){
  let id = getid.exec(req.url);
  let person = pSearch(people, id);
  if (person == 'NAP') {
    res.sendStatus(404);
  } else {
    res.send(person.seniority().toString());
  }
});

//any other path gets a 404
app.get('*', function(req, res) {
    res.sendStatus(404);
});

/*
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
    fs.readFile(COMMENTS_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        res.json(JSON.parse(data));
    });
});

*/

app.listen(app.get('port'), function() {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});
