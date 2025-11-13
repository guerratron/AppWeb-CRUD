# ANOTACIONES v0.3.0
Cambios importantes en estructura de archivos, se ha completado la parte BACKEND del servidor.
La app se ha probado en servidor LOCAL con dos variantes:
 - xampp v3.2.2.0 (versión muy antígua) Problemas con PHP v5.4.0
 - GoLive (plugin VSC) - La parte de cliente (HTML, Javascript)
 - wamppServer v3.3.7 - (Apache 2.4.62.1, PHP 8.3.14, MySQL 9.1.0)

 todavía faltan pruebas unitarias y documentación

# BD: (MySQL->MariaDB > v8.0.13)
Se ha mantenido la tabla sugerida pero se le ha modificado ligeramente la estructura con algunas salvedades:
 - Cambiado "id INT AUTO_INCREMENT PRIMARY KEY" a "id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY" para evitar valores con signo
 - Añadido "ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci" para evitar confusión en el manejo de caracteres
  - Corregido el error en el insert sugerido: 
  `INSERT INTO clientes (nombre, apellidos, email, telefono, notas) VALUES (...)` por 
  `INSERT INTO clientes (nombre, apellido1, apellido2, email, telefono, notas) VALUES (...)`
  - Para que funcione la instrucción de creación de la tabla se debe trabajar con MySQL > 8.0.13, sinó 
  dará errores por insertar valores por defecto en un campo tipo 'DATE'.

# CLAVES:
En el archivo de configuración `bd_config.php` se establecen las claves necesarias para el conexionado con 
la BD, en caso de cambiar de servidor habría que ACTUALIZARLAS:  

```php
$driver="mysql";
$db_host="localhost";
//$db_port="3306"; [OPTIONAL]
$db_user="root";
$db_password="";
$db_name="clientesdb";
$db_table_name="clientes";
$db_charset = 'utf8mb4';
```

# GLOBALES
`const _RESTAURAR_IDS = false;` En acciones Delete e Insert: Permite restaurar los ids de forma consecutiva, lo malo que reordena los registros  
`$pdo; $regs; $_count = 0; $exists = false;`

# ACTIONS (CRUD++)
Se implementan cinco acciones en los distintos botones a través de JS:
 - del: Borra el registro seleccionado (previa confirmación)
 - update: Actualiza los datos modificados del registro seleccionado (previa confirmación)
 - insert: Inserta un nuevo cliente (previa confirmación)
 - search: Busca un cliente determinado por alguno de sus campos: Nombre, Apellidos o Email
 - list: Retorna el listado de todos los registros de clientes en la BD.

De todas formas todas las acciones retornan un objeto con dos campos: `{"regs": [...], "error": "..."}`
 - regs: Un array con los todos los clientes (excepto **search** que retorna sólo los que cumplan la condición)
 - error: {String} Si no está vacío es que ha ocurrido algún tipo de aviso o anomalía al realizar la consulta, no tiene porqué ser un error, símplemente que no haya encontrado los datos a buscar.

# COMPLETIONS
 - Implementar más páginas (Home, Contact, ..)
 - corregir algunos efectos visuales como el campo "notas" que no queda muy bién.
 - teminar de aplicar más clases y efectos CSS del archivo "table-matriz.css" que no ha dado tiempo de implementar.
 - Incluir paginación
 - Invertigar la posibilidad de reconstruir todos los id de clientes en la BD sin reordenación ni cambio de fechas.
 - Optimizaciones y mejoras de código
