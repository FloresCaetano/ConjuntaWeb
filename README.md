Evaluacion Conjunta Parcial II
Nombres: Caetano Flores y Leonardo Narváez.

Objetivo: Evaluar la capacidad del estudiante para analizar y proponer soluciones a un problema práctico 
utilizando los conceptos fundamentales de programación web en JavaScript. 

Caso Práctico 

Escenario: Una biblioteca digital necesita mejorar su sistema de gestión de préstamos y devoluciones de 
libros. Actualmente, los usuarios pueden buscar libros, pero no hay una forma eficiente de reservarlos, 
devolverlos o verificar su disponibilidad en tiempo real. Además, el sistema no cuenta con alertas para 
recordar a los usuarios la fecha de devolución ni notificaciones sobre la disponibilidad de libros reservados. 

1. Estructura del sistema de préstamos: ¿Cómo organizar y manipular los libros prestados usando arrays y sus métodos (push, pop, shift, unshift, splice)? 

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

function buscar_libro_por_titulo(titulo, libros) { 
    let libro = libros.filter(libro => libro.titulo === titulo);
    if (libro.length > 0) {
        return libros.indexOf(libro[0]);
    }
    else
        return -1;
}

function reservar_libro(titulo){
    // busca un libro por titulo en libros disponibles
    // si lo encuentra lo mueve a libros prestados
    let indice = buscar_libro_por_titulo(titulo, libros_disponibles);
    if (indice !== -1) {
        libros_prestados.push(libros_disponibles[indice]);
        libros_disponibles.splice(indice, 1);
        return true;
    }
    return false;
}

function devolver_libro(titulo){
    // regresa un libro prestado a libros disponibles
    let indice = buscar_libro_por_titulo(titulo, libros_prestados);
    if (indice !== -1) {
        libros_disponibles.push(libros_prestados[indice]);
        libros_prestados.splice(indice, 1);
        return true;
    }
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



2. Filtrado y búsquedas dinámicas: ¿Cómo implementar filtros (filter) y búsqueda de libros por título, autor o género?

3. Interacción con el usuario: ¿Cómo mostrar la lista de libros disponibles y los libros prestados usando manipulación del DOM (getElementById, querySelectorAll)? 

4. Alertas y recordatorios: ¿Cómo enviar recordatorios automáticos de devolución usando setTimeout o setInterval? 

5. Eventos y usabilidad: ¿Cómo mejorar la experiencia del usuario con eventos (onclick, onchange, onmouseover, onmouseout, onfocus, onblur)? 

6. Funciones avanzadas: ¿Cómo usar funciones autoejecutables, anónimas, y async/await para manejar procesos asíncronos? 

7. Simulación de procesos asíncronos: ¿Cómo implementar la reserva y devolución de libros usando promesas y setTimeout para simular tiempos de espera? 