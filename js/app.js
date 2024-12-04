import Contacto from "./classContacto.js";
import { validarCaracteres, validaremail } from "./validaciones.js";
// import Swal from 'sweetalert2'

//declaro variables globales

const modalContacto = new bootstrap.Modal(
  document.getElementById("contactModal")
);
const btnAgregar = document.querySelector(".btn-primary");
const formulario = document.getElementById("contactForm");
const nombre = document.querySelector("#nombre");
const apellido = document.querySelector("#apellido");
const email = document.querySelector("#email");
const apodo = document.querySelector("#apodo");
const telefono = document.querySelector("#telefono");
const direccion = document.querySelector("#direccion");
const imagen = document.querySelector("#urlImagen");
const listaContactos = JSON.parse(localStorage.getItem("agendaKey")) || [];
console.log(listaContactos);

let idContactoEditar = null;
let agregarNuevoContacto = true;

//funciones
function abrirModalContacto() {
  limpiarFormulario();
  agregarNuevoContacto = true;
  modalContacto.show();
}

function crearContacto() {
  //validar los datos del formulario
  if (validarCaracteres(nombre, 2, 50) && validaremail(email)) {
    //crear el objeto
    const nuevoContacto = new Contacto(
      nombre.value,
      apellido.value,
      email.value,
      telefono.value,
      apodo.value,
      direccion.value,
      imagen.value
    );
    //guardar el contacto nuevo en la lista de contactos
    listaContactos.push(nuevoContacto);
    console.log(listaContactos);
    //guardar en localstorage
    guardarEnLocalStorage();
    //limpiar el formulario
    limpiarFormulario();
    //dibuje una fila
    dibujarFila(nuevoContacto, listaContactos.length);
    //mostrar un cartel intuitivo para el usuario
    Swal.fire({
      title: "Contacto creado",
      text: `El contacto: ${nuevoContacto.nombre}, fue creado correctamente`,
      icon: "success",
    });
  } else {
    Swal.fire({
      title: "Ocurrio un error",
      text: `Debes corregir los datos del formulario`,
      icon: "error",
    });
  }
}

function limpiarFormulario() {
  formulario.reset();
  //reseteando la clase de mi formulario
  nombre.className = "form-control";
  email.className = "form-control";
}

function guardarEnLocalStorage() {
  localStorage.setItem("agendaKey", JSON.stringify(listaContactos));
}

function cargarDatosTabla() {
  //preguntar si el array tiene informacion
  if (listaContactos.length !== 0) {
    //dibujar una fila por cada elemento del array
    listaContactos.map((contacto, indice) => dibujarFila(contacto, indice + 1));
  }
}

window.borrarContacto = (id) => {
  console.log("desde la funcion borrar contacto");
  console.log(id);
  //en que posicion del array esta el contacto que quiero eliminar
  const posicionContacto = listaContactos.findIndex(
    (contacto) => contacto.id === id
  );
  console.log(posicionContacto);
  //splice borra el contacto buscado del array
  listaContactos.splice(posicionContacto, 1);
  //actualizar el localstorage
  guardarEnLocalStorage();
  //borrar la fila de la tabla
  const tbody = document.querySelector("tbody");
  tbody.removeChild(tbody.children[posicionContacto]);
  // actualizar las filas de la tabla
};

function dibujarFila(contacto, fila) {
  console.log(contacto);
  //traigo la tabla
  const tbody = document.querySelector("tbody");
  tbody.innerHTML += `
    <tr>
              <th scope="row">${fila}</th>
              <td>${contacto.nombre}</td>
              <td>${contacto.apellido}</td>
              <td>${contacto.email}</td>
              <td>${contacto.telefono}</td>
              <td>
                <button class="btn btn-warning" onclick="prepararDatos('${contacto.id}')">
                  <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-danger" onclick="borrarContacto('${contacto.id}')">
                  <i class="bi bi-x-lg"></i>
                </button>
                <button class="btn btn-info" onclick="verDetalle('${contacto.id}')"><i class="bi bi-eye"></i></button>
              </td>
            </tr>
    `;
}

function editarContacto() {
  //1- buscaria la posicion de la pelicula en el array
  let posicionContacto = listaContactos.findIndex(
    (itemContacto) => itemContacto.id === idContactoEditar
  );
  console.log(posicionContacto);
  //todo: validar los datos
  //2- editar los valores de la pelicula dentroe del array
  listaContactos[posicionContacto].nombre = nombre.value;
  listaContactos[posicionContacto].apellido = apellido.value;
  listaContactos[posicionContacto].email = email.value;
  listaContactos[posicionContacto].telefono = telefono.value;
  listaContactos[posicionContacto].direccion = direccion.value;
  listaContactos[posicionContacto].imagen = imagen.value;
  listaContactos[posicionContacto].apodo = apodo.value;

  //3- actualizar el localstorage
  guardarEnLocalStorage();
  //4-actualizar la fila
  let tablaContacto = document.querySelector("tbody");
  console.log(tablaContacto.children[posicionContacto].children[1]);
  tablaContacto.children[posicionContacto].children[1].innerHTML = nombre.value;
  tablaContacto.children[posicionContacto].children[2].innerHTML =
    apellido.value;
  tablaContacto.children[posicionContacto].children[3].innerHTML = email.value;
  tablaContacto.children[posicionContacto].children[4].innerHTML =
    telefono.value;
  //5-mostrar un cartel al usuario
  Swal.fire(
    "Contacto modificado",
    "El contacto fue modificado exitosamente",
    "success"
  );
  //6- limpiar el formulario y cerrar el modal
  limpiarFormulario();
  modalContacto.hide();
}

window.verDetalle = (id) => {
  //BOM
  // console.log(window.location)
  window.location.href = `${window.location.origin}/pages/detalleContacto.html?id=${id}`;
};

window.prepararDatos = (id) => {
  const contactoBuscado = listaContactos.find(
    (itemContacto) => itemContacto.id === id
  );
  console.log(contactoBuscado)
  //mostrar la ventana modal
  idContactoEditar = id;
  nombre.value = contactoBuscado.nombre;
  apellido.value = contactoBuscado.apellido;
  apodo.value = contactoBuscado.apodo;
  email.value = contactoBuscado.email;
  direccion.value = contactoBuscado.direccion;
  telefono.value = contactoBuscado.telefono;
  imagen.value = contactoBuscado.imagen;
  modalContacto.show();
  //cambiamos el valor de la variable altaPelicula
  agregarNuevoContacto = false;
};

function prepararFormulario(e) {
  e.preventDefault();
  console.log(agregarNuevoContacto);
  if (agregarNuevoContacto) {
    crearContacto();
  } else {
    editarContacto();
  }
}

//el resto de la logica del proyecto
btnAgregar.addEventListener("click", abrirModalContacto);
formulario.addEventListener("submit", prepararFormulario);
cargarDatosTabla();
