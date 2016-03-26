$(function(){
  var mailId;
  $("#signin").on("click", function(){
    var LoginMail = $('#Logmail').val(),
      LoginPass = $("#Logpass").val();
    console.log(LoginMail);
    console.log(LoginPass);
    var number = Math.floor(Math.random() * 6).toString();

    $('#encryped').val(CryptoJS.AES.encrypt(number, "/"));
    var tokk = $('#encryped').val();
  
    $.ajax({
      type: 'GET',
      url: "https://api.mlab.com/api/1/databases/mydb/collections/mydb?q={'email':'"+ LoginMail +"'}&apiKey=ftIHhADklaeFUeTw4YzKZdlb_MWQYfGO",
      datatype: 'json',
      contentType: "application/json; charset=utf-8",
      success: function(result){
        console.log(result);
        var decryptionText = result[0].password;
        mailId = result[0].email;
        // decrypt password
        $('#decryptedtxt').val((CryptoJS.AES.decrypt(decryptionText, "/")).toString(CryptoJS.enc.Utf8));
        var dec = $("#decryptedtxt").val();
        if (dec === LoginPass) {
          console.log(dec);
        } else{
            $(".bb-alert")
            .addClass("alert-danger")
            .text("Incorrect Email or Password!")
            .delay(200)
            .fadeIn()
            .delay(4000)
            .fadeOut()
        };
        // to set session tokken
        $.ajax({
          type: 'PUT',
          url: "https://api.mlab.com/api/1/databases/mydb/collections/mydb?q={'email':'"+ mailId +"'}&apiKey=ftIHhADklaeFUeTw4YzKZdlb_MWQYfGO",
          data: JSON.stringify({ "$set" : { "tokken": tokk }}),
          datatype: 'json',
          contentType: "application/json; charset=utf-8",
          success: function(result){
            console.log("Request is successeded: " + result)
            window.location.href='Home.html';
          },
          error: function(data){
            console("Unseccessfull request: "+ data);
          }
        });
      },
      error:function(res){
        console.log("Bad thing happend! " + res.statusText);
      }
    });
    // ajax request to set session tokken empty in db
    $( document ).on( "idle.idleTimer", function(event, elem, obj){
      $.ajax({
        type: 'PUT',
        url: "https://api.mlab.com/api/1/databases/mydb/collections/mydb?q={'email':'"+ mailId +"'}&apiKey=ftIHhADklaeFUeTw4YzKZdlb_MWQYfGO",
        data: JSON.stringify({ "$set" : { "tokken": "" }}),
        datatype: 'json',
        contentType: "application/json; charset=utf-8",
        success: function(result){
          console.log("Tokken reset: "+ result);
          window.location.replace("index.html");
        }
      });
    });
    $.idleTimer(6000);
  });
});