$(function(){
  var mailId;
  // Login
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
      },
      error: function(data){
        console.log(data);
      }
    });
  });
  $.idleTimer(6000);
  // insert update and delete values in db and table
  var table = $('#example').DataTable({
    // show data in table on page load
    "ajax": {
      type: "GET",
      url: "https://api.mongolab.com/api/1/databases/mydb/collections/students?apiKey=ftIHhADklaeFUeTw4YzKZdlb_MWQYfGO",
      "dataSrc":""
    },
    "columns": [
      { "data": "_id.$oid"},
      { "data": "Full_Name" },
      { "data": "Degree" },
      { "data": "Session" },
      { "data": "edit" },
      { "data": "del" }
    ],
    "columnDefs": [
      { 
        className: "dt-body-center", "targets": [ 1, 2, 3, 4, 5 ] 
      },
      {
        "render": function (data, type, row) {
          return '<button class = "edit"><i class="fa fa-pencil-square-o"></i></button>'
        },
        "targets": 4
      },
      {
        "render": function (data, type, row) {
          return '<button class = "delet"><i class="fa fa-times"></i></button>'
        },
        "targets": 5
      }
    ]
  });
  $('#example tbody').on( 'click', 'button.delet', function () {
    var row = $(this).parents('tr');
    // get id of clicked row
    var id = ($(this).parent().parent().find("td.sorting_1").text());
    // ajax request to delete from db
    $.ajax({ 
      type: "DELETE",
      url: "https://api.mongolab.com/api/1/databases/mydb/collections/students/"+ id +"?apiKey=ftIHhADklaeFUeTw4YzKZdlb_MWQYfGO",
      contentType: "application/json; charset=utf-8",
      success: function (data) { 
        console.log(id);
        row.remove();
        $(".bb-alert")
          .addClass("alert-success")
          .text("Row has been deleted!")
          .delay(200)
          .fadeIn()
          .delay(4000)
          .fadeOut()
      }
    });
  });
  var name, degr, session, id, row;
  $('#example tbody').on( 'click', 'button.edit', function () {
    
    name = $(this).parents('tr').find('td:nth-child(2)').text();
    degr = $(this).parents('tr').find('td:nth-child(3)').text();
    session = $(this).parents('tr').find('td:nth-child(4)').text();
    id = $(this).parents('tr').find("td.sorting_1").text();  
    row = $(this).parents('tr');

    // console.log(name +" "+ degr +" "+ session +" " +id);
    $('#myModalEdit').modal('show');
    $('#editName').val(name);
    $('#editDegree').val(degr);
    $('#editSession').val(session);
  });
    $("#btnEdit").on("click", function(e){
      e.preventDefault();

    var objc = { 
      Full_Name: $('#editName').val(),
      Degree: $('#editDegree').val(),
      Session: $('#editSession').val() 
    }
    console.log(objc);

    $.ajax({ 
      type: "PUT",
      url: "https://api.mongolab.com/api/1/databases/mydb/collections/students/"+ id +"?apiKey=ftIHhADklaeFUeTw4YzKZdlb_MWQYfGO",
      data: JSON.stringify(objc),
      contentType: "application/json; charset=utf-8",
      success: function (data) {
        // console.log(data);
        
        table.cell(row.find('td:nth-child(2)')).data(data.Full_Name);
        table.cell(row.find('td:nth-child(3)')).data(data.Degree);
        table.cell(row.find('td:nth-child(4)')).data(data.Session);
        $('#myModalEdit').modal('toggle');
        $('#form-update').trigger("reset");

        $(".bb-alert")
        .addClass("alert-success")
        .text("Row has been updated!")
        .delay(200)
        .fadeIn()
        .delay(4000)
        .fadeOut()
      }
    });
  });
  // add new record
  $("#btnSubmit").on("click", function(e){
    e.preventDefault();
    var objc = {
      Full_Name: $("#fullName").val(),
      Degree: $("#programDegree").val(),
      Session: $("#programSession").val(),
      edit: "Edit",
      del: "Delete"
      };
    $.ajax({
      type: 'POST',
      url: "https://api.mongolab.com/api/1/databases/mydb/collections/students?apiKey=ftIHhADklaeFUeTw4YzKZdlb_MWQYfGO",
      data: JSON.stringify(objc),
      contentType: "application/json; charset=utf-8",
      success: function(result){
        $(".bb-alert")
        .addClass("alert-success")
        .text("New record has been inserted, Refresh page to view!")
        .delay(200)
        .fadeIn()
        .delay(4000)
        .fadeOut()
        },
      error:function(res){
        console.log("Bad thing happend! " + res.statusText);
      }
    });
    $('#myModalNorm').modal('toggle');
    $('#formID').trigger("reset");
  });
  $("#btnCancel").on("click", function(){
    $('#myModalNorm').modal('toggle');
    $('#formID').trigger("reset");
  });
});
