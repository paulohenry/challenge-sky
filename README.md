# SKY Challenge
## API / Back-End

Para rodar o projeto basta:

1 - entrar na pasta backend 
2 - rodar o comando "docker-compose up" 

### REST API

Para a API REST utilizei o node com express, estruturando o projeto aplicando as práticas de clean architeture, TDD e boas práticas de mercad

-endpoints:
   - `GET /`: Retorna uma mensagem "REST Fullstack Challenge 20201209 Running"
   - `PUT /users/:userId`: responsável por receber atualizações realizadas no Projeto Web
   - `DELETE /users/:userId`: Remove o user da base
   - `GET /users/:userId`: Obtem a informação somente de um user da base de dados
   - `GET /users`: Lista todos os usuários da base de dados


### Extras

- **Diferencial 1** Escrevi Tests Unitários e de Integração para alguns components 
- **Diferencial 2** Foi utilizado docker para o banco de dados e para a api
- **Diferencial 4** Foi Implementada a documentação da API utilizando o conceito de Open API 3.0;


## Finalização

 O Desafio foi bem completo passando por etapas importantes de um projeto bem estruturado, acredito que consegui atigir o objetivo cumprindo  com os requisitos e 
 também com alguns diferenciais.


