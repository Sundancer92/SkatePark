CREATE TABLE skaters (
    id SERIAL, 
    email VARCHAR(50) NOT NULL, 
    nombre VARCHAR(25) NOT NULL, 
    password VARCHAR(25) NOT NULL, 
    anos_experiencia INT NOT NULL, 
    especialidad VARCHAR(50) NOT NULL, 
    foto VARCHAR(255) NOT NULL, 
    estado BOOLEAN NOT NULL,
    tipo VARCHAR (50) NOT NULL,
);

INSERT INTO 
skaters (email, nombre, password, anos_experiencia, especialidad, foto, estado, tipo)
VALUES ('evelien@skatepark.com', 'Evelien', 'qwe', 'q', 'Evelien.jpg', 'true', 'skater');

INSERT INTO
skaters (email, nombre, password, anos_experiencia, especialidad, foto, estado, tipo)
VALUES ('tonyhawk@skatepark.com', 'Tony Hawk', '123', '15', 'Tony Hawk.jpg', 'true', 'skater');


