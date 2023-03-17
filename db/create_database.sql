---- User create table -----
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

---- Category create table ----
CREATE TABLE if not exists Category (
    id int(11) NOT NULL auto_increment COMMENT 'identificador',
    title varchar(255) NOT null COMMENT 'Titulo de la categoria',
    description varchar(255) COMMENT 'descripcion de la categoria',
    creationDate timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Fecha de creacion',
    ModificationDate timestamp COMMENT 'Fecha de modificacion',
    PRIMARY KEY (id)
) auto_increment=1 default CHARSET=utf8mb4 comment 'Category';

---- ListLink create table ----
CREATE TABLE if not exists listLink (
    id int(11) NOT NULL auto_increment COMMENT 'identificador',
    name varchar(255) NOT null COMMENT 'Nombre de la lista',
    description varchar(255) COMMENT 'descripcion de la lista',
    idCreationUser int(11) NOT NULL  COMMENT 'id del usuario que creo la lista',
    idCategory int(11) NOT NULL  COMMENT 'id de la categoria de la lista',
    creationDate timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Fecha de creacion',
    ModificationDate timestamp COMMENT 'Fecha de modificacion',
    PRIMARY KEY (id),
    CONSTRAINT FK_UserList FOREIGN KEY (idCreationUser)
    REFERENCES User(id),
    CONSTRAINT FK_CategoryList FOREIGN KEY (idCategory)
    REFERENCES Category(id)
) auto_increment=1 default CHARSET=utf8mb4 comment 'listLink';

---- Page create table ----
CREATE TABLE if not exists Page (
    id int(11) NOT NULL auto_increment COMMENT 'identificador',
    link varchar(255) NOT null COMMENT 'link de la pagina',
    title varchar(255) COMMENT 'titulo de la pagina',
    description varchar(255) COMMENT 'descripcion de la pagina',
    linkImage varchar(255) COMMENT 'link de la imagen de la pagina',
    creationDate timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Fecha de creacion',
    ModificationDate timestamp COMMENT 'Fecha de modificacion',
    PRIMARY KEY (id)
) auto_increment=1 default CHARSET=utf8mb4 comment 'pages';

---- ListLinkPage create table ----
CREATE TABLE if not exists listLinksPage (
    id int(11) NOT NULL auto_increment COMMENT 'identificador',
    idPage int(11) NOT NULL  COMMENT 'id de la pagina Procesada',
    idListLink int(11) NOT NULL  COMMENT 'id de la lista a la que pertenece',
    creationDate timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Fecha de creacion',
    ModificationDate timestamp COMMENT 'Fecha de modificacion',
    PRIMARY KEY (id),
    CONSTRAINT FK_ListLinks FOREIGN KEY (idListLink)
    REFERENCES listLink(id),
    CONSTRAINT FK_Page FOREIGN KEY (idPage)
    REFERENCES Page(id),
) auto_increment=1 default CHARSET=utf8mb4 comment 'listLink';