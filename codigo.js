class Libro{
    titulo;
    autor;
    genero;
    fecha_prestamo;
}

let libros_disponibles = [];
let libros_prestados = [];

function buscar_libro(titulo, librosDisponibles) { 
    // busca un libro por titulo en libros disponibles y regresa el indice
    // si no lo encuentra regresa -1
    for (let i = 0; i < librosDisponibles.length; i++) {
        if (librosDisponibles[i].titulo === titulo) {
            return i;
        }
    }
    return -1;
}

function reservar_libro(titulo){
    // busca un libro por titulo en libros disponibles
    // si lo encuentra lo mueve a libros prestados
    let indice = buscar_libro(titulo, libros_disponibles);
    if (indice !== -1) {
        libros_prestados.push(libros_disponibles[indice]);
        libros_disponibles.splice(indice, 1);
        return true;
    }
    return false;
}

function devolver_libro(titulo){
    // regresa un libro prestado a libros disponibles
    let indice = buscar_libro(titulo, libros_prestados);
    if (indice !== -1) {
        libros_disponibles.push(libros_prestados[indice]);
        libros_prestados.splice(indice, 1);
        return true;
    }
}

