function getUid(username){
	var uid = -1;
	$.ajax({
		type:"POST",
		url:"util/getuid.php",
		async:false,
		data: "username="+username,
		success:function(html){
			uid = html;
		}
	});
	return uid;
}

$(document).ready(function(){
	$("#add_err").css('display', 'none', 'important');
	 $("#login").click(function(){	
		  username=$("#user").val();
		  password=$("#pass").val();
		  $.ajax({
		   type: "POST",
		   url: "util/login.php",
			data: "name="+username+"&pwd="+password,
		   success: function(html){    
			if(html=='true')    {
				sessionStorage['username'] = username;
				$("#add_err").html(" <img src='img/loader.gif' /> Logged in with user"+sessionStorage['username']);
			 	window.location="game.php";
			}
			else    {
			$("#add_err").css('display', 'inline', 'important');
			 $("#add_err").html("Wrong username or password!");
			}
		   },
		   beforeSend:function()
		   {
			$("#add_err").css('display', 'inline', 'important');
			$("#add_err").html("<img src='img/loader.gif' /> Loading...");
		   }
		  });
		return false;
	});
	 $("#register").click(function(){	
		  username=$("#name").val();
		  password=$("#word").val();
		  $.ajax({
		   type: "POST",
		   url: "util/register.php",
			data: "name="+username+"&pwd="+password,
		   success: function(html){    
			if(html=='true')    {
				$("#add_err").css('display', 'inline', 'important');
				 $("#add_err").html("Account has been created succesfully!");
			}
			else    {
			$("#add_err").css('display', 'inline', 'important');
			 $("#add_err").html("That account already exists!");
			}
		   },
		   beforeSend:function()
		   {
			$("#add_err").css('display', 'inline', 'important');
			$("#add_err").html("<img src='img/loader.gif' /> Loading...");
		   }
		  });
		return false;
	});

	 var user = sessionStorage['username'];
	 var pathname = window.location.pathname.replace("/","");
	if (typeof user !== 'undefined'){
		sessionStorage['uid'] = getUid(user);
		document.title = user;
		if(pathname!="game.php"){
			window.location="game.php";
		}
	}else if(typeof user === 'undefined' && pathname != "index.php"){
		window.location="index.php";
	}
});
