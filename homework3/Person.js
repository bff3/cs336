'use strict';
 module.exports = function(prsn){
	this.first_name = prsn.first_name;
	this.last_name = prsn.last_name;
	this.loginID = prsn.loginID;
	this.startDate = prsn.startDate;
}

module.exports.prototype.seniority = function(){
			var today = new Date();
			var startDate = new Date(this.startDate);
			var age = today.getFullYear() - startDate.getFullYear();
			var m = today.getMonth() - startDate.getMonth();
			if (m < 0 || (m === 0 && today.getDate() < startDate.getDate())) {
					age--;
			}
			return age;
}

module.exports.prototype.fullname = function(){
	return this.first_name + ' ' + this.last_name;
}
/*
var Person = function(prsn){
	this.first_name = prsn.first_name;
	this.last_name = prsn.last_name;
	this.loginID = prsn.loginID;
	this.startDate = prsn.startDate;
}

Person.prototype.seniority = function(){
			var today = new Date();
			var startDate = new Date(this.startDate);
			var age = today.getFullYear() - startDate.getFullYear();
			var m = today.getMonth() - startDate.getMonth();
			if (m < 0 || (m === 0 && today.getDate() < startDate.getDate())) {
					age--;
			}
			return age;
}

Person.prototype.fullname = function(){
	return this.first_name + ' ' + this.last_name;
}

//testcode
// var Person = require('./Person');
var prsn = {
	"first_name" : "Butz",
	"last_name" : "Catz",
	"loginID" : "123",
	"startDate" : "1997/11/22"
};
 var dude0 = new Person(prsn);
console.log("seniority: " + dude0.seniority());
console.log("Fullname: " + dude0.fullname());
*/
