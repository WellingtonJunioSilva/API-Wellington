-- Active: 1752542636482@@127.0.0.1@3306@mysql
CREATE database raiz_overfror;

use raiz_overfror;

create table usuario(
id bigint primary key auto_increment not null,
nome varchar (200) not null,
email VARCHAR(200) not null UNIQUE,
documento VARchar (14) not null unique,
cep varchar (500) not null,
cidade varchar (60) not null,
estado varchar (60) not null,
telefone VARCHAR (300) not null,
tipo_usuario enum ('APOIADOR', 'PRODUTOR') not null,
tipo_apoiador enum ('PESSOA_FISICA', 'ONG', 'EMPRESA/COMERCIO, CONVENIADO'),
biografia text,
foto_perfil text
);

alter table usuario 
add column senha varchar (50);

SET SQL_SAFE_UPDATES = 1;

UPDATE usuario SET senha = 'temporaria' WHERE senha IS NULL;

alter table usuario
modify column senha varchar (50) not null;


create table demandas(
id bigint auto_increment primary key unique not null,
idUsuario bigint,
titulo varchar (250) not null,
descricao text not null,
categoria enum ('grão', 'feijões e raízes', 'frutas e hortaliças', 'verduras e ervas', 'outros'),
dataPostagem datetime default current_timestamp,
status enum ('aberta', 'fechada'),
cidade VARCHAR (60) NOT NULL,
estado VARCHAR (60) not NULL,
validade_oferta date,
foreign key (idUsuario) references usuario (id)
);

