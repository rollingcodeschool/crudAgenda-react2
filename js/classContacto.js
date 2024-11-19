export default class Contacto{
    #id;
    #nombre;
    #apellido;
    #email;
    #telefono
    #apodo;
    #direccion;
    #imagen;    
    constructor(nombre, apellido, email, telefono, apodo, direccion, imagen){
        this.#id= crypto.randomUUID();
        this.#nombre = nombre;
        this.#apellido = apellido;
        this.#email = email;
        this.#telefono = telefono;
        this.#apodo = apodo;
        this.#direccion = direccion;
        this.#imagen = imagen;
    }

    //agregar los get y set
}