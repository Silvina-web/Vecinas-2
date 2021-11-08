$(document).ready(function(){
  $('#login').hide();

  $("#desplegable").click(function(){
      $("#login").slideToggle(1500);
  })
})


let intentos = 1;
function validar(){
//Variables
  let usuario = $("#nombre").val();
  let contraseña = $("#pass").val();
  let mail =$("#mail").val();

//intentos
  if(intentos <=3){
       if(usuario == "Silvina" && contraseña == "123" && mail == "silvina.marcantoni@gmail.com"){
         swal ("Validacion",
               "Bienvenida",
                "success");
                intentos=1;
       }else{
        swal ("Validacion",
               "No no",
              "error");
                intentos ++; 

       }

       }else{
         swal("validacion",
               "Usuario bloquedo",
               "error");
       }
  }








  
