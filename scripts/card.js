window.onload = function () {
  // Variables
  const baseDeDatos = [
    {
      id: 1,
      nombre: 'Habitación Standard',
      description: 'Apart Suite, breakfast excluded.',
      precio: 16,
      imagen: 'img/ST2.jpeg'
    },
    {
      id: 2,
      nombre: 'Suite Junior',
      description: 'Ambiente confortable con livingroom donde poder dedicarse al descanso, breakfast excluded.',
      precio: 25,
      imagen: 'img/ST7.jpeg'
    },
    {
      id: 3,
      nombre: 'Suite Junior Triple',
      description: 'Ambiente confortable y ameno donde poder dedicarse al descanso, breakfast excluded.',
      precio: 30,
      imagen: 'img/ST11.jpeg'
    },
    {
      id: 4,
      nombre: 'Superior Suite',
      description: 'Apart Suite, breakfast excluded.',
      precio: 28,
      imagen: 'img/ST3.jpeg'
    },
    {
      id: 5,
      nombre: 'Suite',
      description: 'Ambiente confortable y ameno donde poder dedicarse al descanso, breakfast excluded.',
      precio: 50,
      imagen: 'img/ST8.jpeg'
    }

  ];

  let carrito = [];
  let total = 0;
  const items = document.querySelector('#items');
  const miCarrito = document.querySelector('#carrito');
  const totalAll = document.querySelector('#total');
  const btnVolver = document.querySelector('#btn-volver');
  const btnReservar = document.querySelector('#btn-reservar'); //activar con modal
  const miLocalStorage = window.localStorage;

  // Funciones

  /**
  * Dibuja todos los productos a partir de la base de datos. No confundir con el carrito
  */
  function addComponentes() {
    baseDeDatos.forEach((info) => {
        // Estructura
        const cards = document.createElement('div');
        cards.classList.add('card');
        // Body
        const cardsCardBody = document.createElement('div');
        cardsCardBody.classList.add('card-body');
        // Titulo
        const cardsTitle = document.createElement('h2');
        cardsTitle.classList.add('card-title');
        cardsTitle.textContent = info.nombre;
        // Descripcion
        const cardsDescription = document.createElement('p');
        cardsDescription.classList.add('card-description');
        cardsDescription.textContent = info.description;
        // Imagen
        const cardsImagen = document.createElement('img');
        cardsImagen.classList.add('img-fluid');
        cardsImagen.setAttribute('src', info.imagen);
        // Precio
        const cardsPrecio = document.createElement('p');
        cardsPrecio.classList.add('card-text');
        cardsPrecio.textContent = info.precio + ' USD';
        // Boton 
        const cardsBoton = document.createElement('button');
        cardsBoton.classList.add('btn', 'btn1', 'sombra'); // clase al btn reservar
        cardsBoton.textContent = 'Agregar a la reserva';
        cardsBoton.setAttribute('marcador', info.id);
        cardsBoton.addEventListener('click', addHabs);
        // Add
        cardsCardBody.appendChild(cardsImagen);
        cardsCardBody.appendChild(cardsTitle);
        cardsCardBody.appendChild(cardsDescription);
        cardsCardBody.appendChild(cardsPrecio);
        cardsCardBody.appendChild(cardsBoton);
        cards.appendChild(cardsCardBody);
        items.appendChild(cards);
    });
  }

  // Se agregan los cards al carrito
  function addHabs(evento) {
    carrito.push(evento.target.getAttribute('marcador'))
    calcularTotal();
    // Actualiza el carrito 
    renderizarCarrito();
    // Actualiza el LocalStorage
    guardarLocalStorage();
  }

  // Se agregan los cards al detalle de la reserva
  function renderizarCarrito() {
    // Para vaciar todo el html
    miCarrito.textContent = '';
    // Sacar los duplicados
    const carritoSinDuplicados = [...new Set(carrito)];
    // Add cards a partir de carrito
    carritoSinDuplicados.forEach((item) => {
        // Item que necesito de la variable base de datos
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        // Cuenta el número de veces que se repite el producto
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            // Incremento el contador, en caso contrario no mantengo
            return itemId === item ? total += 1 : total;
        }, 0);
        // Se crea el card del item del carrito
        const cards = document.createElement('li');
        cards.classList.add('list-group-item', 'rellenoCarrito');
        cards.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio} $`;
        // Boton de borrar
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn'); // clase para el btn CRUZ PARA QUITAR ITEMS
        miBoton.textContent = 'x';
        miBoton.style.marginLeft = '1.3rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);
        // Mezclamos nodos
        cards.appendChild(miBoton);
        miCarrito.appendChild(cards);
    });
  }

  //borrar elementos del carrito
  function borrarItemCarrito(e) {
    const id = e.target.dataset.item;
    // Se borran las habitaciones
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    renderizarCarrito();
    // Calculamos de nuevo el precio
    calcularTotal();
    // Actualizamos el LocalStorage
    guardarLocalStorage();

  }
  //calcular el precio p/ habitaciones repetidas
  function calcularTotal() {
    //Precio inicial se borra
    total = 0;
    carrito.forEach((item) => {
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        total = total + miItem[0].precio;
    });
    // Renderizamos el precio en el HTML
    totalAll.textContent = total.toFixed(2);
  }

  //vaciar el carrito
  function vaciarCarrito() {
    // Limpiar los productos guardados
    carrito = [];
    renderizarCarrito();
    calcularTotal();
    // Borra LocalStorage
    localStorage.clear();

  }
  function guardarLocalStorage () {
    miLocalStorage.setItem('carrito', JSON.stringify(carrito));
  }

  function cargarCarritoDeLocalStorage () {
    if (miLocalStorage.getItem('carrito') !== null) {
        // Carga la información
        carrito = JSON.parse(miLocalStorage.getItem('carrito'));
    }
  }

  // Eventos
  btnVolver.addEventListener('click', vaciarCarrito);

  // Inicio
  cargarCarritoDeLocalStorage();
  addComponentes();
  calcularTotal();
  renderizarCarrito();

  //si no hay compra, devuelve otro mensaje-modal
  function noReserva (){
    let reservaFinal = document.getElementById('#totalReservaFinal');

    if (reservaFinal === 0){

        btnReservar.addEventListener('click', function(){
            document.createElement(`
                <div class="modal fade" id="miModal" tabindex="-1" aria-labelledby="modalTitle" aria-hidden="true" data-bs-backdrop="static">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h3 class="modal-title" id="modalTitle"><strong>¡Ops!</strong></h3>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <p>¡Reserva sin completar!</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary sombra" data-bs-dismiss="modal">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            `)
        })
      
    } 
  }

  noReserva();
}

// api clima
$(document).ready(function(){
    $('#btn-clima').click(function(e){
        buscador(e);
    })
    
    function buscador(e){
        e.preventDefault();

        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/weather?q=Buenos%20Aires&appid=f45674b2c81aa4461d5b40acf33ac526&units=metric&lang=es",
            method: "GET",
            
            units: 'metric',
            lang: 'es',
            
            success: function (response) {
            console.log(`response`, response);
            devuelve(response);
            },
        });
    }
});
// se trae la información de los objetos
function devuelve(json){
    let nombreCiudad = json.name;
    let climaCiudad = json.weather[0].description;
    let temperaturaCiudad = json.main.temp;

    $('#nombre-ciudad').text(nombreCiudad);
    $('#clima-ciudad').text(climaCiudad);
    $('#temperatura-ciudad').text(temperaturaCiudad+ ' °C');

    console.log(json.name);
    console.log(json.weather);
    console.log(json.main.temp);
}

//Llamando a los botones
$("#btn-clima").ready( () => $("#contenedor-clima").hide());
$("#btn-desglose").ready( () => $(".card-habitaciones").hide());

// Evento para mostrar el clima
$('#btn-clima').click(function(){
    $('#contenedor-clima').slideToggle(800);
})
// Evento para desglose de habitaciones y mostrarlas
$('#btn-desglose').click(function(){
    $('.card-habitaciones').slideToggle(1000);
})


