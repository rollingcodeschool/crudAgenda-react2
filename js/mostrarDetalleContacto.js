//extrar el parametro "id" de la url
console.log(window.location.search)

const parametroURL = new URLSearchParams(window.location.search)
const id = parametroURL.get('id')
console.log(id)

//buscar el contacto que tiene id
const agenda = JSON.parse(localStorage.getItem('agendaKey')) || [];

const contactoBuscado = agenda.find((contacto)=> contacto.id ===  id)
console.log(contactoBuscado)

//TODO: dibujar en la card horizontal los datos del contacto encontrado
const cardContacto = document.querySelector('#contact');
console.log(cardContacto)
cardContacto.innerHTML = `<div class="card mb-3">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${contactoBuscado.imagen}" class="img-fluid rounded-start" alt="${contactoBuscado.apellido}, ${contactoBuscado.nombre} ">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">Contacto: ${contactoBuscado.nombre}, ${contactoBuscado.apellido}</h5>
              <ul>
                <li><b>Apodo:</b> ${contactoBuscado.apodo} </li>
                <li><b>Email:</b> ${contactoBuscado.email} </li>
                <li><b>Teléfono:</b> ${contactoBuscado.telefono} </li>
                <li><b>Dirección:</b> ${contactoBuscado.direccion} </li>
              </ul>
            </div>
          </div>
        </div>
      </div>`
