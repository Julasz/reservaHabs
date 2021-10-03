
//// FORMULARIO

let consulta = [];

class Propiedades{
    constructor(nombre, telefono, correo, checkin, checkout, pax){
        this.nombre = nombre;
        this.telefono = telefono;
        this.correo = correo;
        this.checkin = checkin;
        this.checkout = checkout;
        this.pax = pax
    }

    toString(){
        return JSON.stringify(this);
    }
}



function validarFormulario(e){
    e.preventDefault();

    let nombre = $("#nombre");
    let telefono = $("#telefono");
    let correo = $("#correo");
    let checkin = $("#checkin");
    let checkout = $("#checkout");
    let pax = $("#pax");

    let formulario = $("form");

    if (nombre.val() == ""){
        error(nombre, 'Completar el campo requerido');
    } else {
        valido(nombre);
    }

    if (telefono.val() == ""){
        error(telefono, 'Completar el campo requerido');
    } else {
        valido(telefono);
    }

    if (correo.val() == ""){
        error(correo, 'Completar el campo requerido');
    } else if (!email(correo.value)){
        error(correo, 'Ingrese un correo electrónico válido')
    } else {
        valido(correo);
    }

    if (checkin.val() == ""){
        error(checkin, 'Seleccionar fechas');
    } else {
        valido(checkin);
    }

    if (checkout.val() == ""){
        error(checkout, 'Seleccionar fechas');
    } else {
        valido(checkout);
    }

    if (pax.val() == ""){
        error(pax, 'Seleccionar cantidad de personas');
    } else {
        valido(pax);
    }

    console.log(`${nombre.val()}\nTel: ${telefono.val()}\nEmail: ${correo.val()}\nFecha de check-in ${checkin.val()}\nFecha de check-out ${checkout.val()}\nCantidad de personas ${pax.val()}`)

    consulta.push(new Propiedades(nombre.val(), telefono.val(), correo.val(), checkin.val(), checkout.val(), pax.val()));
    
    nombre.val("");
    telefono.val("");
    correo.val("");
    checkin.val("");
    checkout.val("");
    pax.val("");
    
    guardarConsulta();
}

function error(input, mensaje){
    const control = input.parentElement;
    let small = control.querySelector("small");
    control.className = "control error";
    small.innerText = mensaje;
}

function valido(input){
    const control = input.parentElement;
}

function email() {
    return /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
}

// guardarlo en storage

function guardarConsulta(){
    localStorage.setItem("consulta",JSON.stringify(consulta));
}

$(document).ready(function(){
    $("#btn-submit").on('click',validarFormulario);
});


