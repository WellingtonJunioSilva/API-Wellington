create database raiz_overfror;

use raiz_overfror;

create table produtor(
id bigint primary key auto_increment not null,
nome varchar (200) not null,
documento char (11) not null,
localizacao varchar (500) not null,
biografia text not null,
cidade varchar (60) not null,
estado varchar (60) not null,
fotoPerfil TEXT
);

create table apoiador (
id bigint primary key unique auto_increment not null,
nome varchar (200) not null,
tipo enum ('PESSOA_FISICA','ONG', 'EMPRESAS/COMERCIO', 'CONVENIADO') not null,
cidade varchar (60) not null,
estado varchar (60) not null,
contato varchar (100) not null,
foto varchar (3000),
documento char (11)
);

create table demandaProdutor(
id bigint auto_increment primary key unique not null,
idProdutor bigint,
titulo varchar (250) not null,
descricao text not null,
categoria enum ('grão', 'feijões e raízes', 'frutas e hortaliças', 'verduras e ervas', 'outros'),
dataPostagem datetime default current_timestamp,
status enum ('aberta', 'fechada'),
cidade VARCHAR (60) NOT NULL,
estado VARCHAR (60) not NULL,
foreign key (idProdutor) references produtor (id)
);

create table demandaApoiador(
id bigint primary key auto_increment not null unique,
idApoiador bigint,
titulo varchar (250) not null,
descricao text not null,
cidade VARCHAR (60) NOT NULL, 
estado VARCHAR (60) NOT NULL,
dataPostagem datetime default current_timestamp,
validade_oferta date,
status enum ('aberta', 'fechada'),

foreign key (idApoiador) references apoiador (id),
);


