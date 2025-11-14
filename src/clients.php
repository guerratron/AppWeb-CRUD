<?php
/* 
    Comprueba en una BD con los datos pasados por el formulario para realizar operaciones CRUD en la BD
    Estas operaciones se realizarán con PDO con estamentos preparados para evitar INYECCIÓN-SQL
    
    ACCIONES PERMITIDAS EN _GET["action"]:del, update, insert, search y list
    by Juan José Guerra Haba
*/

/*error_reporting(  E_ALL  ^  E_NOTICE  ^  E_DEPRECATED );
//mysqli_report(MYSQLI_REPORT_ALL); //MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT | MYSQLI_REPORT_ALL);
// POR ALGUNA RAZÓN HAY QUE DESACTIVAR EL INFORME DE ERROR DE ÍNDICES,
// ESTO PASA EN 'ONLINE' PERO NO EN 'LOCAL'
mysqli_report(MYSQLI_REPORT_INDEX);*/

/* activate reporting
$driver = new mysqli_driver();
$driver->report_mode = MYSQLI_REPORT_ALL;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = "JJJuan";//$_POST['nombre'];
    $id = isset($_POST['id']) ? $_POST["id"] : "?";
    echo "Hola, " . $nombre . "! Tienes " . $id . " años. La queryString ha sido: " . $_GET["action"];
} 
C:\>php.exe "C:\Path\To\phpdoc" -t targetdir -o HTML:default:default -d parsedir
*/

/** HEADERS AND CORS */
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER['REQUEST_METHOD'];
/*if($method == "OPTIONS") {
    die();
}*/

// 1.- RECOGIDA Y FILTRADO DE DATOS DEL FORMULARIO (por GET o POST)
$postId = isset($_POST["id"]) ? htmlspecialchars($_POST["id"]) : "";
$postNombre = isset($_POST["nombre"]) ? htmlspecialchars($_POST["nombre"]) : "";
$postApellido1 = isset($_POST["apellido1"]) ? htmlspecialchars($_POST["apellido1"]) : "";
$postApellido2 = isset($_POST["apellido2"]) ? htmlspecialchars($_POST["apellido2"]) : "";
$postEmail = isset($_POST["email"]) ? htmlspecialchars($_POST["email"]) : "";
$postTelefono = isset($_POST["telefono"]) ? htmlspecialchars($_POST["telefono"]) : "";
$postNotas = isset($_POST["notas"]) ? htmlspecialchars($_POST["notas"]) : "";
//Action por la queryString "GET"
$getAction = isset($_GET["action"]) ? htmlspecialchars($_GET["action"]) : "";

// 2.- CONFIGURACIÓN: nombre de la base, del usuario, clave y servidor
require_once './bd_config.php'; //ESTE SCRIPT DEBERÍA ESTAR FUERA DEL ALCANCE DE LA WEB PÚBLICA
// a partir de aquí ya existe el objeto PDO y $regs contiene el objeto con todos los registros hasta ahora
// también existe la función _toResults() y _restoreIds();

switch($getAction){
    case "del":
        try{
            //obtenemos la cantidad de registros iniciales
            _toResults();
            $_count1 = $_count;
            //$stm = $this->pdo->prepare("DELETE FROM $this->table WHERE id=?");
            //$stm->execute(array($id));
            $sql = "DELETE FROM $db_table_name WHERE id=:id";
            $stmt = $pdo->prepare($sql);
            //$stmt->bindParam(':id', $postId);//, PDO::PARAM_STR);//PDO::PARAM_INT);
            $stmt->execute(array($postId));
            _restoreIds(); //este ya refresca
            //_toResults(); //refresh
            $result = array("regs"=>$regs, "error" => ($_count1 == $_count) ? "HA FALLADO EN EL BORRADO!! id erróneo!" : "");
        }catch (PDOException $e){
            $result = array("regs"=>$regs, "error" => "ERROR: NO ELIMINADO!");
        }
        break;
    case "update":
        try{
            //nombre, apellido1, apellido2, email, telefono, notas
            $sql = "UPDATE $db_table_name SET nombre=?,apellido1=?,apellido2=?,email=?,telefono=?,notas=? WHERE id=?";
            $stm=$pdo->prepare($sql);
            $stm->execute(array($postNombre, $postApellido1, $postApellido2, $postEmail, $postTelefono, $postNotas, $postId));
            _toResults(); //refresh
            $result = array("regs"=>$regs, "error" => ($_count == 0) ? "NINGÚN REGISTRO ACTUALIZADO! posible id erróneo!" : "");
        }catch(PDOException $e){
            $result = array("regs"=>$regs, "error" => "ERROR: NO ACTUALIZADO!");
        }
        break;
    case "insert":
        try{
            // Se necessitan los campos obligatorios
            $obligatorios = $postNombre && $postApellido1 && $postApellido2 && $postEmail;
            if($obligatorios){
                // Preparar la consulta SQL con marcadores de posición (?)
                $sql = "INSERT INTO $db_table_name (nombre, apellido1, apellido2, email, telefono, notas) VALUES (?, ?, ?, ?, ?, ?)";
                // Vincular parámetros (s=string)
                $stmt = $pdo->prepare($sql);
                $stmt->execute(array($postNombre, $postApellido1, $postApellido2, $postEmail, $postTelefono, $postNotas));
                _restoreIds();
            }
            _toResults(); //refresh
            $result = array("regs"=>$regs, "error" => $obligatorios ? "" : "NO INSERTADO! FALTAN campos OBLIGATORIOS!");
        }catch(PDOException $e){
            $result = array("regs"=>$regs, "error" => "NO INSERTADO! Posible DUPLICADO de email");
        }
        break;
    case "search":
        try{
            // Preparar la consulta SQL con marcadores de posición (?), 
            // en función de la búsqueda por nombre, apellido o email se formará distinta la consulta
            //$pNombre, $pApellido1, $pApellido2, $pEmail;
            
            $sql = "SELECT * FROM $db_table_name WHERE ";
            $post_sql = "";
            $arr = ["nombre" => $postNombre, "apellido1" => $postApellido1, "apellido2" => $postApellido2, "email" => $postEmail];
            foreach ($arr as $key => $value) {
                if($value){
                    $post_sql .= "$key=? AND ";
                }
            }
            $post_sql = substr($post_sql, 0, -4);
            
            $post_sql =  !$post_sql ? "TRUE" : "(" . $post_sql . ")";
            $sql .= $post_sql;
            // Vincular parámetros (s=string)
            $stmt = $pdo->prepare($sql);
            $arr = array();
            if($postNombre){ $arr[] = $postNombre; }
            if($postApellido1){ $arr[] = $postApellido1; }
            if($postApellido2){ $arr[] = $postApellido2; }
            if($postEmail){ $arr[] = $postEmail; }
            $stmt->execute($arr); //array($postNombre, $postApellido1, $postApellido2, $postEmail)
            $regs = $stmt->fetchAll(PDO::FETCH_OBJ);
            //_toResults(); //refresh
            $_count = $stmt->rowCount();
            $result = array("regs"=>$regs, "error" => "$_count Registros encontrados");//$sql);
        }catch(PDOException $e){
            $result = array("regs"=>array(), "error" => "NO SE ENCUENTRA! Ningún registro con esos datos!\n");// . $sql);
        }
        
        break;
    case "list":
        try{
            // TODOS
            $sql = "SELECT * FROM $db_table_name WHERE TRUE";
            $stmt = $pdo->prepare($sql);
            $stmt->execute();
            $regs = $stmt->fetchAll(PDO::FETCH_OBJ);
            $result = array("regs"=>$regs, "error" => "");
        }catch(PDOException $e){
            $result = array("regs"=>$regs, "error" => "ERROR! Posible Tabla Vacía (EMPTY)");
        }

        break;
    default:
        $result = array("regs" => [], "error" => "ERROR! BAD-ACTION");
        //die('Error: BAD-ACTION');
}


echo json_encode($result);
//echo 'OK. <blockquote>&#x1F3E0; <a href="index.html">Home</a></blockquote>';
	
?>