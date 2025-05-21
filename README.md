# API-Wellington

Estudo de API REST - Cadastro de Pessoas
📌 Descrição do Projeto
Projeto de uma API RESTful desenvolvida em Spring Boot com conexão MySQL. Esta aplicação permite o cadastro, consulta, atualização e remoção de registros de pessoas em um banco de dados relacional.

🛠️ Tecnologias Utilizadas
Java 17
Spring Boot 3.x
Spring Data JPA
MySQL
Lombok
Maven
📂 Estrutura de Pastas
├── src
│   ├── main
│   │   ├── java
│   │   │   └── com.example.cadastro_pessoas
│   │   │       ├── controller
│   │   │       │   └── PessoasController.java
│   │   │       ├── model
│   │   │       │   └── PessoasModel.java
│   │   │       ├── repository
│   │   │       │   └── PessoasRepository.java
│   │   │       └── servicer
│   │   │           └── PessoasService.java
│   │   └── resources
│   │       ├── application.properties
│   │       └── data.sql
├── db
│   └── script.sql
├── pom.xml
└── README.md
✅ Pré-requisitos
Java 17
MySQL Server
Maven
🚀 Como Executar o Projeto
1️⃣ Clone o repositório:

git clone https://github.com/seu-usuario/cadastro_pessoas.git
2️⃣ Acesse o diretório do projeto:

cd cadastro_pessoas
3️⃣ Execute o Maven para baixar as dependências:

mvn clean install
4️⃣ Configure o banco de dados MySQL:

Acesse o MySQL:
mysql -u seu_usuario -p
Crie o banco:
CREATE DATABASE estudo_pessoas;
USE estudo_pessoas;
Rode o script para criar a tabela:
source db/script.sql;
5️⃣ Suba a aplicação Spring Boot:

mvn spring-boot:run
A aplicação estará rodando em: http://localhost:8080/api/pessoas

🔎 Testes da API
Você pode utilizar o Hoppscotch para testar:

GET → /api/pessoas

Lista todas as pessoas.
GET → /api/pessoas/{id}

Busca uma pessoa pelo ID.
POST → /api/pessoas

{
  "name": "João Silva",
  "telefone": "(31) 91234-5678",
  "endereco": "Rua das Flores, 123",
  "imagemPerfil": "https://imagem.com/perfil.png"
}
PUT → /api/pessoas/{id}

{
  "name": "Maria Oliveira",
  "telefone": "(31) 99887-1234",
  "endereco": "Avenida Central, 456",
  "imagemPerfil": "https://imagem.com/perfil2.png"
}
DELETE → /api/pessoas/{id}

Remove a pessoa pelo ID.
📌 Dicas Importantes
Caso queira popular automaticamente o banco ao iniciar o projeto, coloque seus inserts no arquivo data.sql dentro de src/main/resources.
Para visualizar as queries SQL no console, verifique se está habilitado em application.properties:
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
👨‍🏫 Autor
Wellerson Ferreira de Carvalho

Projeto desenvolvido para estudo de Spring Boot e API RESTful.
