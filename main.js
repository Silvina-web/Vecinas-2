//Login con jq

$(document).ready(function(){
  $('#login').hide();

  $("#desplegable").click(function(){
      $("#login").slideToggle(1500);
  })
})

 class registro{
   constructor (usuario, contraseña, mail){
     this.usuario= usuario;
     this.contraseña=contraseña;
     this.mail=mail;

   }
}
const usuario1= new registro();

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



//PREVENT DEFAULT
  let submitBtn= document.getElementById("enviar");
  submitBtn.addEventListener('click', (e)=>{
     e.preventDefault();
    console.log('Boton clickeado');
    console.log (e.target);
  }
  )

//////////termino  login con jquery///////////

//---CARD  CONTEINER ---id= "card-conteiner"---------------
let serviciosJSON =[];
let carro = [];

const mainConteinerCards = document.getElementById("card-conteiner");
console.log(mainConteinerCards);

//json
const obtenerJson = () => {
  const miJson = "servicios.json";
  $.getJSON(miJson, function(respuesta, estado){
    if(estado == "success"){
      serviciosJSON= respuesta;
      console.log(serviciosJSON);
      pintarServicios();
    }
  });
}


obtenerJson();

function pintarServicios(){
    for( const servicio of serviciosJSON){
  let conteinerCards = document.createElement ("div");
  conteinerCards.innerHTML = `<h5> id: ${servicio.id}</h5>
                              <h5>  ${servicio.nombre}</h5>
                              <h2> $ ${servicio.precio}</h2>
                               <button id= "${servicio.id}"> Adquirir</button> `;

mainConteinerCards.appendChild(conteinerCards);

//evento boton adquirir con js
document.getElementById(`${servicio.id}`).onclick =()=> agregarAlCarrito(`${servicio.id}`);



}
}






//Tabla renderizada con JQuery
function agregarAlCarrito(id){
   carro.push(serviciosJSON[id-1]);
   console.log(carro);
     $("#resumen").append(`
                     <tr>
                      <td>${(serviciosJSON[id-1]).id}</td>
                      <td>${(serviciosJSON[id-1].nombre)}</td>
                      <td><input type ="number"  value= 1 id="multiplicador"></input></td>
                       <td  id="precio">${(serviciosJSON[id-1].precio)}</td>

                      <td><button class="btn btn-danger delete">x</button></td>
                      </tr>`)

 //Borrar item con Jquery
     $(".delete").click(function (e){

       e.target.parentElement.parentElement.remove();
       totalCarro();
       console.log(e);
})
document.getElementById("multiplicador").addEventListener('change', cambiarCantidad);
 totalCarro();

//local storage.setItem("clave", "valor")
 localStorage.setItem("Carro",JSON.stringify(carro));
}


//Cantidad no menos a 1
function cambiarCantidad (event){
 const input=  event.target;
 if(input.value <=0){
   input.value=1;
 }
 totalCarro();
}


function totalCarro(){
 let total = 0;
 for( const serv of carro){
    total += serv.precio;
    console.log(total);
  
}
precioUnitario.innerHTML= total;
totalServicios.innerHTML= carro.length;
}

const tableConteiner = document.getElementById("resumen-total");  

let precioTotal = document.createElement("h2");
precioTotal.innerHTML = "El total de su compra es $";
tableConteiner.appendChild(precioTotal);

let precioUnitario = document.createElement("h3");
precioUnitario.innerHTML =  "0";
tableConteiner.appendChild(precioUnitario);

let cantidadServicios = document.createElement("h5");
cantidadServicios.innerHTML ="Total servicios: ";
tableConteiner.appendChild(cantidadServicios);

let totalServicios = document.createElement("h2");
totalServicios.innerHTML = "0";
tableConteiner.appendChild(totalServicios);


let reiniciar = document.createElement("button");
reiniciar.innerHTML = "Recalculando";
reiniciar.setAttribute("id","reiniciar");
tableConteiner.appendChild(reiniciar);

reiniciar.onclick =()=>{

  carro = [];
  precioUnitario.innerHTML= "0";
  totalServicios.innerHTML= "No ha contratado nada";
  

  
  localStorage.removeItem("carro");

}

console.log(carro);








//Formulario Footer validacion
//Funcion llamada desde linea 210 HTML Form
function validacion(){
 var  name,email,telefono,expresion;
  name = document.getElementById("name").value;
  email=document.getElementById("email").value;
  telefono=document.getElementById("telefono").value;
  expresion= /\w+@\w+\.+[a-z]/;

  if (name==="" || email ==="" || telefono===""){
    alert("Todos los campos son obligatorios");
    return false;

  }
  else if (name.length > 25){
    alert("Nombre largo");
    return false;
  }
  else if (email.length > 30){
    alert("mail incorrecto");
    return false;
  } else if(!expresion.test(email)){
    alert("Mail no cumple");
    return false;

  }
  else if (isNaN(telefono)){
    alert("telefono invalido");
    return false;
  } else if (telefono.length > 20){
    alert("Telefono largo");
  }
  else{
    //no se si esto hace algo 
    const afirmativo=prompt("Genial!!Desea guardar los datos?");
    var name=name;
     if(afirmativo ==="si"){
       localStorage.setItem("nombre",name)
       localStorage.getItem(name)
       alert("hola" + " "+ name)
      
     }else{
       sessionStorage.removeItem(name)

     }

  }
  

}
















//API DOLAR
//URL: https://api-dolar-argentina.herokuapp.com/
