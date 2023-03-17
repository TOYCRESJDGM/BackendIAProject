CREATE TABLE if not exists Category (
    id int(11) NOT NULL auto_increment COMMENT 'identificador',
    title varchar(255) NOT null COMMENT 'Titulo de la categoria',
    description varchar(255) COMMENT 'descripcion de la categoria',
    creationDate timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Fecha de creacion',
    ModificationDate timestamp COMMENT 'Fecha de modificacion',
    PRIMARY KEY (id)
) auto_increment=1 default CHARSET=utf8mb4 comment 'Category';