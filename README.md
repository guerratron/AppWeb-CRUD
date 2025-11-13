# <i style="display:none;">TOP</i>  
> -----------------------------------------------------------------------------------------------------  
>   [![logo](./public/logo_mini.png "Página de prueba")](https://guerratron.kesug.com/ "Página de prueba")  
> '**PHP+MySQL**' (PHP Web-APP) &emsp;-&emsp; App mínima para alta, baja, modificación y listado de clientes en MySQL.  
> Author:  Juan José Guerra Haba - <dinertron@gmail.com> &emsp;-&emsp; Nov, 2025  
> Web:     https://guerratron.kesug.com/  
> License: Free BSD. & Open GPL v.3. Keep credit, please.  
> Idea Original: **Juan J. Guerra Haba**  
> Versión: 0.1.0  
> Proyect:    PHP+MySQL Javascript &emsp; Package: WebAppCRUD.zip &emsp; Main Class: clientes.php  
> 
> ----------------------------------------------------------------------------------------------------  

<h3>🏠︎ Tabla de contenidos 🖇️</h3>

- [📖 Título y Descripción](#📖-titulo_y_descripcion)
- [🏷️ Requisitos](#🏷️-requisitos)
- [🗁 Estructura de Carpetas](#🗁-estructura_de_carpetas)
- [📋 Características](#📋-caracteristicas)
- [🔧 Resumen De Uso](#🔧-resumendeuso)
- [⚙️ Desarrollo](#⚙️-desarrollo)
- [💥 Pruebas Unitarias](#💥-pruebasunitarias)
- [⌨️ Preview](#⌨️-preview)
- [🚀 Aviso](#🚀-aviso)
- [✨ Mejoras](#✨-mejoras)
- [🌍 Paquete](#🌍-paquete)
- [📄 License](#📋-license)
- [🎁 Agradecimientos](#🎁-agradecimientos)
- [✒️ Credits](#✒️-credits)

<p style="display:none;">📋 🔧 ⌨️ ⌨ 🖮  ⚙️ 🚀 📌 ✒️ 🎁  ⎃ ⌂ ☗ 🏠︎ 🏚️ 🏠 ♥ ❤ ❤️ 💖 ★ ⍟ ✨ ⭐ ⭕ 
〽️ ♯ ☑️ ✔️ ✓ ✗ ✖️ ❌ ❗ ❕ ❓ ❔ ⍰ ⯑ 🛈 ⚠ ⚠️ ⚿ ⛔︎ ⛔ 💣 🎈 🔡 🔣
‖ ” „ ƒ ∀ ⌬ ∅ ♖ ♜ 🏆︎ 🏆 🎰 🎮 🎖 🎖️ 🏅
🜉 ⌁ ⭍ 🗲 🗱 ⚡ ⍾ ⏚ ⏛ ⏦ 〰 ♒︎ ☁  ➕ ➖
⌛︎ ⏳︎ ∵ ⛬ 🝆 ⋙ ⭆ ⟹ ⇨ ⊳ ⌲ ➤ ⬀ 🔝 ∭ ↺ ⮔ 🔄 ∾ ∞ ⋈ ♾ ⊕ ⊚ ⌾ 🞇 ⬤ ⏺ ⚫︎ 🞑 🅢 🆂 Ⓢ 🅂 ╬ ⋮ Ξ π ω Ω ⅏ 🀰 🙼 🙾 
⛿ ⚐ ⚑ ⛳︎ 🏳️ 🏴 🏷️ ⚒ 🛠 ⚒️ ⚙ ⛯ ⛓ ⛓️ 🔗 ⛶ ⯐ ✉ ✉️ 📧 🌍︎ 🌍 ✎ ❒ 𝄝 𝄜 🎵 ☺ ☻ ☹ 👤 👦 💥 💤
🜲 🌡 🎚 🎚️ 📷︎ 📷 👁 👁️ 👀 📤︎ 📥︎ 🔓︎ 🔒 🔑 🕨 🕪 🔇 🔈 🔊 🕭 🔔 🔕 🕮 📖 🖋 🖈 📌 📎 📏 🖑 🖫 💾 🗎 📄 🗀 🗁 🗑 🗓 📆 📅 
📟 🗗 🗠 📈 📊 🗩 💬 📦 💯 🔋 🔎</p>
<style>
    blockquote{
        text-align: center;
    }
    .info{
        background:lightBlue;
        color: #333333;
    }
    .alert{
        border-radius: 6px;
        font-size: 0.6em;
        color: blue;
        background: navajoWhite;
        padding: 10px;
    }
    .green{
        color: navy;
        background: lightGreen;
    }
    .preview{
        width: 100%;
        cursor: pointer;
    }
    .mini-preview{
        width: 25%;
        cursor: pointer;
    }
    .bg-SERVICER{
        border-radius: 10px;
        padding: 5px;
        margin: 5px;
        color: lightBlue;
        background: navy;
    }
    .bg-SERVICER>ul>li>i, .bg-FREEDER>ul>li>i{
        background-color: lemonchiffon;
        color: red;
        padding: 0 4px;
        margin-right: 5px;
        line-height: 1.3em;
    }
    .bg-FREEDER{
        border-radius: 10px;
        padding: 5px;
        margin: 5px;
        color: lime;
        background: darkgreen;
    }
    .float-left{
        float: left;
    }
    .clearfix{
        clear: both;
    }
    .small{
        font-size: x-small;
        color: gray;
    }
    h1{
        text-align:center;
    }
    h2>span{
        float:left;
    }
</style>

# 📖-TITULO_y_DESCRIPCION
<img class="logo" src="./public/favicon.ico" title="logo" /> Gestor de clientes (CRUD) v0.1.0 <span class="small">by [GuerraTron-25][authorEmail]</span>

Entrega v0.1.0 Aplicación mínima para alta, baja, modificación y listado de clientes en MySQL.  

<pre>
Esta <i>mini-app</i> o <b>mini-portal-web</b> se ha desarrollado a modo de muestra para las <b>evaluaciones de certificación de profesionalidad</b> de desarrollo de apps web del <b>IECA</b>.

Se ha montado y probado tanto en <i>LOCAL</i> como en <i>SERVER</i> y funciona bien.
</pre>

No se pretende programar un sitio completo, más bien un pequeño esbozo que muestre un poco la programación en `HTML, CSS, Javascript, PHP Y SQL`. 

LADO CLIENTE:  
Se trata de una *web ficticia* que tiene un formulario de **gestión de clientes** y donde puede verse un listado y realizar una serie de acciones.  
También podrá visualizarse el resultado de cada acción de forma asíncrona con llamadas a través de AJAX. 

LADO SERVIDOR:  
*PHP* controla la parte de conexionado con la **Base de Datos** y sus consultas a través de acciones **CRUD** (Create-Remove-Update-Delete), para realizar las acciones solicitadas o retornar valores.
mostrar a través de diferentes páginas html una salida exitosa o no.


<p class="alert orange">ATENCIÓN: 🔒 Esta página debería estar protegida con contraseña y ser de acceso restringido, sólo accesible por personal autorizado para administrar la gestión de clientes de la empresa</p>

## 🏷️-REQUISITOS
 - Opción A (PHP): PHP 8.x, Apache/Nginx, MySQL 8.x, extensión PDO.

### Instalación (4–6 pasos numerados)  
1) Crear BD: mysql -u root -p < db.sql 
2) PHP: copiar src/ a tu servidor y apuntar el DocumentRoot a public/ 
3) Abrir http://localhost:8080 (o el puerto que indiques) y probar.
4) Interactuar con el formulario de registro y consulta de clientes.

## 🗁-Estructura_De_Carpetas
2–5 líneas explicando qué hay en src/, public/, etc.

## Control_de_Versiones
### Tag (etiquetas de version) y release notes (notas de versión):  

Se ha utilizado Git para crear el repositorio y llevar el control y numeración de versiones utilizando los siguientes comandos:
 - crear "git init" | clonar "git clone" repositorio (yo lo he hospedado en GitHub, por lo tanto lo he clonado vacío)  
 `git clone https://github.com/guerratron/AppWeb-CRUD.git`  
 - crear una etiqueta anotada inicial  
 `git tag -a v0.1.0 -m "Inicio de la primera version de la app-web con CRUD"`
 - subir la etiqueta al repositorio remoto  
 `git push origin v0.1.0` ó todas las etiquetas `git push origin --tags`

### Modelo de release notes (Un resumen breve (4 ó 5 líneas) de qué incluye esa versión y cómo afecta al despliegue):
v0.1.0 
 - CRUD mínimo de clientes (crear, listar con búsqueda, modificar, borrar). 
 - Validación de email y control de duplicados. 
 - Script db.sql con datos de ejemplo. 
 - README de instalación y api.md con ejemplos.

-----------
-----------

## 📋-CARACTERISTICAS:
 - Se han **insertado comentarios** a lo largo de todo el código explicando su funcionalidad, también se ha **documentado** las funciones utilizadas para explicar su uso, e incluso se ha creado este **README**
 - Se han respetado los estándares `HTML5`
 - Se han filtrado por seguridad los datos introducidos por el formulario en 3 capas distintas: `HTML, Javascript y PHP`
 - Se le ha dotado de un mínimo `CSS` para hacerla más amigable
 - Se han utilizado **etiquetas semánticas** en el HTML
 - Se ha incluido componentes comunes en HTML como el "Breadcrumbs" o el "pié de página"
 - Se han utilizado distintos `eventos javascript` para controlar el formulario.
 - Se ha intentado separar la **lógica** de la **presentación**.
 - Se ha utilizado **MySQL** para crear y guardar los datos de las suscripciones.
 - Se han tratado de *forma segura los datos sensibles* de acceso a la *base de datos*, separándolos en directorios protegidos por un `.htaccess`.
 - También se ha **cifrado** los datos introducidos por el usuario para evitar robo de datos.
 - Preparado para **LOCAL** y **ONLINE**
 - Añadido un botón de descargas que bajará el proyecto completo en **zip**
 - Algún trabajo extra adicional como la **optimización** de las pocas imágenes que implementa, creación de un zip con el proyecto al completo.
 - Unos `45 Kbts` de código

## 🔧-ResumenDeUso
El archivo de entrada `index.html` muestra una pseudo-web con un enlace para suscribirse a las **Newsletters**

Al pulsarlo se abrirá el formulario de suscripción donde hay que introducir los tres campos obligatorios: `nombre, apellido e email`, puede seleccionarse el checkbox para anular la suscripción o no. Después pulsar el 
botón **Enviar**.

Si todo ha salido satisfactorio se habrá insertado un registro en la *BD* donde se llevará el control de los usuarios suscritos a los *newsletters*.

Si algo falla se mostrarán otras webs con mensajes informativos y un enlace **HOME** para regresar a la principal.

## ⚙️-Desarrollo

No he podido dedicarle más que unas cuantas horas en estos dos días, así que no se podían hacer grandes cosas, pero he intentado que haya una muestra variada sobre programación de tecnologías web, tanto en local (con **XAMPP**) como en servidor, aplicando *buenas prácticas*.

La monté en **local** y tras sucesivos tests prueba-error me decidí a montarla también **online**.

Para esto contraté un hosting en "*infinityFree*" y subí los mismos archivos que en local, sólo tube que realizar modificaciones en los datos de conexionado a la *BD* y algún pequeño ajuste más.

Puede verse montada a modo de prueba en: <https://guerratron.kesug.com/>

## 💥-PruebasUnitarias
Ejecutadas pruebas unitarias con **jasmine** al código *js* a través del archivo `tests/jasmine/SpecRunner_validation.js.html`. Este script lo he preparado específicamente para este proyecto y 
verifica multitud de variaciones de entradas a los campos del formulario, tanto a "Nombre", como a 
"Apellido" y también a "Email".

<blockquote>
    <img class="mini-preview" src="./Jasmine-Spec-Runner.png" title="click for preview" onclick="this.classList.toggle('mini-preview'); this.classList.toggle('preview');" />
</blockquote>

<p class="alert green">Se han probado 51 casos de uso y todas las pruebas han resultado satisfactorias: <code>51 specs, 0 failures</code>.</p>

## ⌨️-Preview

<blockquote>
    <img class="mini-preview" src="./preview1.png" title="click for preview" onclick="this.classList.toggle('mini-preview'); this.classList.toggle('preview');" />
    <img class="mini-preview" src="./preview2.png" title="click for preview" onclick="this.classList.toggle('mini-preview'); this.classList.toggle('preview');" />
</blockquote>

## 🚀-Aviso

<p style="font-size:x-large;">Esto sólo es una pequeña demostración, no una app real.</p>

## ✨-Mejoras
Podrían añadirse muchas mejoras, añadir más bloques de contenido, insertar etiquetas semánticas, hacerla responsive, mejorar el estilo y la maquetación, aplicar efectos CSS3, ...

## 🌍-Paquete
He creado un paquete comprimido en formato **ZIP** con todo el proyecto, esto puede implementarse tanto en LOCAL como en SERVER, pero hay que detenerse en el archivo `bd_config.php` y establecer los datos correctos de conexionado con la Base de Datos.

Para este proyecto a mí me han servido los datos que están registrados en ese archivo, pero al trasladar el proyecto a otros PC / SERVERs habría que modificarlos.

También se ha insertado en la propia web (en el pié de la página principal) un **botón de descarga** del proyecto en su totalidad.

## 🎁-Agradecimientos:  
... Muchas gracias a todos los que hacen código libre por desarrollar herramientas superútiles para todos; esta vez también a *Microsoft* por su <abbr title="Visual Studio Code">VSC</abbr> que me ha facilitado y acelerado el trabajo del desarrollo en local, .. y en general a todo el mundo altruista que genera código y lo dispone open-source.  

Por supuesto muchísimas gracias también a los asesores que he tenido durante la etapa de **Asesoramiento** en las Certificaciones que me han ayudado y aconsejado, y con antelación, también a mis futuros **Examinadores** por su interés en contactarme y facilitarme la presentación y exposición de mis trabajos y experiencia laboral.

## ✒️-Credits:
2025 - [GuerraTron-25][authorEmail] &reg; [GuerraTron Github][authorWeb]

---
⌨️ con ❤️ por [Juan José Guerra][GuerraTron-Github] 😊

[<b style="font-size:xx-large; margin-left:50%;">🔝</b>](#top)

<!-- REFERENCIAS -->
[authorEmail]: mailto:dinertron@gmail.com
[authorWeb]: https://guerratron.github.io/
[GuerraTron-Github]: https://github.com/guerratron.github.io
