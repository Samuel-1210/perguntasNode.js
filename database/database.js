const Sequelize = require('sequelize');

// Conectando no banco de dados
const connection = new Sequelize('answers','root','',{
    host: 'localhost',
    dialect: 'mysql'
});

// Exportando conexão
module.exports = connection;
