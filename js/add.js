$(function(){
  $("#btnSubmit").on("click", function(e){
    var table = $('#example').DataTable();

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
          // console.log(result);
          // console.log(result.Full_Name);
          table.row.add( [
            result.Full_Name,
            result.Degree,
            result.Session,
            result.edit,
            result.del
         ] ).draw();
      },
      error:function(res){
        console.log("Bad thing happend! " + res.statusText);
      }
    });
      e.preventDefault();
    $('#myModalNorm').modal('toggle');
    $('#formID').trigger("reset");
  });
});