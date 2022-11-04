
const express = require('express');

const port = process.env.PORT || 6060;

//import a biblioteca de cors (permissão de acesso)
// const cors = require('cors'); 
const bodyParser = require('body-parser');

//import a biblioteca de cors (permissão de acesso)
const cors = require('cors'); 

//instancia para a classe express
const app = express();

//Configura o Cors
app.use ((request, response, next) => {
    //console.log('teste');
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTION');
    app.use(cors());
    next();
});

const jsonParser = bodyParser.json();


/**********************************************************************************************************
 *  Autor: Marcel
 *  Rota: Fala_Azure
 *  Data: 18/10/20222
 ***********************************************************************************************************/

    //EndPoint Listar todos os registros
    app.get('/description', cors(), async function(request, response){

        let statusCode;
        let message;

        //   import do arquivo de funções
        const controllerProfessor = require('./controller/controllerProfessor');
        const listDescriptions = await controllerProfessor.listDescriptions();

        if (listDescriptions)
        {
  
            statusCode = 200;
            message = listDescriptions;

        }else{
            statusCode = 404;
            message = "Nenhum registro encontrado.";
        }  

  

        let DescriptionsJSON = {};
        DescriptionsJSON.description = message;
        //console.log (message);
        response.status(statusCode);
        response.json(DescriptionsJSON);

    });

//Ativa o servidor HTTP para escutar na porta xxxx 8080, e cria uma função de CallBack para escrever uma mensagem
//Sempre deve ser a ultima linha
app.listen (port, function(){
    console.log('Servidor aguardando requisições HTTP');
});