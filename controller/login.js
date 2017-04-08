//var firebase = require("../config");
//var cookie = require('cookie');
//var eventEmitter=require("events").EventEmitter;
var login=require("../model/login");
var cookieParser = require('cookie-parser');
//var cookies = require('browser-cookies');
//var cookieSession=require("cookie-session");
var express=require("express");
var app=express();
app.use(cookieParser());
var bodyParser=require("body-parser");
var route=express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//app.use(express.cookieParser());


  route.post("/",function(request,response)
  {
  //  console.log(request.body.password);
  var setObj={
    email:request.body.email,
    password:request.body.password
  };
    var obj=new login(setObj);
      var check=obj.isValidate();
      obj.on("validationEmpty",valid);
      obj.checklogin();
      obj.once("checked",checkedListened);
      obj.removeListener("checked",checkedListened);
      function valid(result,error)
      {
        console.log("valid method   *"+error+"*");
        if(result)
        response.send({"status":false,"msg":"email should not be empty"});
        else if(error)
        response.send({"status":false,"msg":"password should not be empty"});
      }

     function checkedListened(result,error)
       {
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
})

module.exports = route;
