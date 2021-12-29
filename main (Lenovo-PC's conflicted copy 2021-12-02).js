$(document).ready(function() {
    $('#login').hide();

    $("#desplegable").click(function() {
        $("#login").slideToggle(1500);
    })
})


let intentos = 1;

function validar() {
    //Variables
    let usuario = $("#nombre").val();
    let contraseña = $("#pass").val();
    let mail = $("#mail").val();

    //intentos
    if (intentos <= 3) {
        if (usuario == "Silvina" && contraseña == "123" && mail == "silvina.marcantoni@gmail.com") {
            swal("Validacion",
                "Bienvenida",
                "success");
            intentos = 1;
        } else {
            swal("Validacion",
                "No no",
                "error");
            intentos++;

        }

    } else {
        swal("validacion",
            "Usuario bloquedo",
            "error");
    }
}
//PREVENT DEFAULT
let submitBtn = document.getElementById("enviar");
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Boton clickeado');
    console.log(e.target);
})



//---CARD  CONTEINER ---id= "card-conteiner"---------------
let serviciosJSON = [];
let carro = [];

const mainConteinerCards = document.getElementById("card-conteiner");
console.log(mainConteinerCards);

//json
const obtenerJson = () => {
    const miJson = "servicios.json";
    $.getJSON(miJson, function(respuesta, estado) {
        if (estado == "success") {
            serviciosJSON = respuesta;
            console.log(serviciosJSON);
            pintarServicios();
        }
    });
}


obtenerJson();

function pintarServicios() {
    for (const servicio of serviciosJSON) {
        let conteinerCards = document.createElement("div");
        conteinerCards.innerHTML = `<h5> id: ${servicio.id}</h5>
                              <h5>  ${servicio.nombre}</h5>
                              <h2> $ ${servicio.precio}</h2>
                               <button id= "${servicio.id}"> Adquirir</button> `;

        mainConteinerCards.appendChild(conteinerCards);
        //evento boton adquirir

        document.getElementById(`${servicio.id}`).onclick = () => agregarAlCarrito(`${servicio.id}`);

    }
}


function agregarAlCarrito(id) {
    carro.push(serviciosJSON[id - 1]);
    console.log(carro);
    $("#resumen").append(`
                     <tr>
                      <td>${(serviciosJSON[id-1]).id}</td>
                      <td>${(serviciosJSON[id-1].nombre)}</td>
                      <td><input type="number" value= 1 id="multiplicador"></input></td>
                      </td>
                      <td>${(serviciosJSON[id-1].precio)}</td>
                      <td><button id="btn-eliminar">Eliminar</button></td>
                      </tr>
  `)

    document.getElementById("multiplicador").addEventListener('change', cambiarCantidad);
    totalCarro();


    document.getElementById("btn-eliminar").addEventListener('click', (event) => {
        console.log(event.target.parentElement.parentElement.remove());
    });
    localStorage.setItem("Carro", JSON.stringify(carro));
}

//cantidad no menor a 1
function cambiarCantidad(event) {
    const input = event.target;
    if (input.value <= 0) {
        input.value = 1;
    }
}


function totalCarro() {
    let total = 0;
    for (const serv of carro) {
        total += serv.precio;
        console.log(total);

    }
    precioUnitario.innerHTML = total;
    totalServicios.innerHTML = carro.length;

}

const tableConteiner = document.getElementById("table");

let precioTotal = document.createElement("h2");
precioTotal.innerHTML = "El total de su compra es $";
tableConteiner.appendChild(precioTotal);

let precioUnitario = document.createElement("h3");
precioUnitario.innerHTML = "0";
tableConteiner.appendChild(precioUnitario);

let cantidadServicios = document.createElement("h5");
cantidadServicios.innerHTML = "Total servicios: ";
tableConteiner.appendChild(cantidadServicios);

let totalServicios = document.createElement("h2");
totalServicios.innerHTML = "0";
tableConteiner.appendChild(totalServicios);

let reiniciar = document.createElement("button");
reiniciar.innerHTML = "Recalculando";
reiniciar.setAttribute("id", "reiniciar");
tableConteiner.appendChild(reiniciar);

reiniciar.onclick = () => {
    carro = [];
    precioUnitario.innerHTML = "0";
    totalServicios.innerHTML = "No ha contratado nada";


    localStorage.removeItem("carro");

}
console.log(carro);