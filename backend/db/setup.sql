-- Crear la base de datos y tablas para el proyecto
CREATE DATABASE IF NOT EXISTS proyecto_futbol CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE proyecto_futbol;

-- Tabla de equipos (ejemplo con algunos equipos de LaLiga)
CREATE TABLE IF NOT EXISTS equipos (
  id_equipo INT AUTO_INCREMENT PRIMARY KEY,
  nombre_equipo VARCHAR(255) NOT NULL,
  logo_equipo VARCHAR(512) DEFAULT NULL,
  id_liga INT DEFAULT NULL
);

-- Equipos de LaLiga temporada actual (20 equipos)
INSERT INTO equipos (nombre_equipo, logo_equipo, id_liga) VALUES
("Barcelona","https://media.api-sports.io/football/teams/529.png",140),
("Real Madrid","https://media.api-sports.io/football/teams/541.png",140),
("Atletico Madrid","https://media.api-sports.io/football/teams/530.png",140),
("Real Sociedad","https://media.api-sports.io/football/teams/548.png",140),
("Villarreal","https://media.api-sports.io/football/teams/533.png",140),
("Real Betis","https://media.api-sports.io/football/teams/543.png",140),
("Osasuna","https://media.api-sports.io/football/teams/727.png",140),
("Athletic Club","https://media.api-sports.io/football/teams/531.png",140),
("Mallorca","https://media.api-sports.io/football/teams/798.png",140),
("Girona","https://media.api-sports.io/football/teams/547.png",140),
("Rayo Vallecano","https://media.api-sports.io/football/teams/728.png",140),
("Sevilla","https://media.api-sports.io/football/teams/536.png",140),
("Celta Vigo","https://media.api-sports.io/football/teams/538.png",140),
("Cadiz","https://media.api-sports.io/football/teams/724.png",140),
("Getafe","https://media.api-sports.io/football/teams/546.png",140),
("Valencia","https://media.api-sports.io/football/teams/532.png",140),
("Almeria","https://media.api-sports.io/football/teams/723.png",140),
("Valladolid","https://media.api-sports.io/football/teams/720.png",140),
("Espanyol","https://media.api-sports.io/football/teams/540.png",140),
("Elche","https://media.api-sports.io/football/teams/797.png",140);

-- Tabla de usuarios para login/registro
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  token VARCHAR(64) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
