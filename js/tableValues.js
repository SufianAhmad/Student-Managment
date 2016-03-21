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
    ],
    "columnDefs": [
      {
        "render": function (data, type, row) {
          return '<span class = "editRow"><i class="fa fa-pencil-square-o"></i></span>'
        },
        "targets": 3
      },
      {
        "render": function (data, type, row) {
          return '<a href = "#" onclick=return alrt()><i class="fa fa-times"></i></a>'
        },
      "targets": 4
      }
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
  function alrt () {
    alert("clicked");
  }
});
$("#btnCancel").on("click", function(){
  $('#myModalNorm').modal('toggle');
  $('#formID').trigger("reset");
});
