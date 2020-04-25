const path = "http://localhost:5000";
var apartId = '';
var allApartments ;
var objToEdit ;
//profile creation module
   $('#createApart').click(function(e){

      e.preventDefault()
      var apartNo = $('#apartNo').val();     
      var apartName = $('#apartName').val();
      var floorNo = $('#floorNo').val();
      var buildingName = $('#buildingName').val();
      var city = $('#city').val();
      var address = $('#address').val();
      var apartAreaSqFeet = $('#apartAreaSqFeet').val();
      var noOfRooms = $('#noOfRooms').val();
      var balcony = $('#balcony').prop("checked")
    
        let apartment = {
        
            "apartNo" : apartNo,
            "apartName" : apartName,
            "floorNo" : floorNo,
            "buildingName" : buildingName,
            "address" : address,
            "city": city,
            "apartAreaSqFeet" : apartAreaSqFeet,
            "noOfRooms": noOfRooms,
            "balcony": balcony
        }

        
      validation(apartment);
      callInsertApi(apartment);
 
   })
//end of the profile creation module 

//validations
$(document).on('change','#apartNo', function(){
  $('#apartNoSpan').html('')
})
$(document).on('change','#apartName', function(){
  $('#apartNameSpan').html('')
})
$(document).on('change','#floorNo', function(){
  $('#floorNoSpan').html('')
})
$(document).on('change','#buildingName', function(){
  $('#buildingNameSpan').html('')
})
$(document).on('change','#city', function(){
  $('#citySpan').html('')
})
$(document).on('change','#address', function(){
  $('#addressSpan').html('')
})
$(document).on('change','#apartAreaSqFeet', function(){
  $('#apartAreaSqFeetSpan').html('')
})
$(document).on('change','#noOfRooms', function(){
  $('#noOfRoomsSpan').html('')
})


function validation(apartment){
  var msg = 'Field must not be empty!'
  // console.log(apartment)
  if(apartment.apartNo == ""){
    $('#apartNoSpan').html(msg)
  }
  if(apartment.apartName == ""){
    $('#apartNameSpan').html(msg)
  }
  if(apartment.floorNo == ""){
    $('#floorNoSpan').html(msg)
  }
  if(apartment.buildingName == ""){
    $('#buildingNameSpan').html(msg)
  }
  if(apartment.city == ""){
    $('#citySpan').html(msg)
  }
  if(apartment.address == ""){
    $('#addressSpan').html(msg)
  }
  if(apartment.apartAreaSqFeet == ""){
    $('#apartAreaSqFeetSpan').html(msg)
  }
  if(apartment.noOfRooms == ""){
    $('#noOfRoomsSpan').html(msg)
  }

}

function callInsertApi(apartment){
  if(apartment.apartNo != "" && apartment.apartName != "" && apartment.floorNo != "" && apartment.buildingName != "" && apartment.city != "" && apartment.address != "" && apartment.apartAreaSqFeet != "" && apartment.noOfRooms != ""){

    $.post(`/post`, apartment, function(data, status){
      if(data){
        alert('Successfully Submitted!')
        location.reload()
      }
      
    })
    
  }
}


//get apartment
$(document).ready(function(){
   $.get(`/apartment`, function(data, status){
      allApartments = data;
      var count = 0 ;
      data.forEach(apartment => {
       
        // if(apartment.balcony == true){
        //   apartment.balcony = "Yes"
        // }
        // else{
        //   apartment.balcony = "No"
        // }

         const html = `<tr  id = ${count} class= 'apartRow'><td>${apartment.apartNo}</td><td>${apartment.apartName}</td><td>${apartment.floorNo}</td><td>${apartment.buildingName}</td><td>${apartment.address}</td><td>${apartment.city}</td><td>${apartment.apartAreaSqFeet}</td><td>${apartment.noOfRooms}</td><td>${apartment.balcony}</td></tr>`

         $('#mytable').append(html)

         count ++ ;


      });


   })
})
//end of module

//select the row
$(document).on('click','tr.apartRow', function(){
   $(".contra").removeClass("contra");
   $(this).closest('tr').addClass("contra");
      apartId = $(this).closest('tr').attr('id');
      console.log(apartId)
        $('#apartNo').val($(this).find('td:eq(0)').html());     
        $('#apartName').val($(this).find('td:eq(1)').html());
        $('#floorNo').val($(this).find('td:eq(2)').html());
        $('#buildingName').val($(this).find('td:eq(3)').html());
        $('#city').val($(this).find('td:eq(4)').html());
        $('#address').val($(this).find('td:eq(5)').html());
        $('#apartAreaSqFeet').val($(this).find('td:eq(6)').html());
        $('#noOfRooms').val($(this).find('td:eq(7)').html());
        
        if($(this).find('td:eq(8)').html() == "true"){
          $("input:checkbox").prop('checked', true);
        }
        else{
          $("input:checkbox").prop('checked', false);
        }


        objToEdit={
          "apartNo" : $(this).find('td:eq(0)').html(),
          "apartName" : $(this).find('td:eq(0)').html(),
          "floorNo" : $(this).find('td:eq(0)').html(),
          "buildingName" : $(this).find('td:eq(0)').html(),
          "address" : $(this).find('td:eq(0)').html(),
          "city": $(this).find('td:eq(0)').html(),
          "apartAreaSqFeet" : $(this).find('td:eq(0)').html(),
          "noOfRooms": $(this).find('td:eq(0)').html(),
          "balcony": $(this).find('td:eq(0)').html()
        }

        console.log('Object to be edited',objToEdit)
});
//end module

//Delete Apartment 
$('#delApart').click(function(e){
   e.preventDefault();
   if(!apartId){
     alert('First select the Apartment ')
   }else{
    let appart = {
      index : apartId
    }
    $.post(`/appdel`, appart, function(data, status){
      if(data){
        alert(data)
        location.reload()
      }  
      })
   location.reload()
   }
   
})
//end of delete profile module

// Edit profile
$("#editApart").click(function(e){
    e.preventDefault();
    if(!apartId){
      alert('First select the Apartment ')
    }else{
    var apartNo = $('#apartNo').val();     
    var apartName = $('#apartName').val();
    var floorNo = $('#floorNo').val();
    var buildingName = $('#buildingName').val();
    var city = $('#city').val();
    var address = $('#address').val();
    var apartAreaSqFeet = $('#apartAreaSqFeet').val();
    var noOfRooms = $('#noOfRooms').val();
    var balcony = $('#balcony').prop("checked")

      let apartment = {
      
          "apartNo" : apartNo,
          "apartName" : apartName,
          "floorNo" : floorNo,
          "buildingName" : buildingName,
          "address" : address,
          "city": city,
          "apartAreaSqFeet" : apartAreaSqFeet,
          "noOfRooms": noOfRooms,
          "balcony": balcony
      }

      
    validation(apartment);
     callEditApi(apartment);
    }

})


function callEditApi(apartment){
  if(apartment.apartNo != "" && apartment.apartName != "" && apartment.floorNo != "" && apartment.buildingName != "" && apartment.city != "" && apartment.address != "" && apartment.apartAreaSqFeet != "" && apartment.noOfRooms != ""){

    let appart = {
      apartment,
      index : apartId
    }

      $.post(`/app`, appart, function(data, status){
      if(data){
        alert(data)
        location.reload()
      }  
      })
    }
   

  }

