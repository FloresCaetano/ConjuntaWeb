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



