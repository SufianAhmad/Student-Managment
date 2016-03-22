$(function(){

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
        "render": function (data, type, row) {
          return '<button><i class="fa fa-pencil-square-o"></i></button>'
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
    // get id of clicked row
    var id = ($(this).parent().parent().find("td.sorting_1").text());
    console.log("On click:" + id);
    // ajax request to delete from db
    $.ajax({ 
      type: "DELETE",
      url: "https://api.mongolab.com/api/1/databases/mydb/collections/students/"+ id +"?apiKey=ftIHhADklaeFUeTw4YzKZdlb_MWQYfGO",
      contentType: "application/json; charset=utf-8",
      success: function (data) { 
        console.log(id);
      }
    });
  });
});
$("#btnCancel").on("click", function(){
  $('#myModalNorm').modal('toggle');
  $('#formID').trigger("reset");
});
