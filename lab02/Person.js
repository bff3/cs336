function Person(name, dateString, friends){
	this.name = name;
	this.birthdate = dateString;
	this.friends = friends;
}

Person.prototype.SayHi = function(){
	return console.log("Hello I'm " + this.name + "!");
}

Person.prototype.age = function(){
			var today = new Date();
			var birthDate = new Date(this.birthdate);
			var age = today.getFullYear() - birthDate.getFullYear();
			var m = today.getMonth() - birthDate.getMonth();
			if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
					age--;
			}
			return age;
}

Person.prototype.MakeFriends = function(newFriend){
	this.friends.push(newFriend);
};

function Student(name, dateString, friends, subject){
	Person.call(this, name, dateString, friends);
	this.subject = subject;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.SayHi = function(){
	return console.log("Hello I'm " + this.name + ", and I study " + this.subject + "!");
}

//test name and sayHi
var dude0 = new Person("Ben", "1996/12/29", []);
dude0.SayHi();
var dude1 = new Person("Rob", "1997/05/19", []);
dude1.SayHi();
var dude2 = new Person("Eric", "2020/12/25", []);
//test age method
console.log(dude0.age());
console.log(dude1.age());
console.log(dude2.age());
//test making friends
dude0.MakeFriends(dude1);
dude1.MakeFriends(dude0);
console.log(dude0.friends[0].name);
console.log(dude1.friends[0].name);
dude0.MakeFriends(dude2);
dude2.MakeFriends(dude0);
console.log(dude0.friends[0].name);
console.log(dude0.friends[1].name);
var dude3 = new Person("Jack", "1895/06/15", [dude0, dude1]);
console.log(dude3.friends[0].name);
console.log(dude3.friends[1].name);

//Test student class
var stud0 = new Student("Sean", "1997/10/11", [], "Engineering");
var stud1 = new Student("Johnny", "1509/07/10", [], "Theology");
stud0.SayHi();
stud1.SayHi();
console.log(stud0.age());
console.log(stud1.age());
dude0.MakeFriends(stud0);
stud0.MakeFriends(dude0);
stud0.MakeFriends(stud1);
stud1.MakeFriends(stud0);
console.log(dude0.friends[0].name);
console.log(dude0.friends[1].name);
console.log(dude0.friends[2].name);
console.log(stud0.friends[1].name);
console.log(stud1.friends[0].name);
console.log(stud0 instanceof Person);
console.log(stud1 instanceof Person);
