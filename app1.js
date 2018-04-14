var express = require("express");

var app = express();

app.get('/test',function(req,res) {
    console.log("req,res===>",req);
})
 
app.listen(4000);
console.log("Server is listenkjshd");