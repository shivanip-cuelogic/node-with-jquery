var express = require("express");
var app = express();
var bodyParser = require('body-parser')

var myroutes = require("./routes/myroutes");
var controller = require("./controller/controller.js");


//var log = require("./Login.js");
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.post('/login',controller.signin);
myroutes(app);

app.listen(3000);
console.log("listening====");

module.exports = app;
