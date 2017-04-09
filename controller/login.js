var login=require("../model/login");
var cookieParser = require('cookie-parser');
var express=require("express");
var app=express();
app.use(cookieParser());
var bodyParser=require("body-parser");
var route=express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
route.post("/",function(request,response)
  {
  var setObj={
    email:request.body.email,
    password:request.body.password
  };
  var obj=new login(setObj);
  request.checkBody("email", "Enter a valid email address.").isEmail();
  var errors = request.validationErrors();
   if (errors) {
     response.send(errors);
    return;
    }
     if(!obj.validatePwd(request.password))
        {
          response.send([{param:"",status:"your password strength is not good"}]);
          return;
        }










      obj.checklogin();
      obj.once("checked",checkedListened);

     function checkedListened(result,error)
       {
         console.log("hi");
          if(result)
           {
            response.cookie("key",setObj);
            response.send({"status":true,"msg":"login successfull"});
           }
         else if(error)
          {
            response.send({"status":false,"msg":"unauthorized user"});
          }
       else {
         response.send({status:false,msg:"email is not present"});
       }
  }
  //obj.removeListener("checked",checkedListened);
})

module.exports = route;
