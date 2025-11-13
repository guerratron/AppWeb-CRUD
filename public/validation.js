/** Valida los campos esperados de nombre, apellido e email.
 * @param n {string} El nombre de usuario
 * @param a {string} Primer Apellido
 * @param e {string} Un email válido
 * @param a2 {string} Último Apellido
 * @param isRun {boolean} Permite ejecutar esta función en entornos de pruebas unitarias (como jasmine)
 * @return {boolean} true/false en función de la validez de los datos.
 */
let _isOK = function __isOK(n, a, e, a2, isRun = true) {
    //console.log(n, typeof n === "string", a, e);
    if (!n || !a || !a2 || !e || (typeof n !== 'string') || (typeof a !== 'string') || (typeof a2 !== 'string') || (typeof e !== 'string')) {
        return false;
    }
    //console.log(n, a, a2, e);
    n = n.trim();
    a = a.trim();
    a2 = a2.trim();
    e = e.trim().toLowerCase();
    // 1. Expresión regular para validar cualquier nombre o apellido (incluyendo ñ, acentos o guiones)
    const na = /^([A-Za-zÑñÁáÉéÍíÓóÚú]+[\'\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+[\'\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/;
    // 3. Validar campos vacíos
    if (!n || (n.length < 2) || !na.test(n)) {
        if (isRun) {
            let nombre = _getElementByVal(n);
            alert('Nombre Usuario: Revisar caracteres permitidos.');
            if(nombre){ nombre.focus(); }
        }
        return false; // Detener la función si hay un error
    }

    if (!a || (a.length < 2) || !na.test(a)) {
        if (isRun) {
            let apellido = _getElementByVal(a);
            alert('Apellido 1: Revisar caracteres permitidos.');
            if(apellido){ apellido.focus(); }
        }
        return false;
    }
    
    if (!a2 || (a2.length < 2) || !na.test(a2)) {
        if (isRun) {
            let apellido2 = _getElementByVal(a2);
            alert('Apellido 2: Revisar caracteres permitidos.');
            if(apellido2){ apellido2.focus(); }
        }
        return false;
    }

    // 4. Expresión regular para validar un formato de email básico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(e)) {
        if (isRun) {
            let email = _getElementByVal(e);
            alert('El formato del correo electrónico no es válido.');
            if(email){ email.focus(); }
        }
        return false;
    }
    return true; //n && a && e;
}

/** Busca un input del formulario por su valor introducido */
function _getElementByVal(value){
    Array.from(document.querySelectorAll("input")).forEach((el)=>{
        if(el.value == value){ return el; }
    });
    return null;
}

/** va llamando a la función __isOK con valores con un sólo valor, el resto preparados.
 * Sólo válido para nombre definidos en variable "valsDef"
 */
function _check(name, value){
    let valsDef = {nombre: "nombre", apellido1: "apell", apellido2: "apellido", email: "a@b.c"};
    valsDef[name] = value;
    if(!_isOK(valsDef.nombre, valsDef.apellido1, valsDef.email, valsDef.apellido2)){
        value = "";
    }
    return value;
}

//Exporta al entorno global el namespace "VAL" con funciones de validación
 window["VAL"] = {
     isOK: _isOK,
     check: _check,
     getElementsByVal: _getElementByVal
 };
