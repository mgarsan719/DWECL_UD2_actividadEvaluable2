const participantes = new Set();
let entrar = true;

do {
    const entrada = window.prompt(
        "Introduce una opción:\n" +
        "A. Inscribir un participante\n" +
        "B. Dar de baja un participante\n" +
        "C. Comprobar inscripción\n" +
        "D. Mostrar participantes\n" +
        "E. Vaciar inscripciones\n" +
        "F. Salir"
    );

    const opt = entrada.trim().toUpperCase();

    switch (opt) {
        case "A":
            const nombreInscribir = introducirNombre("Introduce el nombre del participante a inscribir:");
            if (nombreInscribir !== null) {
                if (participantes.has(nombreInscribir)) {
                    window.alert(`El participante "${nombreInscribir}" ya está inscrito. No se permiten duplicados.`);
                } else {
                    participantes.add(nombreInscribir);
                    window.alert(`"${nombreInscribir}" ha sido inscrito correctamente.`);
                    console.log(participantes);
                }
            }
            break;

        case "B":
            if (participantes.size !== 0) {
                const nombreBaja = introducirNombre("Introduce el nombre del participante a dar de baja:");
                if (nombreBaja !== null) {
                    if (participantes.delete(nombreBaja)) {
                        window.alert(`"${nombreBaja}" ha sido dado de baja.`);
                        console.log(participantes);
                    } else {
                        window.alert(`El participante "${nombreBaja}" no se encuentra inscrito.`);
                    }
                }
            } else {
                window.alert("No hay participantes inscritos.");
            }
            break;

        case "C":
            if (participantes.size !== 0) {
                const nombreComprobar = introducirNombre("Introduce el nombre del participante a comprobar:");
                if (nombreComprobar !== null) {
                    if (participantes.has(nombreComprobar)) {
                        window.alert(`Sí, "${nombreComprobar}" está inscrito en la actividad.`);
                    } else {
                        window.alert(`No, "${nombreComprobar}" no está inscrito en la actividad.`);
                    }
                }
            } else {
                window.alert("No hay participantes inscritos.");
            }
            break;

        case "D":
            if (participantes.size !== 0) {
                let lista = "Participantes inscritos:\n";
                for (const nombre of participantes) {
                    lista += `- ${nombre}\n`;
                }
                lista += `\nTotal de participantes: ${participantes.size}`;
                window.alert(lista);
            } else {
                window.alert("No hay participantes inscritos todavía.");
            }
            break;

        case "E":
            participantes.clear();
            window.alert("Se han vaciado todas las inscripciones.");
            console.log(participantes);
            break;

        case "F":
            window.alert("Ha seleccionado finalizar el programa, saliendo...");
            entrar = false;
            break;

        default:
            window.alert("Opción no válida. Introduce una letra de la A a la F.");
            break;
    }

} while (entrar);

function introducirNombre(mensaje) {
    let nombre;
    do {
        nombre = window.prompt(mensaje);
        if (nombre === null) {
            return null;
        }
        nombre = nombre.trim();
        if (nombre === "") {
            window.alert("El nombre no puede estar vacío.");
        }
    } while (nombre === "");

    return nombre;
}