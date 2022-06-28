const express = require('express');

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

//EndPoint Listar todos os registros
app.get('/listar',cors(), async function(request, response){

//   import do arquivo de funções
  const controllerContato = require('./controller/controllerContato');
  const listContatos = await controllerContato.listarContato();
  //console.log(listContatos);

   
    //console.log (listContatos);
    response.status(200);
    response.json(listContatos);

});

//EndPoint Buscar pelo ID
app.get('/listar/:id',cors(), async function(request, response){

    let id = request.params.id;

   //   import do arquivo de funções
    const controllerContato = require('./controller/controllerContato');
    const listContato = await controllerContato.buscarContato(id);

    response.status(200);
    response.json(listContato);

});

//EndPoint Inserir novo registro
app.post('/listar',cors(), jsonParser, async function(request, response){

    let message;
    let statusCode;

    try {
    
        dados = request.body;

        //   import do arquivo de funções
        const controllerContato = require('./controller/controllerContato');
        const novoContato = await controllerContato.novoContato(dados);

        if (novoContato)
        {
            statusCode = 201;
            message = 'criado';
        }
    } catch (error) {
        statusCode = 400;
        message = 'Erro';
    }

    response.status(statusCode);
    response.json(message);

});

//EndPoint Atualizar um registro
app.put('/listar/:id',cors(), jsonParser, async function(request, response){

    let message;
    let statusCode;

    try {
    
        dados = request.body;
        idContato = request.params.id;

        //permite adicionar um novo elemento no objeto 
        Object.assign(dados, {id:idContato});

        //   import do arquivo de funções
        const controllerContato = require('./controller/controllerContato');

         //Busca o registro para validar a existencia
         const listContato = await controllerContato.buscarContato(idContato);

         if(listContato)
         {
            const novoContato = await controllerContato.atualizarContato(dados);

            if (novoContato)
            {
                statusCode = 201;
                message = 'criado';
            }
         }else
         {
            statusCode = 400;
            message = 'Registro não encontrado.';
        }   
    } catch (error) {
        console.log(error.message);
        statusCode = 400;
        message = 'Erro';
    }

    response.status(statusCode);
    response.json(message);

});

//EndPoint Apagar um registro
app.delete('/listar/:id',cors(), async function(request, response){

    let message;
    let statusCode;

    try {
        let id = request.params.id;

        //   import do arquivo de funções
        const controllerContato = require('./controller/controllerContato');
        
        //Busca o registro para validar a existencia
        const listContato = await controllerContato.buscarContato(id);

        if(listContato)
        {
            const contato = await controllerContato.apagarContato(id);
            
            if (contato)
            {
                statusCode = 200;
                message = 'deletado';
            }
        }else
        {
            statusCode = 400;
            message = 'Registro não encontrado.';
        }    
    } catch (error) {
        console.log(error.message);
        statusCode = 400;
        message = 'Erro';
    }

    response.status(statusCode);
    response.json(message);

   
});

  //Ativa o servidor HTTP para escutar na porta xxxx 8080, e cria uma função de CallBack para escrever uma mensagem
//Sempre deve ser a ultima linha
app.listen (6666, function(){
    console.log('Servidor aguardando requisições HTTP');
});