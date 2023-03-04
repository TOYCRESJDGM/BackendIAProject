CREATE TABLE if not exists User (
    id int(11) NOT NULL auto_increment COMMENT 'identificador',
    userName varchar(255) NOT null COMMENT 'Nombre de usuario',
    email varchar(255) NOT null COMMENT 'correo electronico',
    rol varchar(255) NOT null COMMENT 'rol del usuario',
    password varchar(255) NOT null COMMENT 'contraseña',
    creationDate timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Fecha de creacion',
    ModificationDate timestamp COMMENT 'Fecha de modificacion',
    PRIMARY KEY (id)
) auto_increment=1 default CHARSET=utf8mb4 comment 'user';