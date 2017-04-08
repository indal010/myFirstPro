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

//var loginEvent = new login();
this.isValidate = function () {
console.log(email);
  if(email=="")
  {
      self.emit("validationEmpty","empty",null);
  }
  else if(password=="")
  {
        self.emit("validationEmpty",null,"empty");
  }
};


this.checklogin = function()
 {
   try{

     ref.orderByChild("email").equalTo(requestStatus.email).once("value",function(snapshot)
    {
     //console.log(snapshot.val());
     if (snapshot.val()!==null) {
     snapshot.forEach(function(data)
      {
      var db_data=data.val();

      var db_password=db_data.password;

       if(db_password==requestStatus.password)
         {
          self.emit("checked","success",req);

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
