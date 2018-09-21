console.log("Fractal fern program I made over the summer...");
//point class takes two integers
function Point(X,Y) {
	this.X = X;
	this.Y = Y;
}

//Line object
function Line(Origin, Angle, Magnitude) {
	this.Start = Origin;
	this.Ang = Angle;
	this.Mag = Magnitude;
	this.End = new Point(this.Start.X + this.Mag * Math.cos(Math.Deg2Rad(this.Ang)),
	this.Start.Y + this.Mag * Math.sin(Math.Deg2Rad(this.Ang)));
}

Math.Deg2Rad = function (deg) {
	return deg * Math.PI / 180;
}

function DrawLine(ctx, aLine) {
	ctx.moveTo(aLine.Start.X, aLine.Start.Y);
	ctx.lineTo(aLine.End.X, aLine.End.Y);
	ctx.stroke();
}

function Fern(c, ctx, lvl, depth) {
	if (depth === 0) {
		var line = lvl.pop();
		DrawLine(ctx, line);
		var newline0 = new Line(line.End, line.Ang + 90, Math.log(line.Mag)/Math.log(1.05));
		var newline1 = new Line(line.End, line.Ang - 90,  Math.log(line.Mag)/Math.log(1.05));
		var newline2 = new Line(line.End, line.Ang, 4 * Math.log(line.Mag)/Math.log(1.12));
		var nxtLvl = new Array();
		nxtLvl.push(newline0);
		nxtLvl.push(newline1);
		nxtLvl.push(newline2);
		return nxtLvl;
	} else {
		var Level = Fern(c, ctx, lvl, depth - 1);
		var nxtLvl = new Array();
		var LvlLen = Level.length;
		for (i = 0; i < LvlLen; i++) {
			var line = Level.pop();
			DrawLine(ctx, line);
			var newline0 = new Line(line.End, line.Ang + 90, 0.35 * line.Mag);
			var newline1 = new Line(line.End, line.Ang - 90,  0.35 * line.Mag);
			var newline2 = new Line(line.End, line.Ang + 3, line.Mag / 1.6);
			nxtLvl.push(newline0);
			nxtLvl.push(newline1);
			nxtLvl.push(newline2);
		}
		return nxtLvl;
	}
}

window.onload = function () {
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var Point0 = new Point(canvas.width / 2, 0);
var Line0 = new Line(Point0, 90, 300);
var lvl = [Line0];
Fern(canvas, ctx, lvl, 7);
}
console.log("Fern complete!");
