$(function(){

	$("#signin").on("click", function(){
		var LoginMail = $('#Logmail').val(),
			  LoginPass = $("#Logpass").val();
		console.log(LoginMail);
		console.log(LoginPass);
	
		$.ajax({
			type: 'GET',
	    url: "https://api.mongolab.com/api/1/databases/mydb/collections/mydb?apiKey=ftIHhADklaeFUeTw4YzKZdlb_MWQYfGO",
	    data: JSON.stringify(),
	    datatype: 'json',
	    contentType: "application/json; charset=utf-8",
	    success: function(result){
	    	console.log(result);

	    	jQuery.grep(result, function(obj) {
	  			// decrypt password
	  			var decryptionText = obj.password;
	  			$('#decryptedtxt').val((CryptoJS.AES.decrypt(decryptionText, "/")).toString(CryptoJS.enc.Utf8));
  				var dec = $("#decryptedtxt").val();
  				console.log(dec);

	  			if (obj.email !== LoginMail) {
	  				console.log("Mail id is not OK");
	  				return;
	  			}else if(dec !== LoginPass)
	  			{
	  				console.log("Password is Incorrect");
	  				return;
	  			};
	  			window.location.href='Home.html';
	  			// console.log(obj.email);
	  			// console.log(obj.password);
				});
	    },
	    error:function(res){
	      console.log("Bad thing happend! " + res.statusText);
	    }
	  });
  });
});