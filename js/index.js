$(function(){
	$("#signUp").hide();
	$("#SignUp").click(function() {
		$("#signIn").slideUp("slow", function() {
			$("#signUp").slideDown("slow");
		});
	});
	$("#SignIn").click(function() {
		$("#signUp").slideUp("slow", function() {
			$("#signIn").slideDown("slow");
			});
	});

	$("#added").on("click", function(){

		var Firstname = $('#firstName').val(),
				Lastname = $('#lastName').val(),
				Email = $('#mail').val(),
				pass = $("#pass").val();
				Confirm = $("#conPass").val(); 		

		if (Firstname == "") {
				alert("Fisrt Name is empty");
				return;
		} else if (Lastname == "") {
				alert("Last Name is empty");
				return;
		} else if (Email == "") {
				alert("Email is required with correct formate");
				return;
		} else if (pass == "") {
				alert("Password is required");
				return
		} else if (pass != Confirm) {
				alert("Password missmatch");
				return;
		};
		// encrypt password using MD5 technique 
		$("#encryped").val(CryptoJS.AES.encrypt(pass, "/"));
			var enc = $("#encryped").val();
		var objc = {
			First_name: Firstname,
			Last_name: Lastname,
			email: Email,
			password: enc
		};		
		
		///// ajax request to insert data in mongodb /////
		$.ajax({
			type: 'POST',
	    url: "https://api.mongolab.com/api/1/databases/mydb/collections/mydb?apiKey=ftIHhADklaeFUeTw4YzKZdlb_MWQYfGO",
	    data: JSON.stringify(objc),
	    datatype: 'json',
	    contentType: "application/json; charset=utf-8",
	    success: function(result){
	    	console.log(result);
	    },
	    error:function(res){
	        console.log("Bad thing happend! " + res.statusText);
	    }
	  });
	});
});