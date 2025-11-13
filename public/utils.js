/** Valida los campos sencillos de texto como nombre, apellido, notas, 
 *(admite ñ, acentos o guiones) ...
 * Atención: NO tiene validación para campos específica como "email" o "password"
 * @param txt {string} El texto del campo a tratar
 * @return {boolean} true/false en función de la validez del texto.
 */
let _isTxtOK = function __isTxtOK(txt) {
    if (!txt || ((typeof txt).toLowerCase() !== 'string')) { return false; }
    txt = txt.trim().toLowerCase();
    // Expresión regular para validar cualquier texto válido (incluyendo ñ, acentos o guiones)
    const reg = /^([a-zñáéíóú]+[\'\-]{0,1}[a-zñáéíóú]+)(\s+([a-zñáéíóú]+[\'\-]{0,1}[a-zñáéíóú]+))*$/;
    return (txt.length >= 2) || reg.test(txt);
}

/** validación para campos de entrada tipo email.
 * @param email {string} El email
 * @return {boolean} true/false en función de la validez del email.
 */
let _isEmailOK = function __isEmailOK(email) {
    //console.log(n, typeof n === "string", a, e);
    if (!email || ((typeof n).toLowerCase() !== 'string')) { return false; }
    email = email.trim().toLowerCase();
    if (email.length < 2) { return false; }
    // Expresión regular para validar un formato de email básico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/** CONVERTIR FORMDATA EN JSON: se retorna un json objeto */
function _formData2json(fd){
    return Object.fromEntries(fd);
}
/** CONVERTIR JSON EN FORMDATA: json espera ser un objeto */
function _json2formData(json){
    // 1. Inicializa un nuevo objeto FormData
    const miFormData = new FormData();
    // 2. Itera sobre el objeto JSON y agrega cada par clave-valor
    for (const key in json) {
        //console.log(key, json[key]);
        miFormData.append(key, json[key]);
    }
    return miFormData;
}
/** CONVERTIR JSON EN QUERYSTRING: json espera ser un objeto */
function _json2QueryString(json) {
    return new URLSearchParams(json).toString() + "&";
}

function _setAJAX2(url, json) {
    console.log("2.Enviando a: " + url);
    /*
    let url = new URL('https://google.com/search');
    url.searchParams.set('q', 'pruébame!'); 
    let formData = new FormData([form]); // crea un objeto, opcionalmente se completa con un <form>
    formData.append(name, value); // añade un campo
    */
    // 1. Crea un nuevo objeto XMLHttpRequest
    let xhr = new XMLHttpRequest();
    // 2. Esto se llamará después de que la respuesta se reciba
    xhr.onload = function () {
        if (xhr.status != 200) { // analiza el estado HTTP de la respuesta
            alert(`Error ${xhr.status}: ${xhr.statusText}`); // ej. 404: No encontrado
            let responseObj = xhr.response;
            alert(responseObj.message); // Hola, Mundo!
        } else { // muestra el resultado
            alert(`Hecho, obtenidos ${xhr.response.length} bytes`); // Respuesta del servidor
        }
    };
    xhr.onprogress = function (event) {
        if (event.lengthComputable) {
            alert(`Recibidos ${event.loaded} de ${event.total} bytes`);
        } else {
            alert(`Recibidos ${event.loaded} bytes`); // sin Content-Length
        }
    };
    xhr.onerror = function () {
        alert("Solicitud fallida");
    };
    // seguimiento completado: sea satisfactorio o no
    xhr.onloadend = function () {
        if (xhr.status == 200) {
            console.log("Logrado");
        } else {
            console.log("error " + this.status);
        }
    };
    //------------
    //SUBIDAS
    xhr.upload.onprogress = function (event) {
        alert(`Uploaded ${event.loaded} of ${event.total} bytes`);
    };
    xhr.upload.onload = function () {
        alert(`Upload finished successfully.`);
    };
    xhr.upload.onerror = function () {
        alert(`Error durante la carga: ${xhr.status}`);
    };
    //------------
    xhr.timeout = 5000; // límite de tiempo en milisegundos, 10 segundos
    xhr.responseType = 'json';
    // 3. Configuración: solicitud GET para la URL /article/.../load
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    /*json = JSON.stringify({
        name: "John",
        surname: "Smith"
    });*/
    // 4. Envía la solicitud a la red
    xhr.send(this.json2QueryString(json)); //funciona mejor con el típico queryString
}

function _setAJAX3(url, json) {
    console.log("3.Enviando a: " + url);
    // Ejemplo implementando el metodo POST:
    async function postData(url = '', data = {}) {
        // Opciones por defecto estan marcadas con un *
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }

    postData(url, {
            answer: 42
        })
        .then(data => {
            console.log(data); // JSON data parsed by `data.json()` call
        });
}

function _setAJAX4(url, data) {
    console.log("4.Enviando a: " + url);
    /*const data = new FormData();
    data.append("func", "BAJA");
    data.append("id_cat", "uno");
    data.append("movi", "dos");*/

    fetch(url, {
            method: 'POST',
            body: data
        })
        .then(resp => resp.json())
        .then(data_resp => {
            // la data_resp nos llega en formato JSON
            console.log(data_resp);
        }).catch(e => {
            console.warn(e);
        });
}

const UTILS = {
    isTxtOK: _isTxtOK,
    isEmailOK: _isEmailOK,
    formData2json: _formData2json,
    json2formData: _json2formData,
    json2QueryString: _json2QueryString
};
export default UTILS;

//Exporta al entorno global el namespace "VAL" con funciones de validación
 //window["UTILS"] = UTILS;
