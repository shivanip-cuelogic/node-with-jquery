var app = require("./../index.js");
var mongoose = require("mongoose");
var user = require("./../model/userSchema");
var bcrypt= require("bcrypt");


mongoose.connect('mongodb://localhost/userSchema');
mongoose.connection.on('connected', function (error, res) {
    if (error)
        console.log("Error...");
    else
        console.log("Connected to userSchema");
});

module.exports= {
    signin : function (req,res){
        console.log("in login");
       
        
            // console.log("req.body===>",req.body);
            var data = {
                    username:req.body.username,
                    password:req.body.password
            };
      console.log("data received is:",data);

    //   res.json({data:data});
    checkValidUser(data.username,data.password).then((myuser) => {
        console.log("chgeck===>",myuser);
      
        res.json({data:myuser});
    });
    
            
    },

    
    register: function(req,res){
      console.log("in register"); 
    //   console.log("req.body===>",req.body);
      var registrationdata ={
          username:req.body.username,
          password:req.body.password,
          firstname:req.body.firstname,
          lastname:req.body.lastname
      } 
      console.log("data is:",registrationdata);
      var myhash = bcrypt.hashSync(registrationdata.password, 10)

      console.log("pass ency====>>>", myhash);

      var userData = new user({
        username : registrationdata.username ,
        password:myhash ,
        firstname : registrationdata.firstname ,
        lastname : registrationdata.lastname ,
        isAdmin : false
    });
    userData.save()
    .then(()=>{
        console.log("Registed users details:",userData);
        res.json({success : true ,message : ' successfully registered'});
            
    })
    .catch((err)=>{
        console.log("Could not register");
    });

      


    },

    getdata : function(req,res){
        console.log("getdata api called");
        user.find({username:req.body.username})
        .then((existingUser)=>{
            console.log("In then");
            res.json({data:existingUser});
        })
        .catch(()=>{
            console.log("In catch");
            res.json({success:false})
        });
    },

    savedata : function(req,res){

        console.log("save data api called");
        console.log("req.body==>",req.body);
       var saveData={
        username:req.body.username,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        _id:req.body.objectid
       };
console.log("save data api==>",saveData._id);
    user.findByIdAndUpdate(saveData._id,{$set:{username:saveData.username,firstname:saveData.firstname,lastname:saveData.lastname}},{new:true})
       .then((user)=>{
           res.json({data:user});
       })
       .catch();
        
    },


    deletedata : function(req,res){
        
        console.log("entry to be deleted is:",req.body.objectid);
        user.remove({_id: req.body.objectid})
        .then((result)=>{
            res.json({success:true});
        })
        .catch(()=>{
            res.json({success:false});
        })
        }
    
} 

function checkValidUser(username,password){
    return new Promise((resolve,reject) => {
        user.find({
            username: username
        })
        .then((existingUser) => {
    
            if (existingUser.length < 1) {
                res.send("user not found....");
            } else {
                var dbpassword = existingUser[0].password;
                //compare password
                if (bcrypt.compareSync(password, dbpassword)) {
                    console.log("true....");
    
                    var myuser ={
                        username :existingUser[0].username,
                        password:dbpassword,
                        firstname:existingUser[0].firstname,
                        lastname:existingUser[0].lastname
                    }
    
                    var message;
                    if (existingUser.isAdmin===true) {
                        console.log("In admin with data",myuser);
                        resolve(myuser);
                       
                    } 
                    else {
                        console.log("In user with data",myuser);
                        resolve(myuser);
                    }
    
                     
                } else {
                   
                    console.log("Invalid Password");
                }
    
    
    
    
    
    
            } //outer
    
    
        }).catch((err) =>
            console.log("some error occured")
        );
    })
}

