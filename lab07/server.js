const express = require("express")
const app = express();
const http_status = require("http-status-codes");
const bodyParser = require("body-parser")

const HOST = "localhost";
const PORT = 3000;

app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.send("lab07");
});

app.get("/hello", function(req, res) {
    res.status(200).send({"message" : "Hello " + req.query.name});
});

app.all('*', function(req, res) {
    res.status(404).send("404 not found");
});

app.listen(PORT, HOST, () => {
    console.log("listening on " + HOST + ":" + PORT + "...");
});
