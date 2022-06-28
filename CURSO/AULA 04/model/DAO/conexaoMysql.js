// const Sequelize = require('sequelize');
// const sequelize = new Sequelize('dbContatos', 'root', 'bcd127', 
//     {
//         host:'localhost',
//         dialect: 'mysql'
//     });

// sequelize.authenticate().then(function (){
//     console.log('Conexão realizada com sucesso.');
// }).catch (function (erro) {
//     console.log('Conexão Falhou. ' + erro);
// });



1
2
3
4
5
6
7
8
9
10
const connect = function(){
    // if(global.connection && global.connection.state !== 'disconnected')
    //     return global.connection;
 
    const mysql = require("mysql2/promise");
    const connection = mysql.createConnection("mysql://root:bcd127@localhost:3306/dbContatos");
    console.log(connection);
    // global.connection = connection;
    return connection;
}

module.exports = {connect};

