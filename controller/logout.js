//var firebase = require("../config");
var express=require("express");
var route=express.Router();
route.get("/",function(request,response)
{
  console.log("hello hi");
    response.clearCookie("key");
    response.send({"status":true,msg:"welcome to home page"});

})
module.exports = route;
