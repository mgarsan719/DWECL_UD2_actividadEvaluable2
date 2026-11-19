const notas = [];
let entrar = true;

do {
    const entrada = window.prompt(
        "Introduce una opcion: \n" +
        "A. Introducir una nota al principio\n" +
        "B. Introducir una nota al final\n" +
        "C. Subir todas las notas X puntos\n" +
        "D. Calcular estadísticas actuales\n" +
        "E. Vaciar notas\n" +
        "F. Inicializar N notas a valor X\n" +
        "G. Eliminar la primera nota\n" +
        "H. Eliminar la segunda nota\n" +
        "I. Establecer a 0 todos los suspensos\n" +
        "J. Sustituir una nota por otra\n" +
        "K. Añadir una nota en una posición determinada\n" +
        "L. Contar el número de suspensos\n" +
        "M. Salir: Finalizar la ejecución del programa."
    ).toUpperCase();

    switch (entrada) {
        case "A":
            notas.unshift(introducirNota("Introduce una nota:"));
            console.table(notas);

            break;

        case "B":
            notas.push(introducirNota("Introduce una nota:"));
            console.table(notas);

            break;

        case "C":
            if (notas.length !== 0) {
                let subidaNota;

                do {
                    subidaNota = parseFloat(window.prompt("Introduzca cuantos puntos quiere subir a todas las notas:"));

                    if (isNaN(subidaNota) || subidaNota <= 0) {
                        window.alert("Introduzca un valor numérico mayor que 0");
                    }
                } while (isNaN(subidaNota) || subidaNota <= 0);

                for (let i = 0; i < notas.length; i++) {
                    if (notas[i] < 10) {
                        notas[i] = Math.min(10, notas[i] + subidaNota);
                    }
                    else {
                        window.alert(`La nota en la posicion ${i} ya es 10, no puede aumentar`);
                    }
                }
                console.table(notas);
            }
            else {
                window.alert("La lista está vacía");
            }

            break;

        case "D":
            if (notas.length !== 0) {
                let maximo = -Infinity;
                let minimo = Infinity;
                let suma = 0;
                let repeticiones = new Map();

                for (let i = 0; i < notas.length; i++) {
                    if (notas[i] > maximo) {
                        maximo = notas[i];
                    }

                    if (notas[i] < minimo) {
                        minimo = notas[i];
                    }

                    suma += notas[i];

                    if (repeticiones.has(notas[i])) {
                        repeticiones.set(notas[i], repeticiones.get(notas[i]) + 1);
                    }
                    else {
                        repeticiones.set(notas[i], 1);
                    }
                }

                let moda = 0;
                let cont = 0;

                for (let nota of repeticiones.keys()) {
                    if (cont < repeticiones.get(nota)) {
                        cont = repeticiones.get(nota);
                        moda = nota;
                    }
                }

                const media = suma / notas.length;

                window.alert(
                    `Estadísticas:\n` +
                    `La moda es: ${moda} (aparece ${cont} veces)\n` +
                    `El máximo es: ${maximo}\n` +
                    `El mínimo es: ${minimo}\n` +
                    `La media es: ${media.toFixed(2)}`
                );
            } 
            else {
                window.alert("No hay notas para calcular las estadísticas");
            }
            
            break;

        case "E":
            notas.splice(0, notas.length);
            window.alert("La lista de notas está vacía");
            console.table(notas);
            
            break;

        case "F":
            let numNotas;
            
            do {
                numNotas = parseInt(window.prompt("Introduzca el número de notas que desea generar:"));
                
                if (isNaN(numNotas) || numNotas <= 0) {
                    window.alert("El número de notas debe ser un entero mayor que 0");
                }

            } while (isNaN(numNotas) || numNotas <= 0);

            const notaInicial = introducirNota("Introduce el valor de las notas:");

            notas.length = 0;
            
            for (let i = 0; i < numNotas; i++) {
                notas.push(notaInicial);
            }

            window.alert("Se ha sustituido la lista con las nuevas notas");
            console.table(notas);
            break;

        case "G":
            if (notas.length !== 0) {
                notas.shift();
                console.table(notas);
            } 
            else {
                window.alert("La lista de notas está vacía");
            }

            break;

        case "H":
            if (notas.length > 1) {
                notas.splice(1, 1);
                console.table(notas);
            } 
            else {
                window.alert("La lista de notas no tiene segunda posición");
            }

            break;

        case "I":
            if (notas.length !== 0) {
                for (let i = 0; i < notas.length; i++) {
                    if (notas[i] < 5) {
                        notas[i] = 0;
                    }
                }
                console.table(notas);
            } 
            else {
                window.alert("La lista de notas está vacía");
            }

            break;

        case "J":
            if (notas.length !== 0) {
                const notaOrigen = introducirNota("Introduzca la nota a cambiar en la lista:");
                const notaDestino = introducirNota("Introduzca la nota sustituyente:");

                for (let i = 0; i < notas.length; i++) {
                    if (notas[i] === notaOrigen) {
                        notas[i] = notaDestino;
                    }
                }
                console.table(notas);
            } 
            else {
                window.alert("La lista de notas está vacía");
            }

            break;

        case "K":
            const notaInsertar = introducirNota("Introduce una nota:");
            let posicion;
            
            do {
                posicion = parseInt(window.prompt(`Introduce una posición (entre 0 y ${notas.length}):`));
                
                if (isNaN(posicion) || posicion < 0 || posicion > notas.length) {
                    window.alert(`La posición debe estar comprendida entre 0 y ${notas.length}`);
                }
            } while (isNaN(posicion) || posicion < 0 || posicion > notas.length);

            notas.splice(posicion, 0, notaInsertar);
            console.table(notas);
            
            break;

        case "L":
            if (notas.length !== 0) {
                let contSuspensos = 0;
                
                for (let i = 0; i < notas.length; i++) {
                    if (notas[i] < 5) {
                        contSuspensos++;
                    }
                }
                window.alert(`Han suspendido ${contSuspensos} personas`);
            } 
            else {
                window.alert("La lista está vacía");
            }
            
            break;

        case "M":
            window.alert("Ha seleccionado finalizar el programa");
            entrar = false;
            
            break;

        default:
            window.alert("Opción no válida. Introduce una letra de la A a la M.");
            
            break;
    }

} while (entrar);

function introducirNota(mensaje) {
    let nota;
    
    do {
        nota = parseFloat(window.prompt(mensaje));
        if (isNaN(nota) || nota < 0 || nota > 10) {
            window.alert("La nota debe ser un número comprendido entre 0 y 10");
        }
    } while (isNaN(nota) || nota < 0 || nota > 10);

    return nota;
}