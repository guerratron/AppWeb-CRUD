<?php 

// ATENCIÓN: ESTE SCRIPT DEBERÍA RESIDIR FUERA DEL ALCANCE DE LA WEB PÚBLICA, 
// POR EJEMPLO EN EL SERVIDOR ANTES DEL DIRECTORIO "public_html" ANTES DE LA WEB.  
// INSERTAR LAS CLAVES CORRESPONDIENTES:
// COMENTAR LAS CLAVES EN LOCAL SI SE SUBE A SERVIDOR Y DESCOMENTAR LAS OTRAS "ONLINE"

// CLAVES EN LOCAL: COMENTAR LAS CLAVES ONLINE
$driver="mysql";
$db_host="localhost";
//$db_port="3306"; [OPTIONAL]
$db_user="root";
$db_password="";
$db_name="clientesdb";
$db_table_name="clientes";
$db_charset = 'utf8mb4';

/** En acciones Delete e Insert: Permite restaurar los ids de forma consecutiva, lo malo que reordena los registros */
const _RESTAURAR_IDS = false;

// CLAVES ONLINE: https://guerratron.kesug.com/
/*$driver="mysql";
$db_host="sql100.infinityfree.com";
//$db_port="3306"; [OPTIONAL]
$db_user="if0_40332693";
$db_password="infinityGuerra";
$db_name="if0_40332693_clientesdb";
$db_table_name="clientes";*/

// ============================
// Esta parte ya se habrá realizado si se ha utilizado externamente el archivo "db.sql" aportado,
// Pero por si acaso, realiza comprobaciones de creación de BD y Table e inserta 2 registros de ejemplo.
// ============================
// CREA BD SI NO EXISTE
try{
    // -1. CONEXIÓN AL SERVIDOR DE LA BD MEDIDANTE ESTAMENTOS PREPARADOS
    $db_con = new mysqli($db_host, $db_user, $db_password);

    if (!$db_con) {
        die('No se ha podido conectar al servidor de la base de datos/n ' . $db_con->connect_error);
    }

    // Establecer el juego de caracteres a utf8mb4
    $db_con->set_charset('utf8mb4');

    // -2. COMPROBAR SI EXISTE LA BD (O HAY QUE CREARLA NUEVA)
    //$db_name = "clientesdb";
    $sql = $db_con->real_escape_string("CREATE DATABASE IF NOT EXISTS $db_name DEFAULT CHARACTER SET utf8");//CREATE DATABASE IF NOT EXISTS $db_name");
    $db_con->query($sql);

    $db_con->select_db($db_name);
    // CERRAMOS CONEXIÓN Y LIBERAMOS RECURSOS
    $db_con->close();
} catch (Exception $e) {
    throw new Exception($e->getMessage(), (int)$e->getCode());
}
// =======================

// CONTINUAMOS EL RESTO DE ACCIONES CON PDO:
// A partir de aquí existen unas variables útiles:
// $pdo : El objeto de enlace con la BD, sobre el que ejecutar cualquier consulta. (menos creación de BD)
// $regs : Un objeto con todos los registros existentes hasta ahora
// $_count : Almacena los registros existentes hasta ahora (si todo bien 2)
// $exists : Indica si existe algún registro en la tabla (si todo ha salido bien SI)
$pdo;
$regs;// = new stdClass();
$_count = 0;
$exists = false;

try {
    // -3. CREAMOS CONEXIÓN CON PDO
    $dsn = "mysql:host=$db_host;dbname=$db_name;charset=$db_charset"; //;port=3306
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];
    $pdo = new PDO($dsn, $db_user, $db_password, $options);
    //$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    //var _dump($pdo);

    // -4. CREA TABLA SI NO EXISTE
    $sql = "CREATE TABLE IF NOT EXISTS $db_table_name(
                id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
                nombre VARCHAR(80) NOT NULL, 
                apellido1 VARCHAR(60) NOT NULL, 
                apellido2 VARCHAR(60) NOT NULL, 
                email VARCHAR(120) NOT NULL UNIQUE, 
                telefono VARCHAR(30), 
                fecha_alta DATE NOT NULL DEFAULT (CURRENT_DATE), 
                notas TEXT
            ) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;";
    //$sql = "SELECT VERSION()";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    //var _dump($stmt->fetchAll(PDO::FETCH_ASSOC)); //10.1.21-MariaDB

    // -5. CONSULTA SI YA HAY REGISTROS
    //primero obtenemos los registros como array para contarlos
    _toResults(); //actualiza las globales

    if($_count == 0){
        // -6. SINÓ, INSERTA 2 NUEVOS REGISTROS A MODO DE EJEMPLO
        // MÍNIMO, 2 NUEVOS REGISTRO DE EJEMPLO
        $sql = "INSERT INTO $db_table_name (nombre, apellido1, apellido2, email, telefono, notas) VALUES 
        ('Angélica', 'García', 'López', 'angelica@dominio.com', '600000001', 'Cliente inicial'), 
        ('Aniceto', 'Cáceres', 'Díaz', 'aniceto@dominio.com', '600000002', 'VIP'), 
        ('Juan José', 'Guerra', 'Haba', 'dinertron@gmail.com', '11223344', 'ADMIN')";
        $stmt = $pdo->prepare($sql);
        //$stmt->bindParam(':db_table_name', $db_table_name, PDO::PARAM_STR);//PDO::PARAM_INT);
        $result = $stmt->execute();
        if($result){
            //header('Location: success.html');
        }else{
            die('Error: ' . $db_con->error);
        }
    }

    // ahora volvemos a ejecutarla para almacenar los resultados como objeto (nos servirán más adelante)
    _toResults(); //actualiza las globales
} catch (PDOException $e) {
    throw new PDOException($e->getMessage(), (int)$e->getCode());
}

/** Realiza una consulta genérica de todos los registros para actualizar una serie de variables globales: $regs, $_count y $exits
  * Debe existir PDO */
function _toResults(){
    global $pdo;
    global $result;
    global $_count;
    global $regs;
    global $stmt;
    global $db_table_name;
    $sql = "SELECT * FROM $db_table_name";// WHERE TRUE = TRUE"; //COUNT(*)
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $regs = $stmt->fetchAll(PDO::FETCH_OBJ);
    $_count = $stmt->rowCount();//$_count = count($regs);
    $exists = $_count > 0;
}

/** Restaura todos los ids de forma consecutiva, ya que algunas acciones (Delete, Insert, ..) pueden alterarlos.
  * 
  * Lo malo es que reordena los registros!! Por eso se ha incluido la constante _RESTAURAR_IDS */
function _restoreIds(){
    if(_RESTAURAR_IDS){
        global $pdo;
        global $result;
        global $_count;
        global $regs;
        global $stmt;
        global $db_table_name;
        # Le quitamos el campo AUTO_INCREMENT a la columna 'id'
        $sql = "ALTER TABLE $db_table_name CHANGE `id` `id` INT(11) NOT NULL";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        # Le quitamos la restricción PRIMARY KEY a la tabla
        $sql = "ALTER TABLE $db_table_name DROP PRIMARY KEY";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        # Actualizamos todos los id de los registros en '0'
        $sql = "UPDATE $db_table_name SET id = 0";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        # Agregamos de nuevo la restricción PRIMARY KEY y también el campo AUTO_INCREMENT a la columna 'id'
        $sql = "ALTER TABLE $db_table_name MODIFY COLUMN id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY"; //id INT PRIMARY KEY AUTO_INCREMENT";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        //ACTUALIZA GLOBALES
        $regs = $stmt->fetchAll(PDO::FETCH_OBJ);
        $_count = $stmt->rowCount();//$_count = count($regs);
        $exists = $_count > 0;
    }else{
        _toResults(); //actualiza globales
    }
}
?>