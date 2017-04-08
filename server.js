var express=require("express");
var cookieParser = require('cookie-parser');
//var session = require('express-session');
var app=express();
app.use(express.static("./public"));

var cors=require("cors");
app.use(cors());
var bodyParser=require("body-parser");
var validator=require("express-validator");
 var port = process.env.PORT || 8086;
// //app.use(session({secret: 'ssshhhhh'}));
     app.use(bodyParser.urlencoded({
          extended: true
          }));
          app.use(bodyParser.json());
          app.use(validator());
  app.use(require('./controller'));

var server=app.listen(port, function () {
    port1=server.address().port;
  console.log('server has started at http://127.0.0.1:'+port1);
});



//
//
//app.get('/',function(request,response){





//   //sess = request.cookie;
//   //Session set when user Request our app via URL
//   // if(sess.user) {
//   // /*
//   // * This line check Session existence.
//   // * If it existed will do some action.
//   // */
//   //     res.redirect('public/view/success.html');
//   // }
//   // else {
//   //     res.render("public/index.html");
//   // }
//   //});
//
//

//
//   var server=app.listen(port,function()
//   {
//   console.log("server has started at port %d ..... ",port);
//  })
