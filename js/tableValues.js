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
      }
    });
  });
});
$("#btnCancel").on("click", function(){
  $('#myModalNorm').modal('toggle');
  $('#formID').trigger("reset");
});
