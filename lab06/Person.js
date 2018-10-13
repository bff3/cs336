'use strict';
module.exports = function(first_name, last_name, loginID, startDate){
	this.first_name = first_name;
	this.last_name = last_name;
	this.loginID = loginID;
	this.startDate = startDate;
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

//testcode
// var Person = require('./Person');
// var dude0 = new Person('Ben','Fynan', 'bff3', '1996/12/29');
// console.log("seniority: " + dude0.seniority());
// console.log("Fullname: " + dude0.fullname());
