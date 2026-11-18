const notas = [];
let entrar = true;

do {
    const opt = window.prompt("Introduce una opcion: \n" +
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
        "M. Salir: Finalizar la ejecución del programa.\n"
    ).toUpperCase();

    switch (opt) {
        case "A":
            notas.unshift(introducirNota("Introduce una nota:"));
            console.table(notas);
            break;

        case "B":
            notas.push(introducirNota("Introduce una nota:"));
            console.table(notas);
            break;

        case "C":
            let subidaNota = parseFloat(window.prompt("Introduzca cuantos puntos quiere subir a todas las notas:"));
            for (let i = 0; i < notas.length; i++) {
                if (notas[i] < 10) {
                    notas[i] += subidaNota;
                }
                else {
                    window.alert(`La nota en la posicion ${i} es 10, no puede aumentar`);
                    notas[i] += 0;
                }
            }
            console.table(notas);
            break;

        case "D":
            //FALTA MODA
            let vacia = notas.length;

            if (vacia != 0) {
                let moda;
                let maximo = -Infinity;
                let minimo = Infinity;
                let media;
                let suma = 0;
                for (let i = 0; i < notas.length; i++) {
                    if (notas[i] > maximo) {
                        maximo = notas[i];
                    }

                    if (notas[i] < minimo) {
                        minimo = notas[i];
                    }
                    suma += notas[i];
                    media = suma / notas.length;
                }

                window.alert(`Estadisticas: \n` +
                    `La moda es: ${moda}\n` +
                    `El maximo es ${maximo}\n` +
                    `El minimo es ${minimo}\n` +
                    `La media es ${media.toFixed(2)}\n`
                );
            }
            else {
                window.alert("No hay notas para calcular las estadisticas");
            }
            break;

        case "E":
            notas.splice(0, notas.length);
            window.alert("Tabla borrada");
            console.table(notas);
            break;

        case "F":
            let numNotas = 0;

            while (numNotas <= 0) {
                numNotas = parseInt(window.prompt("Introduzca el numero de notas que desea generar"));
                if (numNotas <= 0) {
                    window.alert("El numero de notas debe ser mayor que 0");
                }
            }

            let nota = introducirNota("Introduce una nota");

            for (let i = 0; i < numNotas; i++) {
                notas.push(nota);
            }

            window.alert(`Se han añadido ${numNotas} ${nota}`);
            console.table(notas);
            break;

        case "G":
            if (notas.length != 0) {
                notas.shift();
                console.table(notas);
            }
            else {
                window.alert("La lista de notas está vacía");
            }
            break;

        case "H":
            if (notas.length >= 1) {
                notas.splice(1, 1);
                console.table(notas);
            }
            else {
                window.alert("La lista de notas está vacía");
            }
            break;

        case "I":
            if (notas.length != 0) {
                for (let i = 0; i < notas.length; i++) {
                    if (notas[i] < 5) {
                        notas[i] = 0;
                    }
                }
                break;
            }
            else {
                window.alert("La lista de notas está vacía");
            }


        case "J":
            if (notas.length != 0) {
                let notaOrigen = introducirNota("Introduzca la nota a cambiar en la lista");
                let notaDestino = introducirNota("Introduzca la nota sustituyente");

                for (let i = 0; i <= notas.length; i++) {
                    if (notas[i] == notaOrigen) {
                        notas[i] = notaDestino;
                    }
                }
            }
            else {
                window.alert("La lista de notas está vacía");
            }

            break;

        case "K":
            if (notas.length != 0) {
                let nota = introducirNota("Introduce una nota");
                let posicion;
                while(posicion==isNaN || posicion<0 || posicion>notas.length){
                    posicion=parseInt(window.prompt("Introduce una posicion"));
                    if(posicion==isNaN){
                        window.alert("La posicion debe ser un numero");
                    }
                    if(posicion<0 || posicion>notas.length){
                        window.alert(`La posicion debe estar comprendida entre 0 y ${notas.length-1}`);
                    }
                }

                notas.splice(posicion, 0, nota);
            }
            else{
                window.alert("La lista está vacía");
            }
            break;

        case "L":
            break;

        case "M":
            window.alert("Ha seleccionado finalizar el programa, saliendo");
            entrar = false;
            break;

    }

} while (entrar);

function introducirNota(mensaje) {

    let nota;

    do {
        nota = parseFloat(window.prompt(mensaje));

        if (nota < 0 || nota > 10) {
            window.alert("La nota debe estar comprendida entre 0 y 10");
        }
    } while (nota < 0 || nota > 10);

    return nota;
}