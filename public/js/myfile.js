// var cookie1=document.cookie
//  console.log(cookie1.length);
// if(cookie1.length>0)
// {
//       console.log("hello");
// }
// else {
//var temp = [];
//var port=process.env.PORT;




$(document).ready(function() {





  $(document).on("click","#home1",function()
    {
      $.ajax({
         url: "/logout",
         type: "GET",
          //dataType: 'JSON',
         success: function(response) {
          // console.log('page was loaded', response);
          // if(response.status==true)
          //     setResult();
            if(response.status==true)
                homepage();
          //if(document.cookie===undefined)
          },
        error: function(error) {
          console.log("page was not loaded ", error);
        }
      });
    });

  function homepage()
  {
  $.ajax(
        {
          url:"../index.html",
            async:false,
            type:"GET",
              dataType:'html',
              success: function(data,textStatus,jqXHR)
                 {
                        $("body").html(data);
                          }
                    });
  }


  $("#home").click(function() {
    $.ajax({

      url: "/logout",
      type: "POST",
      //dataType: 'JSON',
      success: function(response)
      {
        if(response.status==true)
            homepage();
      },
      error: function(error) {
        console.log("page was not loaded ", error);
      }
  });

});

$.ajax({
   url: "/checkpage",
   type: "POST",
    //dataType: 'JSON',
   success: function(response) {
    console.log("page was loaded ",response);
     if(response.status==true)
        setResult();
    },
  error: function(error) {
    console.log("page was not loaded ", error);
  },
  complete: function(xhr,status)
  {
    console.log("request is completed");
  }
});




  $("#submit").click(function()
  {
    var name = $("#name").val();
    var email_id = $("#email_id").val();
    var password1 = $("#Password").val();
    var password2 = $("#rPassword").val();
    var signUp={
             name:name,
             email:email_id,
             password1:password1,
             password2:password2
        };
      ajaxCall(signUp,"signup");
  });

  $("#login1").click(function() {
    var userEmail = $("#email_id").val();
    var userPassword = $("#password").val();
    var login={
      email:userEmail,
      password:userPassword
    };
     ajaxCall(login,"login");
});



});


function setResult()
{
  $.ajax({
          url:"../view/success.html",
            //async:false,
            //type:"GET",
              dataType:'html',
              success: function(data,textStatus,jqXHR)
                 {
                        $("body").html(data);
                          }
                    });
}

function ajaxCall(userPassedObject,page)
{
  $.ajax({

    url: "/"+page,
    type: "POST",
    dataType: 'JSON',
    data:userPassedObject,
    success: function(response) {
      console.log(response.msg);
      console.log('page was loaded', response);
      $(".validation").remove();
      if(response.status==true && page=="login")
      {
         setResult();
      }
     else if(response.msg=="email should not be empty" && page=="login")
      {
        console.log("working fine");
         $("#email_id").after("<p class='validation' style='color:red;'>Please enter email address</p>")
        //$("#login1").after(response.msg);
      }
      else if(response.msg=="password should not be empty" && page=="login")
       {
         console.log("working fine");
          $("#password").after("<p class='validation' style='color:red;'>Please enter your password</p>")
         //$("#login1").after(response.msg);
       }
    },
    error: function(error) {
      console.log("page was not loaded ", error);
    }
});
};



  function homepage()
  {
    $.ajax(
          {
            url:"../index.html",
              //async:false,
              type:"GET",
                dataType:'html',
                success: function(response)
                   {
                          $("body").html(response);
                        },
                error:function(error)
                {
                  console.log("page was not loaded ",error);
                },
                complete:function(xhr,status)
                {
                  console.log("the request is completed");
                }
                      });
  }


//}
