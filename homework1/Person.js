'use strict';
function Person(name, dateString, friends){
	this.name = name;
	this.birthdate = dateString;
	this.friends = friends;
}

var dude0 = new Person("Ben", "1996/12/29", []);

var dude1 = new Person("Rob", "1992/04/19", []);

var dude2 = new Person("Bob", "1998/06/09", []);

var dudeList = [dude0, dude1, dude2];

module.exports.dudeList = dudeList;
