
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var userSchema = new Schema({
    username : {
        type : String,
        required : true
    },
    password : String,
    firstname : String,
    lastname : String,
    isAdmin : Boolean
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password,bcrypt.genSaltSync(9));
}

 

module.exports = mongoose.model('User',userSchema);