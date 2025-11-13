
/* Field - by GuerraTron-25, 
 * Crea un Field de un Registro de la BD, asociado a un elemento HTML. 
   let field1 = new Field("#elem", 4, 3, {type: "string", background: "#4CAF50"}); "*/
export class Field{
    static contador = 0; //variable estática
    
    //CLASE PRINCIPAL
    /** Crea un Field de un Registro de la BD, asociado a un elemento HTML.
     * Se supone que el _parent será un objeto "Registro" que contendrá un elmento "tr" 
     * de una tabla al que se le entregará como hijo el elemento (this.el) creado por esta 
     * clase [un elemento "td"]
     */
    constructor(_parent, _name, _value, _options){
        this.parent = _parent;
        this.container = _parent.el;
        this.name = _name || "n?";
        this.value = (typeof _value) == "undefined" ? "": _value;
        this.options = Object.assign({
            type: "text",
            style: "",   //["red", "green", "blue", "gray", "black", "yellow", "purple", "pastel"]
            enable: true,
            id: Field.contador++
        }, _options || {});
        this.id = this.options.id;
        this.type = this.options.type;
        this.enable = this.options.enable;
        
        this.el = this.makeStructure();
    }

    /** Realiza la estructura principal de la Field. */
    makeStructure(){
        // TODO: debería borrar también eventos para liberar memoria
        if(this.el){ this.container.removeChild(this.el); }
        this.el = document.createElement("td");
        this.el.classList.add("field-td");
            this.input = document.createElement("input");
            this.input.classList.add("field-input");
            this.input.type = this.type;
            this.input.value = this.value;
            this.input.title = this.name;
            this.input.enable = this.enable;
            if(this.options.style){ this.input.setAttribute("style", this.options.style); }
            
            this.input.style.width = "98%";
            if (this.name == "id") {
                this.input.style.width = "33%";
            }
            if (this.name == "telefono") {
                this.input.style.width = "65%";
            }
            this.input.addEventListener("change", ()=>{
                this.value = this.input.value;
            });
            this.input.addEventListener("focus", () => {
                this.input.classList.add("field-input-selected");
            });
            this.input.addEventListener("blur", () => {
                this.input.classList.remove("field-input-selected");
            });
        this.el.appendChild(this.input);
        this.container.appendChild(this.el);
        this.update();
        return this.el;
    };

    setEnable(trueFalse) {
        this.enable = trueFalse;
        this.input.disabled = !trueFalse;
        if(trueFalse){ this.input.classList.add("enabled"); }else { this.input.classList.remove("enabled"); }
        this.update();
    }
    /** Se borrará el valor que se haya establecido en este elemento. */
    clean(){
        this.value = "";
        this.input.value = "";
        this.update();
    };

    update(){
        //this.callbackUpdate();
        //console.log(" 'Field_" + this.id + "' UPDATED!!");
    };

}

//window["Field"] = Field;