// AUTO-CARGA LA CLASE "Table"
/*(function () {
    let head = document.querySelector("head");
    let script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("defer", true);
    script.setAttribute("src", "validation.js");
    head.appendChild(script);
})();*/

import {protocol, host, port, path} from "./conex_conf.js"
import UTILS from "./utils.js"
import {Table} from "./Table.js"

/** 2 registros de ejemplo */
const _JSON_DEFAULT1 = {
    regs: [
        {id: 0, nombre: "Angélica", apellido1: "García", apellido2: "López", telefono: "600000001", email: "angelica@dominio.com", notas: "Cliente inicial"},
        {id: 1, nombre: "Aniceto", apellido1: "Cáceres", apellido2: "Díaz", telefono: "600000002", email: "aniceto@dominio.com", notas: "VIP"},
        {id: 2, nombre: "Juan José", apellido1: "Guerra", apellido2: "Haba", telefono: "11223344", email: "dinertron@gmail.com", notas: "ADMIN"}
    ]
};
const _INSERT_REQUIRED_VALUES = ["nombre", "apellido1", "apellido2", "email"];
const _SEARCH_REQUIRED_VALUES = []; //"email"]"nombre", "apellido1", "apellido2", 

/* ClientsAPI - by GuerraTron-25, 
 * Se encarga de toda la lógica de la página y la comunicación con el server */
export class ClientsAPI{
    "use strict";

    static contador = 0; //variable estática
    //antes de nada corregir el puerto vacío
    baseUrlSend = `${protocol + "://" + host + (port ? (":" + port) : "")}/${path}`;
    btnSubmit;
    chkSearch;
    btnClean;
    action = "";
    regs = _JSON_DEFAULT1.regs; //[] , typeof _JSON_DEFAULT1.regs
    error = "";
    searches = [];
    
    //CLASE PRINCIPAL
    /** Crea una Table HTML interactiva, con las celdas editables para la actualización a través de AJAX 
     * del listado de clientes. Y controla las llamadas CRUD al Server, y sus valores de retorno.
     * @param _table_container {HTMLElement | String} Admite una tabla como contenedor (puede ser un id)
     * @param _options {Object} Objeto con las opciones pertinentes
     */
    constructor(_table_container, _options) {
        this.id = ClientsAPI.contador++;
        if(!_table_container){
            this.table_container = document.createElement("table");
            document.body.appendChild(this.table_container);
        }else{
            this.table_container = _table_container.appendChild ? _table_container : document.querySelector(_table_container);
        }

        let _this = this;
        this.options = Object.assign({
            background: "white",
            style: "",
            formAdd: null, //REPRESENTA UN FORMULARIO EXTERNO PARA INSERTAR
            json: []// _this.regs
        }, _options || {});
        this.json = this.options.json;
        this.formAdd = this.options.formAdd;
        //CONTROLA EL FORMULARIO EXTERNO
        if(this.formAdd){
            this.chkSearch = this.formAdd.chkSearch;
            this.chkSearch.addEventListener("change", (ev) => {
                if (this.chkSearch.checked) {
                    this.formAdd.telefono.setAttribute("disabled", true);
                    this.formAdd.notas.setAttribute("disabled", true);
                } else {
                    this.formAdd.telefono.removeAttribute("disabled");
                    this.formAdd.notas.removeAttribute("disabled");
                }
            });
            this.btnClean = this.formAdd.btnClean;
            this.btnClean.addEventListener("click", (ev) => {
                ev.stopPropagation();
                ev.preventDefault();
                this.chkSearch.checked = false;
                if (this.chkSearch.checked) {
                    this.formAdd.telefono.setAttribute("disabled", true);
                    this.formAdd.notas.setAttribute("disabled", true);
                } else {
                    this.formAdd.telefono.removeAttribute("disabled");
                    this.formAdd.notas.removeAttribute("disabled");
                }
                this.formAdd.nombre.value = "";
                this.formAdd.apellido1.value = "";
                this.formAdd.apellido2.value = "";
                this.formAdd.email.value = "";
                this.formAdd.telefono.value = "";
                this.formAdd.notas.value = "";
                this.setList();
            });
            //return false;
            Array.from(this.formAdd.elements).forEach((f)=>{
                let required = this.chkSearch.checked ? _SEARCH_REQUIRED_VALUES : _INSERT_REQUIRED_VALUES;
                if (required.includes(f.id)) {
                    f.addEventListener("change", () => {
                        let required2 = this.chkSearch.checked ? _SEARCH_REQUIRED_VALUES : _INSERT_REQUIRED_VALUES;
                        // se difieren las acciones para no ralentizar el evento "change"
                        if (required2.includes(f.id)) {
                            setTimeout(() => {
                                let value = VAL.check(f.id, f.value);
                                if (!value) {
                                    alert(`💥 Valor para "${f.name}" NO VÁLIDO!`);
                                    f.value = "";
                                    if(f.name == "email"){ location.href = "404.html"; }
                                }
                            }, 200);
                        }
                    });
                }
            });
            // route + submit
            this.formAdd.action = `${this.baseUrlSend}clients.php`;//?action=add&`;
            this.btnSubmit = this.formAdd.submit;
            this.btnSubmit.addEventListener("click", (ev) => {
                ev.stopPropagation();
                ev.preventDefault();
                let _stop = false;
                Array.from(this.formAdd.elements).forEach((f) => {
                    let required = this.chkSearch.checked ? _SEARCH_REQUIRED_VALUES : _INSERT_REQUIRED_VALUES;
                    if (required.includes(f.id)) {
                        if(!f.value){ _stop = true; }
                    }
                });
                if(!_stop){
                    console.log("se envía a Ajax añadiendole la queryString");
                    const datosFormulario = new FormData(this.formAdd);
                    if (this.chkSearch.checked) {
                        //console.log(this.datosFormulario, UTILS.formData2json(datosFormulario));
                        this.setSearch(UTILS.formData2json(datosFormulario));
                    } else { //`${this.formAdd.action}?action=insert`
                        this.setInsert(UTILS.formData2json(datosFormulario));
                    }
                }else{
                    alert(`💥 Comprobar Valores. Alguno Requerido Vacío!`);
                }
            });
        }

        this.table = new Table(this, this.options);

        this.loading = document.createElement("img");
        this.loading.src = "loading.gif";
        this.loading.setAttribute("style", "width: 25%; margin:auto; position:absolute; bottom:-50%; left:38%;");
        //this.loading.classList.add("hidden");
        this.table.tdf.appendChild(this.loading);

        this.setList();
    }

    checkRequired(json, msg = ""){
        let check = json.nombre && json.apellido1 && json.apellido2 && json.email;
        if(!check){
            console.log(`${msg} Faltan campos obligatorios`);
            this.setMsg(` ❗ ${msg} ! Faltan campos obligatorios`);
            return false;
        }
        return check;
    }

    /** recibe la respuesta de la llamada AJAX y actualiza los registros (o los recrea) de la Tabla */
    update(arrJson = []){
        //if(arrJson.length > 0){
            this.table.reset(); //la resetea y recrea para quedarla limpia
            arrJson.forEach((reg)=>{
                //console.log(reg);
                this.table.addReg(reg);
            });
        //}
    }

    /** Obtiene el registro para actualizar en el formato json:  
     * {
     *      id: 0, 
     *      fields: {
                apellido1: "García"
                apellido2: "López2"
                email: "angelica@dominio.com"
                nombre: "Angélica"
                notas: "Cliente inicial"
                telefono: "600000001"
            }
        }
        Se debe lanzar una llamada AJAX para actualizar la BD
     */
    setOk(json) { //sinónimo de update
        //adaptamos el json al nuevo formato que necesitan las consultas de la BD
        let newJson = {};
        for(let k of Object.keys(json.fields)){
            newJson[k] = json.fields[k];
        }
        console.log("Update Reg ?: ", json);
        this.action = "update";
        this.loading.classList.remove("hidden");
        if (!this.checkRequired(newJson, "Actualización CANCELADA ")) {
            return false;
        }
        let result = confirm(`✒️ ACTUALIZAR REGISTRO ❗ ❕\n\n Desea actualizar el registro con 'id=${json.id}' ❓❓`);
        if (result) {
            console.log(`OK, orden de actualizar el registro con 'id=${json.id}'`, result);
            this.setAJAX(`update`, newJson);
        } else {
            console.log(`Actualización del registro con 'id=${json.id}' CANCELADA !`);
            this.setMsg(`Actualización del registro con 'id=${json.id}' CANCELADA !`);
        }
    }
    setList() {
        console.log("List Reg");
        this.action = "list";
        this.loading.classList.remove("hidden");
        console.log(`OK, orden de listar todos los registros de la BD`);
        this.setMsg(`OK. Listado de Clientes en proceso..`);
        this.setAJAX(`list`, {});
    }
    /** necesita 4 campos: nombre, apellido1, apellido2 y email */
    setSearch(json) {
        this.action = "search";
        this.loading.classList.remove("hidden");
        console.log("Search Regs");
        console.log(`OK, orden de buscar todos los clientes que cumplan la condición`, json);
        this.setMsg(`OK. Realizándose busqueda..`);
        this.setAJAX(`search`, json);
    }
    /** INSERTAR */
    setInsert(json) {
        this.action = "insert";
        this.loading.classList.remove("hidden");
        if (!this.checkRequired(json, "Inserción CANCELADA ")) {
            return false;
        }
        //console.log("Delete Reg: " + id + " ?");
        let result = confirm(`🚀 INSERTAR REGISTRO \n\n Insertar un nuevo registro ❓❓`);
        //console.log("Result: ", result);
        if (result) {
            console.log(`OK, orden de insertar un nuevo registro`, result);
            this.setMsg(`OK. Insertar en proceso..`);
            //this.setAJAX(`${this.baseUrlSend}clients.php?action=del&`, json);
            this.setAJAX(`insert`, json);
        } else {
            console.log(`Nuevo Registro CANCELADO !`);
            this.setMsg(`Nuevo Registro CANCELADO !`)
        }
    }
    /** Se debe lanzar una llamada AJAX para eliminar el registro por 'id' en la BD */
    setDelete(id) {
        this.action = "del";
        this.loading.classList.remove("hidden");
        //console.log("Delete Reg: " + id + " ?");
        let result = confirm(`💣 ELIMINAR REGISTRO ❗ ❕\n\n Seguro que desea eliminar el registro con 'id=${id}' ❓❓`);
        //console.log("Result: ", result);
        if(result){
            console.log(`OK, orden de eliminar el registro con 'id=${id}'`, result);
            this.setAJAX(`del`, {"id": id});
            //this.setAJAX(`${this.baseUrlSend}clients.php?action=${action}&`, json);
        }else{
            console.log(`Elimnación del registro con 'id=${id}' CANCELADA !`);
            this.setMsg(`Elimnación del registro con 'id=${id}' CANCELADA !`)
        }
    }

    setMsg(msg, style = "background: whiteSmoke; color: #333;") {
        //diferimos el mensaje
        setTimeout(()=>{
            this.loading.classList.add("hidden");
            this.table.setMsg(msg, style);
        }, 200);
    }

    /** Solicitud a través de AJAX a la dirección proporcionada, con respuesta asíncrona. */
    setAJAX(action, json = {}){
        let url = `${this.baseUrlSend}clients.php?action=${action}&`;
        console.log("1.Enviando a: " + url, json);
        url += (/\?/.test(url) ? "&" : "?") + new Date().getTime();//permite saltar la caché
        let _this = this;
        this.loading.classList.remove("hidden");
        let xhttp = new XMLHttpRequest();
        // seguimiento completado: sea satisfactorio o no
        xhttp.onloadend = function(){ //en este caso mejor que las funciones flecha (no pierde el scope)
            if (this.readyState == 4) {
                if (this.status == 200) {
                    console.log(":RESPONSE:", this.response, this.responseType);//JSON.parse(this.responseText));
                    let style = "background: aquamarine; color: darkGreen;";
                    if(this.response.error){
                        style = "background: yellow; color: red;";
                    }
                    _this.setMsg(this.response.error ? ("⛔" + this.response.error) : "✔️ OK! consulta satisfecha.", style);
                    _this.error = this.response.error;
                    /*if(_this.action == "search"){
                        _this.searches = this.response.regs;
                        _this.showSearches();
                    }else{*/
                        _this.regs = this.response.regs;
                        _this.update(this.response.regs);
                    //}
                    if (_this.action == "search") {
                        _this.searches = this.response.regs;
                    }
                }else if (this.status == 404) {
                    _this.setMsg("☹ 404. Page not found.", "background: yellow; color: red;");
                    location.href = "404.html";
                }else{
                    _this.setMsg(`💥 ${this.status}. Augghttt!, Algo salió mal!!.`, "background: red; color: yellow;");
                }
            }
        };
        //Content-Type como application/x-www-form-urlencoded
        //xhttp.overrideMimeType("xml/application/json");
        xhttp.timeout = 5000; // límite de tiempo en milisegundos, 10 segundos
        xhttp.responseType = 'json';
        xhttp.open("POST", url, true);
        // application/x-www-form-urlencoded'); //'application/json; charset=utf-8');
        xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');//para queryString
        //xhttp.send(UTILS.json2formData(json));
        //console.log(json, UTILS.json2QueryString(json));
        xhttp.send(UTILS.json2QueryString(json)); //funciona mejor con el típico queryString
    }

   /** Puede realizarse la misma consulta que con AJAX pero con promesas FETCH (más actual) 
    setFETCH(url, json) {
        console.log("3.Enviando a: " + url);
        //saltar la caché
        url += (/\?/.test(url) ? "&" : "?") + new Date().getTime();
        // Ejemplo implementando el metodo POST:
        async function postData(url2 = '', data = {}) {
            // Opciones por defecto estan marcadas con un *
            const response = await fetch(url2, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'no-cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'omit', // include, *same-origin, omit
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
    } */

}


window["ClientsAPI"] = ClientsAPI;