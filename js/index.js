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
// });		

// $(function(){
	$("#added").on("click", function(){

		var Firstname = $('#firstName').val(),
				Lastname = $('#lastName').val(),
				Email = $('#mail').val(),
				pass = document.getElementById("pass").value;
				Confirm = document.getElementById("conPass").value;

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
		var objc = {
			First_name: Firstname,
			Last_name: Lastname,
			email: Email,
			password: pass
		};		
		//console.log(objc);
		
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