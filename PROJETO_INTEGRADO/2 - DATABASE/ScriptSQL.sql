drop database dbProjetoIntegrado;

CREATE DATABASE dbProjetoIntegrado CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

use dbProjetoIntegrado;

CREATE TABLE tblCategoria (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL,
  icone VARCHAR(100) NULL,
  PRIMARY KEY (id),
  UNIQUE INDEX (id) );
  
  CREATE TABLE tblUsuario (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL,
  usuario VARCHAR(100) NULL,
  senha VARCHAR(100) NULL,
  PRIMARY KEY (id),
  UNIQUE INDEX (id) );


