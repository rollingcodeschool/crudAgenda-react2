import Contacto from "./classContacto.js"

//declaro variables globales


const modalContacto = new bootstrap.Modal(document.getElementById('contactModal'));
const btnAgregar = document.querySelector('.btn-primary')
const formulario = document.getElementById('contactForm');
const nombre = document.querySelector('#nombre')
const apellido = document.querySelector('#apellido')
const email = document.querySelector('#email')
const apodo = document.querySelector('#apodo')
const telefono = document.querySelector('#telefono')
const direccion = document.querySelector('#direccion')
const imagen = document.querySelector('#urlImagen')
const listaContactos = JSON.parse(localStorage.getItem('agendaKey')) || []
console.log(listaContactos);

//funciones
function abrirModalContacto(){
    modalContacto.show()
}

function crearContacto(e){
    e.preventDefault();
    //validar los datos del formulario
    //crear el objeto
    const nuevoContacto = new Contacto(nombre.value,apellido.value, email.value, telefono.value, apodo.value, direccion.value, imagen.value)
    //guardar el contacto nuevo en la lista de contactos
    listaContactos.push(nuevoContacto)
    console.log(listaContactos)
    //guardar en localstorage
    guardarEnLocalStorage();
    //limpiar el formulario
    limpiarFormulario();
}

function limpiarFormulario(){
    formulario.reset();
}

function guardarEnLocalStorage(){
    localStorage.setItem('agendaKey', JSON.stringify(listaContactos))
}

//el resto de la logica del proyecto
btnAgregar.addEventListener('click', abrirModalContacto);
formulario.addEventListener('submit', crearContacto)
