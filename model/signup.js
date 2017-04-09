var	firebase = require('../config'),
 dbRef = firebase.database().ref();
 var EventEmitter = require('events').EventEmitter;
 var util = require('util');

	var signup = function() {
			var self = this;
			EventEmitter.call(this);
		};
		util.inherits(signup, EventEmitter);
		var signupEvent = new signup();

		signup.prototype.isValidate = function (signupdata)
      {
		        //console.log("I am in isValidate Method");
            username=signupdata.name;
            // useremail=signupdata.email;
            password1=signupdata.password1;
            password2=signupdata.password2;
            if(password1.length<3||password2.length<3||password1!==password2||username.length!=0)
            {
              return false;
            }
            return true;
		}


signup.prototype.register = function(signupdata)
 {
   console.log("hello register");
  username=signupdata.name;
  useremail=signupdata.email;
  password1=signupdata.password1;
  dbRef.orderByChild("email").equalTo(useremail).once("value", function(snapshot) {
        if(snapshot.val()!==null)
        {
            snapshot.forEach(function(snap) {
                console.log("already user");
                signupEvent.emit("saved",false);
            });
        }
        else
        {
          dbRef.push().set({
          name:username,
          email:useremail,
          password:password1
          });
          signupEvent.emit("saved",true);
        }
  });
}

module.exports = signupEvent;
