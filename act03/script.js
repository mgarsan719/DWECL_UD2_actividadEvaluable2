const biblioteca = new Map();
let entrar = true;

do {
    const entrada = window.prompt(
        "Introduce una opción:\n" +
        "A. Añadir un libro\n" +
        "B. Eliminar un libro\n" +
        "C. Consultar un libro\n" +
        "D. Mostrar catálogo\n" +
        "E. Modificar ejemplares\n" +
        "F. Buscar libros de un autor\n" +
        "G. Prestar un libro\n" +
        "H. Devolver un libro\n" +
        "I. Mostrar estadísticas\n" +
        "J. Vaciar catálogo\n" +
        "K. Salir"
    );

    const opt = entrada.trim().toUpperCase();

    switch (opt) {
        case "A": {
            const isbn = introducirTexto("Introduce el ISBN del libro:");
            if (isbn === null) {
                break;
            }

            if (biblioteca.has(isbn)) {
                window.alert(`Ya existe un libro registrado con el ISBN "${isbn}".`);
            } else {
                const titulo = introducirTexto("Introduce el título del libro:");
                if (titulo === null) {
                    break;
                }

                const autor = introducirTexto("Introduce el autor del libro:");
                if (autor === null) {
                    break;
                }

                const ejemplares = introducirEnteroPositivo("Introduce el número de ejemplares disponibles:");
                if (ejemplares === null) {
                    break;
                }

                biblioteca.set(isbn, {
                    titulo: titulo,
                    autor: autor,
                    ejemplares: ejemplares
                });

                window.alert(`Libro "${titulo}" añadido correctamente al catálogo.`);
                console.log(biblioteca);
            }
            break;
        }

        case "B": {
            if (biblioteca.size !== 0) {
                const isbn = introducirTexto("Introduce el ISBN del libro a eliminar:");
                if (isbn === null) {
                    break;
                }

                if (biblioteca.delete(isbn)) {
                    window.alert(`El libro con ISBN "${isbn}" ha sido eliminado.`);
                    console.log(biblioteca);
                } else {
                    window.alert(`No se encontró ningún libro con el ISBN "${isbn}".`);
                }
            } else {
                window.alert("El catálogo está vacío.");
            }
            break;
        }

        case "C": {
            if (biblioteca.size !== 0) {
                const isbn = introducirTexto("Introduce el ISBN del libro a consultar:");
                if (isbn === null) {
                    break;
                }

                const libro = biblioteca.get(isbn);
                if (libro !== undefined) {
                    window.alert(
                        `Información del libro:\n` +
                        `- ISBN: ${isbn}\n` +
                        `- Título: ${libro.titulo}\n` +
                        `- Autor: ${libro.autor}\n` +
                        `- Ejemplares disponibles: ${libro.ejemplares}`
                    );
                } else {
                    window.alert(`No existe ningún libro con el ISBN "${isbn}".`);
                }
            } else {
                window.alert("El catálogo está vacío.");
            }
            break;
        }

        case "D": {
            if (biblioteca.size !== 0) {
                let listado = "Catálogo de la biblioteca:\n\n";
                for (const [isbn, libro] of biblioteca) {
                    listado += `ISBN: ${isbn} | Título: ${libro.titulo} | Autor: ${libro.autor} | Ejemplares: ${libro.ejemplares}\n`;
                }
                listado += `\nTotal de libros registrados: ${biblioteca.size}`;
                window.alert(listado);
            } else {
                window.alert("El catálogo está vacío.");
            }
            break;
        }

        case "E": {
            if (biblioteca.size !== 0) {
                const isbn = introducirTexto("Introduce el ISBN del libro a modificar:");
                if (isbn === null) {
                    break;
                }

                const libro = biblioteca.get(isbn);
                if (libro !== undefined) {
                    const nuevosEjemplares = introducirEnteroPositivo(
                        `Ejemplares actuales de "${libro.titulo}": ${libro.ejemplares}\nIntroduce la nueva cantidad de ejemplares:`
                    );
                    if (nuevosEjemplares === null) {
                        break;
                    }

                    libro.ejemplares = nuevosEjemplares;
                    window.alert(`Ejemplares de "${libro.titulo}" actualizados a ${libro.ejemplares}.`);
                    console.log(biblioteca);
                } else {
                    window.alert(`No existe ningún libro con el ISBN "${isbn}".`);
                }
            } else {
                window.alert("El catálogo está vacío.");
            }
            break;
        }

        case "F": {
            if (biblioteca.size !== 0) {
                const autorBuscado = introducirTexto("Introduce el nombre del autor a buscar:");
                if (autorBuscado === null) {
                    break;
                }

                let resultados = `Libros de "${autorBuscado}":\n\n`;
                let encontrados = 0;

                for (const [isbn, libro] of biblioteca) {
                    if (libro.autor.toLowerCase() === autorBuscado.toLowerCase()) {
                        resultados += `- [${isbn}] ${libro.titulo} (${libro.ejemplares} disponibles)\n`;
                        encontrados++;
                    }
                }

                if (encontrados > 0) {
                    window.alert(resultados);
                } else {
                    window.alert(`No se encontraron libros del autor "${autorBuscado}".`);
                }
            } else {
                window.alert("El catálogo está vacío.");
            }
            break;
        }

        case "G": {
            if (biblioteca.size !== 0) {
                const isbn = introducirTexto("Introduce el ISBN del libro a prestar:");
                if (isbn === null) {
                    break;
                }

                const libro = biblioteca.get(isbn);
                if (libro !== undefined) {
                    if (libro.ejemplares > 0) {
                        libro.ejemplares--;
                        window.alert(`Préstamo realizado de "${libro.titulo}". Quedan ${libro.ejemplares} ejemplares.`);
                        console.log(biblioteca);
                    } else {
                        window.alert(`No quedan ejemplares disponibles de "${libro.titulo}" para prestar.`);
                    }
                } else {
                    window.alert(`No existe ningún libro con el ISBN "${isbn}".`);
                }
            } else {
                window.alert("El catálogo está vacío.");
            }
            break;
        }

        case "H": {
            if (biblioteca.size !== 0) {
                const isbn = introducirTexto("Introduce el ISBN del libro a devolver:");
                if (isbn === null) {
                    break;
                }

                const libro = biblioteca.get(isbn);
                if (libro !== undefined) {
                    libro.ejemplares++;
                    window.alert(`Devolución registrada de "${libro.titulo}". Ahora hay ${libro.ejemplares} ejemplares disponibles.`);
                    console.log(biblioteca);
                } else {
                    window.alert(`No existe ningún libro con el ISBN "${isbn}".`);
                }
            } else {
                window.alert("El catálogo está vacío.");
            }
            break;
        }

        case "I": {
            if (biblioteca.size !== 0) {
                let totalEjemplares = 0;
                let maxEjemplares = -Infinity;
                let libroMasEjemplares = null;

                for (const libro of biblioteca.values()) {
                    totalEjemplares += libro.ejemplares;
                    if (libro.ejemplares > maxEjemplares) {
                        maxEjemplares = libro.ejemplares;
                        libroMasEjemplares = libro;
                    }
                }

                window.alert(
                    `Estadísticas de la biblioteca:\n` +
                    `- Total de libros registrados (títulos distintos): ${biblioteca.size}\n` +
                    `- Total de ejemplares disponibles: ${totalEjemplares}\n` +
                    `- Libro con más ejemplares: "${libroMasEjemplares.titulo}" (${maxEjemplares} ejemplares)`
                );
            } else {
                window.alert("El catálogo está vacío, no hay estadísticas que mostrar.");
            }
            break;
        }

        case "J":
            biblioteca.clear();
            window.alert("Se ha vaciado todo el catálogo de la biblioteca.");
            console.log(biblioteca);
            break;

        case "K":
            window.alert("Ha seleccionado finalizar el programa, saliendo...");
            entrar = false;
            break;

        default:
            window.alert("Opción no válida. Introduce una letra de la A a la K.");
            break;
    }

} while (entrar);

function introducirTexto(mensaje) {
    let texto;
    do {
        texto = window.prompt(mensaje);
        if (texto === null) {
            return null;
        }
        texto = texto.trim();
        if (texto === "") {
            window.alert("Este campo no puede estar vacío.");
        }
    } while (texto === "");

    return texto;
}

function introducirEnteroPositivo(mensaje) {
    let numero;
    do {
        const entrada = window.prompt(mensaje);
        if (entrada === null) {
            return null;
        }
        numero = parseInt(entrada);
        if (isNaN(numero) || numero < 0) {
            window.alert("Introduce un número entero mayor o igual a 0.");
        }
    } while (isNaN(numero) || numero < 0);

    return numero;
}