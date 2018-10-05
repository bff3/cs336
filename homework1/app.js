let Person = require("./Person"); //Person function
let express = require('express');
let app = express();

//make a list of some people
var dude0 = new Person('Ben','Fynan', '1133', '1996/12/29');
var dude1 = new Person("Rob", 'Kappa', '6969', "1997/05/19");
var dude2 = new Person("Eric", 'Idle', '1337', "1945/12/25");
var people = [dude0, dude1, dude2];

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

//request for /people
app.get('/people', function(req, res) {
  res.json(people);
});

//regex for filtering out id number
var getid = /[^\/people\/]\d*/;

//for /people/id requests
app.get(/\/people\/\d*$/, function(req, res){
  let id = getid.exec(req.url);
  let person = pSearch(people, id);
  if (person == 'NAP') {
    res.sendStatus(404);
  } else {
    res.json(person);
  }
});

//for /people/id/name
app.get(/\/people\/\d*\/name/, function(req, res){
  let id = getid.exec(req.url);
  let person = pSearch(people, id);
  if (person == 'NAP') {
    res.sendStatus(404);
  } else {
    res.send(person.fullname());
  }
});

//for /people/id/year
app.get(/\/people\/\d*\/years/, function(req, res){
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

app.listen(3000);
