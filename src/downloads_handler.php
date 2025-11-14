<?php
/*
    Manejador para permitir descargar el proyecto completo como un archivo '.zip'  

    Se ha implementado así por restricciones en el hosting y en los archivos '.htaccess'

    by Juanjo Guerra - GuerraTron25 - 05-11-25
*/
// Nombre del archivo a descargar
$nombreArchivo = 'AppWebCRUDv0.4.0.zip';

// Ruta completa al archivo en el servidor
$rutaArchivo = '../downloads/AppWebCRUDv0.4.0.zip'; // Asegúrate de que esta ruta sea correcta

// 1. Configurar cabeceras para la descarga
header('Content-Description: File Transfer');
header('Content-Type: application/octet-stream'); // Tipo de contenido genérico para descarga
header('Content-Disposition: attachment; filename="' . basename($nombreArchivo) . '"'); // Nombre del archivo que el usuario verá
header('Expires: 0');
header('Cache-Control: must-revalidate');
header('Pragma: public');
header('Content-Length: ' . filesize($rutaArchivo)); // Tamaño del archivo

// 2. Enviar el contenido del archivo al navegador
readfile($rutaArchivo);

// 3. Salir para evitar que se envíe cualquier otro contenido
exit;
?>