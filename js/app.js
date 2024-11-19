import Contacto from "./classContacto.js"

//declaro variables globales
const nuevoContacto = new Contacto('juan','perez', 'juanperez@mail.com','1234567890','juancho','Tucuman, argentina', 'https://universe.rollingcodeschool.com')

const modalContacto = new bootstrap.Modal(document.getElementById('contactModal'));
const btnAgregar = document.querySelector('.btn-primary')

//funciones
function abrirModalContacto(){
    modalContacto.show()
}

//el resto de la logica del proyecto
btnAgregar.addEventListener('click', abrirModalContacto)
