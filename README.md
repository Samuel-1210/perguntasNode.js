# perguntasNode.js
Projeto de Node.js com fins de estudo.

Neste projeto usei Node.JS, EJS, MySQL, Sequelize, Express e Nodemon.
<br>No front end usei Bootstrap na versão mais recente. (v5.1.3)

# Para executar:

 No SQL crie um banco de dados chamado "answers", não é necessária a criação das tabelas.
 <br>No arquivo database\database.js insira o seu usuário do MySQL e senha se necessário.

```Javascript
const connection = new Sequelize('answers','usuario','senha',{
    host: 'localhost',
    dialect: 'mysql'
});
```
## Baixando o projeto
Crie uma pasta e execute o clone no terminal.

```
git clone https://github.com/Samuel-1210/perguntasNode.js
```

ainda no terminal, entre na pasta do projeto:
```
cd perguntasNode.js
```
No terminal execute:
``` 
node index.js 
```
E o aplicativo irá rodar na rota http://localhost:8080/

Em caso de rotas em uso você pode alterar manualmente a rota no arquivo index.js na pasta principal na linha 105
```Java
105 app.listen(8080,()=>{
106 console.log("servidor rodando")
107 });
```
