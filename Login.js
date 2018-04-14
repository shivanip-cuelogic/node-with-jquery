var express = require("express");
var app = express();


app.post('/login',function(req,res){
    
var data = {
        username:req.body.username,
        password:req.body.password
    };
    console.log("data received is:",data);
    res.json({data});
});

module.exports=app;


