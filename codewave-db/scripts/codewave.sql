DROP DATABASE IF EXISTS codewave;
CREATE DATABASE codewave;
USE codewave;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
	id CHAR(36) PRIMARY KEY DEFAULT UUID(),
	nickname VARCHAR(51) NOT NULL UNIQUE,
	email_address VARCHAR(50) NOT NULL UNIQUE,
	first_name VARCHAR(70) NOT NULL,
	last_name VARCHAR(100) NOT NULL,
	phone_number VARCHAR(16),
	created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO users(nickname, email_address, first_name, last_name, phone_number)
VALUES 
('GsuDev', '2002apaco@gmail.com', 'Jesús', 'Aparicio Coello', '601437869');

DROP TABLE IF EXISTS snippets;
CREATE TABLE snippets (
	id CHAR(36) PRIMARY KEY DEFAULT UUID(),
	user_id VARCHAR(36) NOT NULL,
	title VarCHAR(100) NOT NULL,
	description VARCHAR(255),
	lang VARCHAR(30) NOT NULL,
	code TEXT NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT NOW(),
	FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Insertar tres usuarios adicionales
INSERT INTO users (nickname, email_address, first_name, last_name, phone_number) VALUES
('CodeMaster', 'codemaster@gmail.com', 'Carlos', 'Fernández López', '611223344'),
('DevQueen', 'devqueen@yahoo.com', 'María', 'Gómez Sánchez', '622334455'),
('ByteWizard', 'bytewizard@outlook.com', 'Andrés', 'Martín Ruiz', '633445566');

-- Insertar diez snippets de ejemplo
INSERT INTO snippets (user_id, title, description, lang, code) VALUES
((SELECT id FROM users WHERE nickname = 'GsuDev'), 'Hola Mundo en Python', 'Un simple hola mundo en Python', 'Python', 'print("Hola, mundo!")'),
((SELECT id FROM users WHERE nickname = 'GsuDev'), 'Suma en Kotlin', 'Función para sumar dos números en Kotlin', 'Kotlin', 'fun suma(a: Int, b: Int): Int { return a + b }'),
((SELECT id FROM users WHERE nickname = 'CodeMaster'), 'Factorial en JavaScript', 'Cálculo de factorial usando recursividad', 'JavaScript', 'function factorial(n) { return n === 0 ? 1 : n * factorial(n - 1); }'),
((SELECT id FROM users WHERE nickname = 'CodeMaster'), 'Ordenar lista en Python', 'Ordena una lista de números', 'Python', 'numeros = [3, 1, 4, 1, 5]; numeros.sort()'),
((SELECT id FROM users WHERE nickname = 'DevQueen'), 'SQL - Seleccionar todo', 'Consulta SQL para obtener todos los registros', 'SQL', 'SELECT * FROM users;'),
((SELECT id FROM users WHERE nickname = 'DevQueen'), 'Comprobar número primo', 'Verifica si un número es primo en Java', 'Java', 'boolean esPrimo(int n) { for (int i = 2; i < n; i++) if (n % i == 0) return false; return true; }'),
((SELECT id FROM users WHERE nickname = 'ByteWizard'), 'Conversión a binario en C', 'Convierte un número decimal a binario', 'C', 'void binario(int n) { if (n > 1) binario(n / 2); printf("%d", n % 2); }'),
((SELECT id FROM users WHERE nickname = 'ByteWizard'), 'Leer archivo en Python', 'Lee el contenido de un archivo de texto', 'Python', 'with open("archivo.txt") as f: print(f.read())'),
((SELECT id FROM users WHERE nickname = 'GsuDev'), 'Validar email en Regex', 'Expresión regular para validar emails', 'Regex', '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'),
((SELECT id FROM users WHERE nickname = 'CodeMaster'), 'Generar número aleatorio en JS', 'Devuelve un número entre 1 y 10', 'JavaScript', 'console.log(Math.floor(Math.random() * 10) + 1);');


