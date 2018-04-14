var controller = require("./../controller/controller.js");




module.exports= function routes(app) {
   
    
    app.post('/login',controller.signin);
    app.post('/register',controller.register);
    app.post('/getdata',controller.getdata);
    app.post('/savedata',controller.savedata);
    app.post('/deleteData',controller.deletedata)
}