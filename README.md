Evaluacion Conjunta Parcial II

Nombres: Caetano Flores y Leonardo Narváez.

Objetivo: Evaluar la capacidad del estudiante para analizar y proponer soluciones a un problema práctico 
utilizando los conceptos fundamentales de programación web en JavaScript. 

Caso Práctico 

Escenario: Una biblioteca digital necesita mejorar su sistema de gestión de préstamos y devoluciones de 
libros. Actualmente, los usuarios pueden buscar libros, pero no hay una forma eficiente de reservarlos, 
devolverlos o verificar su disponibilidad en tiempo real. Además, el sistema no cuenta con alertas para 
recordar a los usuarios la fecha de devolución ni notificaciones sobre la disponibilidad de libros reservados. 

*1. Estructura del sistema de préstamos: ¿Cómo organizar y manipular los libros prestados usando arrays y sus métodos (push, pop, shift, unshift, splice)?*

En la organizacion decidimos crear una *clase Libro* basica con los atributos necesario para representar un libro en el sistema, no contendra metodos porque solo va estar diseñado para subrir las caracteristicas principales que se necesitan para gestionar libros en este sistema de prestamos. 

                                                    class Libro{
                                                        titulo;
                                                        autor;
                                                        genero;
                                                        tiempo_prestamo;
                                                    }

*Cada atributo tiene su proposito:*
    Titulo: sera el identificador principal de cada libro del sistema. En este sistema, los libros seran buscados, prestados y devueltos basandose por el titulo.

    Autor: nos proporcionara la informacion de quien escribio el libro.
    Genero: Definira el genero literario del libro sea novela, ciencia, educacion, etc.
    tiempo_prestamo: sera usado como un temporizador para avisar al usuario que ha hecho el prestamo de un libro X, que su tiempo de prestamo de su libro esta caducado y lo devuelva.

Para poder llevar a cabo la organizacion creamos *dos arreglos* de la clase Libro, que nos serviran para organizar los libros segun su estado:

                                                    let libros_disponibles = [];
                                                    let libros_prestados = [];

    libros_disponibles: Contedra los libros que estan disponibles para ser prestados, e inicialmente, todos los libros estaran en este arreglo.
    libros_prestados: Contendra los libros prestados, un libro prestado sera movido desde el arreglo libros_disponibles siempre y cuando se ejecute un prestamo existoso.

*Funciones del sistema de prestamos, devoluciones y busquedas*
*Busqueda de un libro*
Para poder realizar la busqueda de un libro lo haremos mediante su arreglo y por su titulo.  

                                                    function buscar_libro_por_titulo(titulo, libros) { 
                                                        let libro = libros.filter(libro => libro.titulo === titulo);
                                                        if (libro.length > 0) {
                                                            return libros.indexOf(libro[0]);
                                                        }
                                                        else
                                                            return -1;
                                                    }


*Reservacion o prestamo*

Esta funcion reserva un libro, moviendolo del arreglo de libros disponibles (libros_disponibles) al arreglo de libros prestados (libros_prestados).

Crearemos una nueva variable *indice* que guardara el resultado de la busqueda del libro a reservar.
Si encuentra un libro usamos *push* para añadir el libro o elemento al final del arreglo de libros_prestados, de ello hacemos una elminacion con la funcion splilce para eliminar el libro a prestar del arreglo libros_disponibles en la posicion del indice.
caso contrario no añadimos nada.

                                                    function reservar_libro(titulo){

                                                        let indice = buscar_libro_por_titulo(titulo, libros_disponibles);
                                                        if (indice !== -1) {
                                                            libros_prestados.push(libros_disponibles[indice]);
                                                            libros_disponibles.splice(indice, 1);
                                                            return true;
                                                        }
                                                        return false;
                                                    }

*Devoluciones*

Estan funcion devuelve el libro prestado, moviendolo del arreglo libros_prestados al arreglo libros_disponibles


                                                    function devolver_libro(titulo){
                                                        let indice = buscar_libro_por_titulo(titulo, libros_prestados);
                                                        if (indice !== -1) {
                                                            libros_disponibles.push(libros_prestados[indice]);
                                                            libros_prestados.splice(indice, 1);
                                                            return true;
                                                        }
                                                    }

El funcionamiento de la devolucion es similar al de la reservacion, es decir:
creamos una nueva variable indice que busque el libro por su titulo desde el arreglo libros_prestados. Si lo encuentra con la funcion *push* agregamos el libro prestado al arreglo de libros_disponibles, y eliminamos el libro del arreglo libros_prestados con su respectiva posicion (es decir su indice). 

*Mostrar libros prestados disponibles*
Estas funciones su unico proposito es mostrar la informacion de los libros que se encuentran disponibles y prestados.

                                                    function mostar_libros_disponibles(){
                                                        const doc_libros_disponibles = document.getElementById('libros_disponibles');
                                                        libros_disponibles.innerHTML = '';
                                                        for (const libro of libros_disponibles) {
                                                            doc_libros_disponibles.innerHTML += `<li>${libro.titulo}</li>`;
                                                        }
                                                    }

                                                    function mostrar_libros_prestados(){
                                                        const doc_libros_prestados = document.getElementById('libros_prestados');
                                                        libros_prestados.innerHTML = '';
                                                        for (const libro of libros_prestados) {
                                                            doc_libros_prestados.innerHTML += `<li>${libro.titulo}</li>`;
                                                        }
                                                    }



*2. Filtrado y búsquedas dinámicas: ¿Cómo implementar filtros (filter) y búsqueda de libros por título, autor o género?*

                                                    function buscar_libro_por_titulo(titulo, libros) { 
                                                        let libro = libros.filter(libro => libro.titulo === titulo);
                                                        if (libro.length > 0) {
                                                            return libros.indexOf(libro[0]);
                                                        }
                                                        else
                                                            return -
                                                            1;
                                                    }

Usando el metodo filter que nos ayudara creando un nuevo array con todos los elementos que cumplan la condicion, en nuestro caso el arreglo de libros filtra mediante el titulo proporcionado. El resultado sera guardado en una nueva variable libro que contendra los libros que cumplan la condicion.
Luego verificaremos que si el libro buscado se encuentra en el arreglo y de ser asi devolveremos su indice. Primero tenemos que asegurarnos que si el arreglo libro no este vacio, porque si lo esta significaria que no encontro nada. Por otro lado si encontro almenos uno, usaremos la funcion indexOf para obtener la posicion del primer elemento filtrado es decir libro[0], dentro del arreglo original libros. 

*3. Interacción con el usuario: ¿Cómo mostrar la lista de libros disponibles y los libros prestados usando manipulación del DOM (getElementById, querySelectorAll)?*

Utilizamos innerHTML='' para borrar cualquier contenido existente en el HTML antes de agregar nuevos datos asegurando que las listas no se dupliquen al actualizar nueva informacion.
Recorremos cada libro en las listas de libros disponibles y prestado con un bucle, la cual nos permita acceder a los titulos de los libros uno por uno.

                                                    function mostar_libros_disponibles(){
                                                        const doc_libros_disponibles = document.getElementById('libros_disponibles');
                                                        libros_disponibles.innerHTML = '';
                                                        for (const libro of libros_disponibles) {
                                                            doc_libros_disponibles.innerHTML += `<li>${libro.titulo}</li>`;
                                                        }
                                                    }

                                                    function mostrar_libros_prestados(){
                                                        const doc_libros_prestados = document.getElementById('libros_prestados');
                                                        libros_prestados.innerHTML = '';
                                                        for (const libro of libros_prestados) {
                                                            doc_libros_prestados.innerHTML += `<li>${libro.titulo}</li>`;
                                                        }
                                                    }

En la actualizacion dinamica del DOM, en cada iteracion del bucle el titulo del libro se agregara al elemento del HTML utilizado, permitiendo la actualizacion de la lista de los libros al usuario.


*4. Alertas y recordatorios: ¿Cómo enviar recordatorios automáticos de devolución usando setTimeout o setInterval?*

Las alertas se utilizan en la función que se ejecuta periódicamente con setInterval. Esta función verifica si algún libro que fue reservado previamente por un usuario ahora está disponible nuevamente.
En este bloque de código, se recorre la lista de libros disponibles y se compara con los libros que cada usuario ha reservado previamente. Si se encuentra que un libro que estaba reservado ahora está disponible, se muestra una alerta al usuario.

Las alertas se utilizan para notificar de manera inmediata y visible al usuario que un libro que había reservado anteriormente ahora está disponible. Esto es útil para que el usuario pueda tomar acción rápidamente, como reservar el libro nuevamente si lo desea.

*5. Eventos y usabilidad: ¿Cómo mejorar la experiencia del usuario con eventos (onclick, onchange, onmouseover, onmouseout, onfocus, onblur)?* 

Los recordatorios se utilizan en la funcion reservar_libro. Cuando un usuario reserva un libro, se establece un temporizador (setTimeout) que notificara al usuario después de un cierto tiempo (en este caso, 15 dias) que tiene un libro pendiente de devolucion.

setTimeout se utiliza para programar una notificacion que se mostrara en el elemento HTML con el ID aviso_devolucion después de 15 dias (1.296e+9 milisegundos). Este mensaje recordará al usuario que tiene un libro pendiente de devolucion.

Los recordatorios son utiles para asegurarse de que los usuarios no olviden devolver los libros que han reservado. Esto ayuda a mantener un flujo adecuado de libros en la biblioteca y evita que los libros permanezcan prestados por mas tiempo del debido.

*6. Funciones avanzadas: ¿Cómo usar funciones autoejecutables, anónimas, y async/await para manejar procesos asíncronos?*

Las funciones asincronas (async/await) las usamos en las funciones reservar_libro, devolver_libro y buscar_libro_por_titulo para manejar operaciones que simulan un retraso, como la busqueda de un libro en una lista, permitiendo que el programa espere a que se complete la operacion antes de continuar. 

*7. Simulación de procesos asíncronos: ¿Cómo implementar la reserva y devolución de libros usando promesas y setTimeout para simular tiempos de espera?* 

El setTimeout se utiliza para simular un retraso en la ejecucion de ciertas operaciones, como la busqueda de un libro o la confirmacion de una reserva. Esto es útil para imitar el comportamiento de una operacion que tomaria tiempo en un entorno real, como una consulta a una base de datos o una solicitud a un servidor.

La funcion reservar_libro utiliza una promesa para manejar el proceso de reserva de manera asincrona. Primero, busca el libro en la lista de disponibles usando buscar_libro_por_titulo (que tambien es una promesa) y luego realiza la reserva si el libro esta disponible.

*Codigo final actualizado con lo pedido en las preguntas.*

//Manejo usuarios
class biblioteca {
    usuarios = [];
}

class usuario {
    #ci;
    #usuario;
    #contraseña;
    libros_previamente_reservados = [];

    constructor(ci, usuario, contraseña) {
        this.#ci = ci;
        this.#usuario = usuario;
        this.#contraseña = contraseña;
    }

    // Métodos para acceder a las propiedades privadas si es necesario
    getCi() {
        return this.#ci;
    }

    getUsuario() {
        return this.#usuario;
    }

    getContraseña() {
        return this.#contraseña;
    }
}

function registar_usuario(){
    let ci = document.getElementById('ci').value;
    let usuario = document.getElementById('usuario').value;
    let contraseña = document.getElementById('contraseña').value;

    let nuevo_usuario = new usuario(ci, usuario, contraseña);
    biblioteca.usuarios.push(nuevo_usuario);
    nuevo_usuario.seal(); // sellamos el objeto para que no se modifiquen sus propiedades por seguridad
}


class Libro{
    titulo;
    autor;
    genero;
    tiempo_prestamo;
}

let libros_disponibles = [];
let libros_prestados = [];
function buscar_libro_por_titulo(titulo, libros) { 
    return new Promise((resolve) => {
        setTimeout(() => {
            for (let i = 0; i < libros.length; i++) {
                if (libros[i].titulo === titulo) {
                    resolve(i);
                    return;
                }
            }
            resolve(-1);
        }, 1000); // Simula un tiempo de espera de 1 segundo
    });
}

function reservar_libro(titulo, usuario) {
    return new Promise(async (resolve) => {
        let indice = await buscar_libro_por_titulo(titulo, libros_disponibles);
        if (indice !== -1) {
            libros_prestados.push(libros_disponibles[indice]);
            libros_disponibles.splice(indice, 1);

            usuario.libros_previamente_reservados.push(titulo); // Guardamos el libro reservado por el usuario para verificar luego si esta disponible en otra ocacion

            const tiempo_prestamo_libro = setTimeout(() => {
                let aviso_devolucion = document.getElementById('aviso_devolucion');
                aviso_devolucion.innerHTML = `Tiene el libro (${titulo}) pendiente de devolucion`;
            }, 1.296e+9);
            libros_disponibles[indice].tiempo_prestamo = tiempo_prestamo_libro;
            setTimeout(() => resolve(true), 1000); // Simula un tiempo de espera de 1 segundo
        } else {
            setTimeout(() => resolve(false), 1000); // Simula un tiempo de espera de 1 segundo
        }
    });
}

function devolver_libro(titulo) {
    return new Promise(async (resolve) => {
        let indice = await buscar_libro_por_titulo(titulo, libros_prestados);
        if (indice !== -1) {
            libros_disponibles.push(libros_prestados[indice]);
            libros_prestados.splice(indice, 1);
            setTimeout(() => resolve(true), 1000); // Simula un tiempo de espera de 1 segundo
        } else {
            setTimeout(() => resolve(false), 1000); // Simula un tiempo de espera de 1 segundo
        }
    });
}


function mostar_libros_disponibles(){
    const doc_libros_disponibles = document.getElementById('libros_disponibles');
    libros_disponibles.innerHTML = '';
    for (const libro of libros_disponibles) {
        doc_libros_disponibles.innerHTML += `<li>${libro.titulo}</li>`;
    }
}

function mostrar_libros_prestados(){
    const doc_libros_prestados = document.getElementById('libros_prestados');
    libros_prestados.innerHTML = '';
    for (const libro of libros_prestados) {
        doc_libros_prestados.innerHTML += `<li>${libro.titulo}</li>`;
    }
}

//funcion con setInterval asyncrona para verificar si el libro esta disponible
setInterval(async () => {
    for (const libro of libros_disponibles) {
        for (const usuario of biblioteca.usuarios)
            for (const libro_reservado of usuario.libros_previamente_reservados) {
                if(libro_reservado.titulo == libro.titulo){
                    alert(`libro ${libro.titulo} reservado anteriormente ahora esta disponible`);
                }
            }
    }
}, 1000);

//Eventos y usabilidad
let doc_libros_disponibles = document.querySelectorAll('#libros_disponibles li');
let doc_libros_prestados = document.querySelectorAll('#libros_prestados li');

for (const doc_libro of doc_libros_disponibles) {
    //añade un evento a todos los libros disponibles que al hacer click los reserva
    doc_libro.addEventListener('click', () => {
        reservar_libro(doc_libro.innerHTML);
        mostar_libros_disponibles();
        mostrar_libros_prestados();
    });

    doc_libro.addEventListener('mouseover', () => {
        doc_libro.style.backgroundColor = 'lightgray';
    });
}

for (const doc_libro of doc_libros_prestados) {
    //añade un evento a todos los libros prestados que al hacer click los devuelve
    doc_libro.addEventListener('click', () => {
        devolver_libro(doc_libro.innerHTML);
        mostar_libros_disponibles();
        mostrar_libros_prestados();
    });

    doc_libro.addEventListener('mouseover', () => {
        doc_libro.style.backgroundColor = 'lightgray';
    });
}


