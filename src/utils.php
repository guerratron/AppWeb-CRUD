<?php

function _prueba1(){
    //$genericObject = new stdClass();
    //$obj3 = (object)[]; // Cast empty array to object

    //Simular Template-String: incluir las variables envueltas en %_% y utilizar "str_replace(..)"
    $strJson = '{
        "regs": [
            {"id": 0, "nombre": "Juan", "apellido1": "García", "apellido2": "López", "telefono": "200000001", "email": "angelica@dominio.com", "notas": "Cliente inicial"},
            {"id": 1, "nombre": "Anicetillo", "apellido1": "Cáceres", "apellido2": "Díaz", "telefono": "200000002", "email": "aniceto@dominio.com", "notas": "VIP", "action": "%$getAction%"}
        ]
    }';
    $strJson = str_replace("%$getAction%", $$getAction, $strJson);

    //1
    $reg1 = new stdClass();
    $reg1->id = 0;
    $reg1->nombre = 'Juan';
    $reg1->apellido1 = 'García';
    $reg1->apellido2 = 'López';
    $reg1->telefono = '11223344';
    $reg1->email = 'juan@gmail.com';
    $reg1->notas = 'encargado almacén';

    $reg2 = new stdClass();
    $reg2->id = 1;
    $reg2->nombre = 'Pepi';
    $reg2->apellido1 = 'González';
    $reg2->apellido2 = 'Assuntex';
    $reg2->telefono = '99887766';
    $reg2->email = 'pepi.gon@pep.com';
    $reg2->notas = 'administración';

    $result = new stdClass();
    $result->regs = array($reg1, $reg2);

    //2
    $result = json_decode($strJson);

    // tres variantes, retornar en literal-texto o desde encode(objeto) o desde encode(literal-texto)
    return json_encode($result);//$strJson;
}


// Método para simular una Template-String
/*$strJson = '{
    "id": "%id%", "nombre": "%nombre%", "apellido1": "%apellido1%", "apellido2": "%apellido2%", 
    "telefono": "%telefono%", "email": "%email%", "notas": "%notas%", "action": "%action%"
}';
$strJson = str_replace(
    ["%id%", "%nombre%", "%apellido1%", "%apellido2%", "%telefono%", "%email%", "%notas%", "%action%"], 
    [$postId, $postNombre, $postApellido1, $postApellido2, $postTelefono, $postEmail, $postNotas, $getAction],
    $strJson
);
echo json_encode($strJson);
*/

?>