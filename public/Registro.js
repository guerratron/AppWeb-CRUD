import {Field} from "./Field.js"

const _NAMES2 =  ["id", "nombre", "apellido1", "apellido2", "telefono", "email", "notas"];
const _JSON_DEFAULT3 = {
    id: 0, nombre: "Angélica", apellido1: "García", apellido2: "López", telefono: "600000001", email: "angelica@dominio.com", notas: "Cliente inicial"
};

/* Registro - by GuerraTron-25, 
 * Crea un Registro de la BD asociado a un elemento HTML. 
   let table_1 = new Registro("#elem", 4, 3, {type: "literal", background: "#4CAF50"}); "*/
export class Registro{
    static contador = 0; //variable estática

    fields = [];
    buttons = {edit: null, ok: null, cancel: null, del: null};
    selected = false;
    enable = false;
    
    //CLASE PRINCIPAL
    /** Crea una Registro de la BD asociado a un elemento HTML */
    constructor(_parent, _options) {
        this.parent = _parent;
        this.container = _parent.tbody;
        //this.container = _container.appendChild ? _container : document.querySelector(_container);

        this.options = Object.assign({
            background: "white", //"#4CAF50"
            style: "", //["red", "green", "blue", "gray", "black", "yellow", "purple", "pastel"]
            enable: true,
            selected: false,
            json: _JSON_DEFAULT3
        }, _options || {});
        this.id = this.options.json.id;
        this.enable = this.options.enable;
        this.selected = this.options.selected;
        this.cols = Object.keys(this.options.json).length;
        
        this.el = this.makeStructure();
        this.container.appendChild(this.el);

        this.setEnable(this.enable);
        this.setSelected(this.selected);
    }

    /** Realiza la estructura principal del Registro. */
    makeStructure() {
        let _this = this;
        // TODO: debería borrar también eventos para liberar memoria
        if (this.el) { this.container.removeChild(this.el); }
        this.el = document.createElement("tr");
        this.el.classList.add("reg-tr");
        // delete-button
        let td1 = document.createElement("td");
        td1.classList.add("reg-actions");
        this.el.appendChild(td1);
        this.buttons.del = document.createElement("button");
        //this.buttons.del.id = "btn"-this.id;
        this.buttons.del.classList.add("Field-edit-button");
        this.buttons.del.setAttribute("title", "eliminar");
        this.buttons.del.innerHTML = "❌";
        this.buttons.del.addEventListener("mousedown", () => {
            if(this.selected){
                //confirmar;
                //_this._import();
                this.parent.setDelete(this.id);
            }
        });
        td1.appendChild(this.buttons.del);
        //fields
        let opts = {
            type: "text",
            style: "",
            enable: true,
            id: _this.id
        };
        for(let key of Object.keys(this.options.json)){
            let val = this.options.json[key];
            this.fields.push(new Field(this, key, val, opts));
        }
        //edit-buttons
        let td2 = document.createElement("td");
        td2.classList.add("reg-actions");
        td2.appendChild(this.makeButtons());
        this.el.appendChild(td2);

        this.container.appendChild(this.el);
        this.update();
        return this.el;
    };
    
     makeButtons() {
         let parent = document.createElement("div");
         parent.classList.add("btn-group");
         this.buttons.edit = document.createElement("button");
         this.buttons.edit.classList.add("Field-edit-button");
         this.buttons.edit.setAttribute("title", "editar");
         this.buttons.edit.innerHTML = "✎";
         this.buttons.edit.addEventListener("mousedown", () => {
             //_this._import();
             this.setSelected(!this.selected); //toggle
         });
         parent.appendChild(this.buttons.edit);

         this.buttons.ok = document.createElement("button");
         this.buttons.ok.classList.add("Field-edit-button");
         this.buttons.ok.setAttribute("title", "ok");
         this.buttons.ok.innerHTML = "✔️";
         this.buttons.ok.addEventListener("mousedown", () => {
             //_this._import();
             let json = {id: this.id, fields: {}};
             this.fields.forEach((field)=>{
                json.fields[field.name] = field.value;
             })
             this.parent.setOk(json);
             this.setSelected(false);
         });
         parent.appendChild(this.buttons.ok);

         /*
         this.buttons.del = document.createElement("button");
         this.buttons.del.classList.add("Field-edit-button");
         this.buttons.del.setAttribute("title", "eliminar");
         this.buttons.del.innerHTML = "❌";
         this.buttons.del.addEventListener("mousedown", () => {
             //confirmar;
             //_this._import();
         });
         parent.appendChild(this.buttons.del);
         */

         //CANCEL
         this.container.addEventListener("keyup", (ev) => {
             if (ev.key.toLowerCase() == "escape") {
                 console.log("escape");
                 this.setSelected(false);
             }
         });
         return parent;
     }

     /** Seleccionar este registro para poder realizar acciones sobre él. */
     setSelected(trueFalse) {
         //if(this.enable){
            if(trueFalse){ this.parent.setSelected(false); } //las deselecciona todas
            this.selected = trueFalse;
            
            this.fields.forEach((field)=>{
                field.setEnable(trueFalse);
            });
            this.buttons.ok.disabled = !trueFalse;
            this.buttons.del.disabled = !trueFalse;
            if(trueFalse){ this.el.classList.add("selected"); }else { this.el.classList.remove("selected"); }
            this.update();
         //}
     }

     setEnable(trueFalse){
        this.fields.forEach((field)=>{
            field.setEnable(trueFalse);
        });
        this.enable = trueFalse;
        if(trueFalse){ this.el.classList.add("enabled"); }else { this.el.classList.remove("enabled");}
        this.update();
     }
     /** Se borrará el valor que se haya establecido en este elemento. */
     clean() {
         this.fields.forEach((field) => {
             field.clean();
         });
         this.update();
     }

     update(){
        if(!this.enable && this.selected){ this.setSelected(false); }
         this.fields.forEach((field) => {
             field.update();
         });
         //console.log(" 'Reg_" + this.id + "' UPDATED!!");
     }

}

//window["Registro"] = Registro;