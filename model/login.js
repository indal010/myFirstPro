var	firebase = require('../config'),
ref = firebase.database().ref();
var eventEmitter = require('events').EventEmitter;
var util = require('util');
//var emitter=new EventEmitter();
var login = function(requestStatus)
  {
    var email = requestStatus.email;
    var password = requestStatus.password;
    var req={
      email:email,
      password:password
    };
  var self = this;
  eventEmitter.call(this);
  util.inherits(login, eventEmitter);

this.validatePwd=function()
{
  if(req.password.length >=3)
   return true;
   return false;
}
this.checklogin = function()
 {
   try{

     ref.orderByChild("email").equalTo(requestStatus.email).once("value",function(snapshot)
    {
    //  console.log("hello");
     if (snapshot.val()!==null) {
     snapshot.forEach(function(data)
      {
      var db_data=data.val();

      var db_password=db_data.password;

       if(db_password==requestStatus.password)
          {
          self.emit("checked",true,null);
           }
        else
        {
          self.emit("checked",null,true);
        }
     })
   }
   else
     {
         self.emit("checked",null,false);
      }
   })
   }
   catch (e)
    {
   console.log(e.message);
    }
}
};
module.exports = login;
