/* 
  Pruebas unitarias del JS del Formulario Clientes para WebAPPCrud (PHP+MySQL con Jasmine )

  Se le van a pasar pruebas de validación a la función "isOK(..)" del objeto "VAL", para 
  esto debe estar cargado el objeto "VAL" del archivo "validation.js" sinó fallarán todas las pruebas

  Esta prueba unitaria se ha diseñado para comprobación de valores NO VÁLIDOS.
  Se le van a pasar valores consecutivos de una serie de arrays y se comprobarán contra TRUE o FALSE,  
  ej:  
  ["Nombre", "a@b.c", undefined, null, false, true, 1, {}, "", "1", "12"]

  Debe arrojar un resultado de: "51 specs, 0 failures"

  by Juan José Guerra - 13-11-25
*/

//window["VAL"] = undefined; // descomentar para forzar a fallar el test

//CONTROL: Debe estar cargado el objeto "VAL" del archivo "validation.js"
if (!window["VAL"]) {
    console.warn(
        "'validation.js' debería cargarse antes de este script, sinó fallará ",
        "[51 specs, 51 failures]"
    );
}

//Constantes de uso interno, _VAL está referenciada a la global VAL definida en "validation.js"
// (que debería existir antes de cargar este script)
let _VAL = window["VAL"] || {isOK: ()=> false};
// valores válidos por defecto para todos los casos de uso
const NAME = "nombre";
const LAST = "apellido";
const LAST2 = "apellidooo";
const EMAIL = "email@email.com";
// comprueba que se encuentre cargado el script "validation.js"
const LOADED = _VAL.isOK(NAME, LAST, EMAIL, LAST2, false); // si está cargado el script debe retornar TRUE
/*console.log("LOADED: ", LOADED);
if (!LOADED) {
    throw(
        `'validation.js' deberia cargarse antes de este script, sinó habra muchas validaciones erroneas
        [49 specs, 11 failures]`
    );
}*/

describe('Validation VAL.isOK(..)::', function () {

    // Inicialización de variables
    beforeEach(function () {
        /*_VAL = window["VAL"] || {isOK: ()=> false};
        name = "nombre";
        last = "apellido";
        mail = "email@email.com";*/
    });

    // Inicial (siempre será TRUE)
    it('Comprobar "VAL"', function(){
        expect((typeof _VAL == typeof {})).toEqual(LOADED); //.toThrowError('VAL no existe!');
    });

/* : Casos en bucle para NOMBRE y APELLIDO */
    describe('[Name, Last] ->', function () {
        // TRUE
        if(!LOADED){ _VAL = {isOK: ()=> LOADED}; }
        _loopIsOK(
            `[${(LOADED+"").toUpperCase()}]`,
            {name: "Nombre", last: "Apellido", email: EMAIL},
            {k: ["name", "last"], v: ["Oe", "Juan", "StringMasLargo", "Juan-Guion", "Juán"]},
            true
        );

        // FALSE
        if(!LOADED){ _VAL = {isOK: ()=> !LOADED}; }
        _loopIsOK(
            `[${(!LOADED+"").toUpperCase()}]`,
            {name: "Nombre", last: "Apellido", email: EMAIL},
            {k: ["name", "last"], v: ["", "A", "1Juan", "Juan1", "Ju_an", "J-u-an", "Josè", "email@email.com", 0, 12, false, true, null, undefined]},
            false
        );
    });

/* : Casos en bucle para EMAIL */
    describe('[Email] ->', function () {
        // TRUE
        if(!LOADED){ _VAL = {isOK: ()=> LOADED}; }
        _loopIsOK(
            `[${(LOADED+"").toUpperCase()}]`,
            { name: NAME, last: LAST, email: "email@email.com" },
            { k: ["email"], v: ["a@b.c", "email@email.com", "uno.dos@tres.cuatro.cinco"] },
            true
        );
        // FALSE
        if(!LOADED){ _VAL = {isOK: ()=> !LOADED}; }
        _loopIsOK(
            `[${(!LOADED+"").toUpperCase()}]`,
            { name: NAME, last: LAST, email: "email@email.com" },
            { k: ["email"], v: ["a.b.c", "a@b", "a@b@c.d", 0, 12, false, true, null, undefined] },
            false
        );
    });
});

/** función externa común para los distintos bucles de comprobaciones "it" */
function _loopIsOK(label, defs, cases, target) {
    //console.log("TARGET: ", target);
    let cont = 0;
    cases.k.forEach((k) => {
        cont = 0;
        let _name = defs.name, _last = defs.last, _email = defs.email; //por defecto de inicio
        cases.v.forEach((v) => {
            // name = undefined
            if (k == "name") { _name = v; }
            if (k == "last") { _last = v; }
            if (k == "email") {  _email = v; }
            let result = _VAL.isOK(_name, _last, _email, LAST2, false);
            it(`${label}: [${cont}] Comprobar "${k}" name = ${_name}, last = ${_last}, email = ${_email}`, function () {
                //console.log(_name + ", " + _last + ", " + _email + ", " + result + "=" + target);
                expect(result).toEqual(target);
            });
            cont++; //controlar el ciclo de ejecución
        });
    });
}