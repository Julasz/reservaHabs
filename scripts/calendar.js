
// calendario interactivo // 

let meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

//establecer fecha desde la pc
let fechaCorriente = new Date();
let diaCorriente = fechaCorriente.getDate(); // devuelve dia de la semana
let numeroMes = fechaCorriente.getMonth(); // meses del 0 al 11
let anioCorriente = fechaCorriente.getFullYear();

console.log(diaCorriente + "/" + numeroMes + "/" + anioCorriente)

let fechas = document.getElementById('fechas');
let anio = document.getElementById('anio');
let mes = document.getElementById('mes');

let mesPrevio = document.getElementById('mes-previo');
let mesSiguiente = document.getElementById('mes-siguiente');

mes.textContent = meses[numeroMes]
anio.textContent = anioCorriente.toString();


mesPrevio.addEventListener('click', () => ultimoMes());
mesSiguiente.addEventListener('click', () => siguienteMes());

mesEscrito(numeroMes);
//funcion para escribir los meses (cada parametro tiene el mes)
function mesEscrito (mes){
    for(let i = diaDeComienzo(); i>0; i--){
        fechas.innerHTML += `<div class="calendario__fechas calendario__item ultimosDias">${diasTotales(numeroMes-1)-(i-1)}</div>`;
        
    }


    for (let i = 1; i <= diasTotales(mes); i++){
        
        if (i==diaCorriente) {
            fechas.innerHTML += `<div class="calendario__fechas calendario__item hoy">${i}</div>`;
        }else{
            fechas.innerHTML += `<div class="calendario__fechas calendario__item">${i}</div>`;
        }
    }
}

//funcion para el total de los dias del mes
function diasTotales (mes){
    if(mes == -1) mes = 11;

    if ((mes == 0) || (mes == 2) || (mes == 4) || (mes == 6) || (mes == 7) || (mes == 9) || (mes == 11)){
        return 31;
    } else if ((mes == 3) || (mes == 5) || (mes == 8) || (mes == 10)){
        return 30;
    } else{
        return anioBisiesto() ? 29:28;
    }

}
//año bisiesto o no
function anioBisiesto (){
    if((anioCorriente % 100 !== 0) && (anioCorriente % 4 === 0) || (anioCorriente % 400 === 0)){
        return true;
    } else {
        return false;
    }
    
}

//el dia 1 que comienza la semana
function diaDeComienzo(){
    let comienzo = new Date(anioCorriente, numeroMes, 1);
    return (comienzo.getDay()) //18'18" devolver el dia de la semana numero 1
}
// para el mes anterior
function ultimoMes(){
    if (numeroMes !== 0){
        numeroMes--;
    }else{
        numeroMes=11;
        anioCorriente--;
    }

    setearFechaNueva();
}
// para el mes siguiente
function siguienteMes(){
    if (numeroMes !== 11){
        numeroMes++;
    }else{
        numeroMes=0;
        anioCorriente++;
    }

    setearFechaNueva();
}
//
function setearFechaNueva(){
    fechaCorriente.setFullYear(anioCorriente, numeroMes, diaCorriente);
    mes.textContent = meses[numeroMes];
    anio.textContent = anioCorriente.toString();

    fechas.textContent="";
    mesEscrito(numeroMes);
} 

/* FINALIZA  calendario interactivo */


