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

