# podría optimizarse la Tabla estudiando reducir la cantidad de caracteres en cada campo
CREATE DATABASE IF NOT EXISTS clientesdb DEFAULT CHARACTER SET utf8;
USE clientesdb;
CREATE TABLE IF NOT EXISTS clientes(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    nombre VARCHAR(80) NOT NULL, 
    apellido1 VARCHAR(60) NOT NULL, 
    apellido2 VARCHAR(60) NOT NULL, 
    email VARCHAR(120) NOT NULL UNIQUE, 
    telefono VARCHAR(30), 
    fecha_alta DATE NOT NULL DEFAULT (CURRENT_DATE), 
    notas TEXT
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

INSERT INTO clientes (nombre, apellido1, apellido2, email, telefono, notas) VALUES 
    ('Angélica', 'García', 'López', 'angelica@dominio.com', '600000001', 'Cliente inicial'), 
    ('Aniceto', 'Cáceres', 'Díaz', 'aniceto@dominio.com', '600000002', 'VIP');