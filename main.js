///////CARD  CONTEINER ---id= "card-conteiner"///////////////////////////////////////

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


// Renderizo cards 
function pintarServicios() {
    for (const servicio of serviciosJSON) {
        let conteinerCards = document.createElement("div");
        conteinerCards.innerHTML = `<h5 style="display: none"> id: ${servicio.id}</h5>
                              <h5>  ${servicio.nombre}</h5>
                              <h2> $ ${servicio.precio}</h2>
                              <button id="${servicio.id}"> Adquirir</button> `;

        mainConteinerCards.appendChild(conteinerCards);

        //evento boton adquirir con js
        document.getElementById(`${servicio.id}`).onclick = () => agregarAlCarrito(`${servicio.id}`);

    }
}

//Tabla renderizada con JQuery
function agregarAlCarrito(id) {
    carro.push(serviciosJSON[id - 1]);
    console.log(carro);
    $("#resumen").append(`
                      <tr class="fila">
                      <td>${(serviciosJSON[id-1]).id}</td>
                      <td>${(serviciosJSON[id-1].nombre)}</td>
                      <td  id="precio">${(serviciosJSON[id-1].precio)}</td>
                      
            
                      </tr>`)


    addEvent_borrar();
    totalCarro();

    //Lo agrego al Local Storage
    localStorage.setItem("Carro", JSON.stringify(carro));
}

//Borro cada item de la tabla

function addEvent_borrar() {

    let btnDelete = document.querySelectorAll('.delete');

    console.log(btnDelete);

    btnDelete.forEach(element => {

        element.addEventListener('click', borraLinea);

        function borraLinea() {

            element.parentNode.parentNode.remove();

            for (const item of carro) {
                if (
                    element.closest("td").previousElementSibling
                    .previousElementSibling.textContent == item.nombre) {
                    let indice = carro.indexOf(item);
                    carro.splice(indice, 1);
                    console.log(indice);



                    totalCarro();

                }

            }

        }

    });

}












// Cantidad de dinero y servicios contratados


function totalCarro() {
    let total = 0;
    for (const serv of carro) {
        total += serv.precio;
        console.log(total);
    }
    precioUnitario.innerHTML = total;
    totalServicios.innerHTML = carro.length;

}





const tableConteiner = document.getElementById("resumen-total");

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


//Boton recalculando
reiniciar.onclick = () => {
    carro = [];
    precioUnitario.innerHTML = "0";
    totalServicios.innerHTML = "No ha contratado nada";
    $('.fila').remove();


    console.log(carro);

    //localStorage.removeItem("carro");

}





//Formulario Footer validacion
//Funcion llamada desde linea 210 HTML Form
function validacion() {
    var name, email, telefono, expresion;
    name = document.getElementById("name").value;
    email = document.getElementById("email").value;
    telefono = document.getElementById("telefono").value;
    expresion = /\w+@\w+\.+[a-z]/;

    if (name === "" || email === "" || telefono === "") {
        alert("Todos los campos son obligatorios");
        return false;

    } else if (name.length > 25) {
        alert("Nombre largo");
        return false;
    } else if (email.length > 30) {
        alert("Mail incorrecto");
        return false;
    } else if (!expresion.test(email)) {
        alert("Mail no cumple");
        return false;

    } else if (isNaN(telefono)) {
        alert("Telefono invalido");
        return false;
    } else if (telefono.length > 20) {
        alert("Telefono largo");
    } else {

        const afirmativo = prompt("Genial!!Desea guardar los datos?");
        var name = name;
        if (afirmativo === "si") {
            localStorage.setItem("nombre", name)
            localStorage.getItem(name)
            alert("Hola" + " " + name + " " + "gracias por mirar nuestros servicios!")

        } else {
            sessionStorage.removeItem(name)

        }

    }


}
















//API DOLAR
//URL: https://api-dolar-argentina.herokuapp.com/