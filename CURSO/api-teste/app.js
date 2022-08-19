//import da biblioteca express
const express = require('express');
//import a biblioteca de cors (permissão de acesso)

//import a biblioteca de cors (permissão de acesso)
const cors = require('cors'); 
const body = require('body-parser');
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');

const port = process.env.PORT || 8080;



//instancia para a classe express
const app = express();



app.use(urlencoded());


//EndPoint Raíz
app.get('/', function(request, response, next){
    response.send('<h1>Bem vindo ao meu sistema Node.JS</h1>');
    response.status(200)

});

//Ativa o servidor HTTP para escutar na porta xxxx 8080, e cria uma função de CallBack para escrever uma mensagem
//Sempre deve ser a ultima linha
app.listen (port, function(){
    console.log('Servidor aguardando requisições HTTP');
});