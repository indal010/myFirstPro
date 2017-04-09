var signupEvent=require("../model/signup");
var express=require("express");
var route=express.Router();


route.post("/",function(request,response)
{
  var valid=signupEvent.isValidate(request.body);
  if(!valid)
   response.send({status:false,msg:"enter valid entries"});
  request.checkBody("email", "Enter a valid email address.").isEmail();
  var errors = request.validationErrors();
   if (errors) {
     response.send(errors);
    return;
    }
      console.log("post signup");
        signupEvent.register(request.body);
        signupEvent.on("saved",welcome);
        function welcome(res)
        {
          if(res)
          response.send({status:true,msg:"register Successfully"});
          else
          response.send({status:false,msg:"email already in use"});
        }
})
module.exports = route;
