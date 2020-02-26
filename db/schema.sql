DROP DATABASE IF EXISTS burgers_db;

CREATE DATABASE burgers_db;
USE burgers_db;

CREATE TABLE burgers (
  id INTEGER NOT NULL AUTO_INCREMENT,
  name varchar(30) NOT NULL,
  isDevoured BOOLEAN DEFAULT false,
  PRIMARY KEY(id)
);