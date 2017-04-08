var firebase = require("../config");
var express=require("express");
var route=express.Router();


route.post("/",function(request,response)
{
  var dbRef=firebase.database().ref();

  username=request.body.name;
  useremail=request.body.email;
  password1=request.body.password1;
  password2=request.body.password2;
  if(password1!==password2)
  {
    response.send({"status":false,message:"your passwords are not matching"});
    return;
  }
  if(username==""||password1==""||password1==null||password1===undefined||useremail==""||username===undefined||useremail===undefined||username===null||useremail===null)
  {
    response.send("empty values are not allowed");
    return;
  }

   request.checkBody("email","enter a valid email address").isEmail();
    var errors = request.validationErrors();
    if(errors)
       {
         response.send(errors);
         return;
       }
    dbRef.orderByChild("email").equalTo(useremail).once("value",function(snapshot) {
      if(snapshot.val()===null)
      {
      dbRef.push().set({
      name:username,
      email:useremail,
      password:password1
    })
    response.send({status:true,message:"signed up successfully"});
  }else {
    response.status(302).send({status:false,message:"this email has already registered"});
  }
 });
})
module.exports = route;
