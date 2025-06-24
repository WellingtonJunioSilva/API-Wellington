create database raiz_overfror;

use raiz_overfror;

create table produtor(
id bigint primary key auto_increment not null,
nome varchar (200) not null,
email VARCHAR(200) not null,
documento char (11) not null,
cep varchar (500) not null,
cidade varchar (60) not null,
estado varchar (60) not null,
contato VARCHAR (300) not null,
fotoPerfil TEXT,
biografia text not null
);

create table apoiador (
id bigint primary key unique auto_increment not null,
nome varchar (200) not null,
email VARCHAR(200) not NULL,
tipo enum ('PESSOA_FISICA','ONG', 'EMPRESAS/COMERCIO', 'CONVENIADO') not null,
cep VARCHAR (200) not null,
cidade varchar (60) not null,
estado varchar (60) not null,
contato varchar (100) not null,
documento char (11),
foto TEXT
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


