$(function(){

  var t = $('#example').DataTable({
    "ajax": {
      type: "GET",
      url: "https://api.mongolab.com/api/1/databases/mydb/collections/students?apiKey=ftIHhADklaeFUeTw4YzKZdlb_MWQYfGO",
      "dataSrc":""
    },
    "columns": [
      { "data": "Full_Name" },
      { "data": "Degree" },
      { "data": "Session" },
      { "data": "edit" },
      { "data": "del" }
    ]
  });
  $("#btnSubmit").on("click", function(e){
    e.preventDefault();
    var fullname = $("#fullName").val(),
      degree = $("#programDegree").val(),
      dSession = $("#programSession").val();
    var obj = {
      Full_Name: fullname,
      Degree: degree,
      Session: dSession
    };
  });
});
$("#btnCancel").on("click", function(){
  $('#myModalNorm').modal('toggle');
  $('#formID').trigger("reset");
});
