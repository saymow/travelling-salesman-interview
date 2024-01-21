CREATE TABLE clients(
	id SERIAL PRIMARY KEY,
	name VARCHAR(256) NOT NULL,
	email VARCHAR(256) UNIQUE NOT NULL,
	phone VARCHAR(32) UNIQUE NOT NULL,
	lat DECIMAL(8, 6) NOT NULL,
	lng DECIMAL(9, 6) NOT NULL
);
