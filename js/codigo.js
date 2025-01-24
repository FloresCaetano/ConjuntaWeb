class Libro{
    titulo;
    autor;
    genero;
    fecha_prestamo;
}

let libros_disponibles = [];
let libros_prestados = [];
function buscar_libro_por_titulo(titulo, libros) { //Cambiamos la variable titulo y el libro.titulo por el autor o genero segun sea necesario
    // busca un libro por titulo en libros disponibles y regresa el indice
    // si no lo encuentra regresa -1
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


