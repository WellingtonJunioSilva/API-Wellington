create database raiz_overfror;

use raiz_overfror;

create table produtor(
id bigint primary key auto_increment not null,
nome varchar (200) not null,
documento char (11) not null,
localizacao varchar (500) not null,
biografia text not null,
fotoPerfil varchar (3000)
);
/*alter table produtor
drop column localizacao;*/

alter table produtor
add column cidade varchar (60) not null;

alter table produtor 
add column estado varchar (60) not null;

create table apoiador (
id bigint primary key unique auto_increment not null,
nome varchar (200) not null,
tipo enum ('pessoa fisica','ONG', 'empresas/comercio', 'parceiro convêniado') not null,
/*localizacao varchar (500) not null,*/
contato varchar (100) not null,
foto varchar (3000),
documento char (11)
);

/*alter table apoiador
drop column localizacao;*/

alter table apoiador 
add column cidade varchar (60) not null;

alter table apoiador 
add column estado varchar (60) not null;

create table demandaProdutor(
id bigint auto_increment primary key unique not null,
idProdutor bigint,
titulo varchar (250) not null,
descricao text not null,
categoria enum ('grão', 'feijões e raízes', 'frutas e hortaliças', 'verduras e ervas', 'outros'),
dataPostagem datetime default current_timestamp,
status enum ('aberta', 'fechada'),
foreign key (idProdutor) references produtor (id)
);

alter table demandaProdutor 
add column cidade bigint;

alter table demandaProdutor
add column estado bigint;

alter table demandaProdutor
add foreign key (cidade) references produtor (id),
add foreign key (estado) references produtor (id);

create table demandaApoiador(
id bigint primary key auto_increment not null unique,
idApoiador bigint,
titulo varchar (250) not null,
descricao text not null,
cidade bigint,
estado bigint,
dataPostagem datetime default current_timestamp,
validade_oferta date,
status enum ('aberta', 'fechada'),

foreign key (idApoiador) references apoiador (id),
foreign key (cidade) references apoiador (id),
foreign key (estado) references apoiador (id)
);


