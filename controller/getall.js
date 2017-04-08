var firebase = require("../config");
var express=require("express");
var route=express.Router();
 var arr=[];
 var dbRef=firebase.database().ref();
route.get("/",function(request,response)
{
  dbRef.on("value",function(snapshot)
{
  //response.send(snapshot.val());
snapshot.forEach(function(data){
   arr.push(data.val());//JSON.stringify(s1);
})
  //  arr=JSON.stringify(arr);
  //  for(i=0;i<arr.length;i++)
  //  {
  //    arr[i]=JSON.parse(arr[i]);
  //  }
    //  arr=JSON.stringify(arr);
   response.send({"allUsers":arr});//JSON.parse(arr));
})

})
module.exports = route;
