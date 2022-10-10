const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('./modulo/config');

const express = require('express');

const port = process.env.PORT || 3030;

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
 *  Rota: Categoria
 *  Data: 22/07/20222
 ***********************************************************************************************************/

    //EndPoint Listar todos os registros
    app.get('/alunos', cors(), async function(request, response){

        let statusCode;
        let message;

        //   import do arquivo de funções
        const controllerAluno = require('./controller/controllerAluno');
        const listAlunos = await controllerAluno.listarAlunos();

        if (listAlunos)
        {
                if(typeof(listAlunos) == 'number')
                {
                    statusCode = listAlunos; //Erro 401 - não autorizado
                    message = {acesso: 'Acesso não autorizado pelo sistema.'};
                }
                else
                {
                    statusCode = 200;
                    message = listAlunos;
                }
        }else{
                statusCode = 404;
                message = "Nenhum registro encontrado.";
        }  

  

        let alunosJSON = {};
        alunosJSON.alunos = message;
        //console.log (message);
        response.status(statusCode);
        response.json(alunosJSON);

    });

    //EndPoint Buscar pelo ID
    app.get('/aluno/:id',cors(), async function(request, response){

        let id = request.params.id;

    //   import do arquivo de funções
        const controllerAluno = require('./controller/controllerAluno');
        const aluno = await controllerAluno.buscarAluno(id);

        response.status(200);
        response.json(listContato);

    });

    //EndPoint Inserir novo registro
    app.post('/aluno',cors(), jsonParser, async function(request, response){
        let message;
        let statusCode;
        let headerContentType;
        // console.log(JSON.stringify(request.headers));
        // console.log(JSON.stringify(request.headers['content-type']));

        //try {

            headerContentType = JSON.stringify(request.headers['content-type']);
            headerContentType = headerContentType.replace(/"/g,'');

            if (headerContentType == "application/json")
            {
                dados = request.body;

                if (JSON.stringify(dados) == '{}')
                {
                    statusCode = 400;
                    message = MESSAGE_ERROR.BODY_NULL;
                }else{
                     //   import do arquivo de funções
                    const controllerAluno = require('./controller/controllerAluno');
                    const novoAluno = await controllerAluno.novoAluno(dados);
          
                    //Valida se a controller retornou true ou false    
                    if (novoAluno){
                        //Se o retorno da controller for boolena, significa que voltou true
                        if(typeof(novoAluno) == 'boolean')
                        {
                            statusCode = 201;
                            message = MESSAGE_SUCCESS.INSERT_ITEM;

                        }else if (novoAluno == 499) //retorno de campo obrigatório
                        {
                            statusCode = 400;
                            message = MESSAGE_ERROR.FIELDS_NULL;
                        }else if (novoAluno == 498) //retorno de email inválido
                        {
                            statusCode = 400;
                            message = MESSAGE_ERROR.INVALID_EMAIL;
                        }

                    }else{ //Retorno da controller como false, isso significa que não foi possivel inserir no BD
                        statusCode = 400;
                        message = MESSAGE_ERROR.NOT_CREATE_ITEM;
                    }    
                    //   import do arquivo de funções
                    // const controllerCategoria = require('./controller/controllerCategoria');
                    // const novoCategoria = await controllerCategoria.novoCategoria(dados);

                    // if (novoCategoria)
                    // {
                    //     statusCode = 201;
                    //     const categoria = await controllerCategoria.buscarUltimaCategoria();
                    //     message = categoria;
                    // }else
                    // {
                    //     statusCode = 400;
                    //     message = 'O item não pode ser criado';
                    // }
                }
            }else{
                statusCode = 415;
                message = MESSAGE_ERROR.CONTENT_TYPE_JSON;
            }
        //} catch (error) {
        //     statusCode = 400;
        //     message = 'Erro Interno';
        // }

        response.status(statusCode);
        response.json(message);

    });

    //EndPoint Atualizar um registro
    app.put('/categoria/:id',cors(), jsonParser, async function(request, response){

        let message;
        let statusCode;

        try {
        
            dados = request.body;
            idCategoria = request.params.id;

            //permite adicionar um novo elemento no objeto 
            Object.assign(dados, {id:idCategoria});

            //   import do arquivo de funções
            const controllerCategoria = require('./controller/controllerCategoria');

            //Busca o registro para validar a existencia
            const buscarCategoria = await controllerCategoria.buscarCategoria(idCategoria);

            if(buscarCategoria)
            {
                const categoria = await controllerCategoria.atualizarCategoria(dados);

                if (categoria)
                {
                    const categoriaAtualizada = await controllerCategoria.buscarCategoria(idCategoria);
                    statusCode = 201;
                    message = categoriaAtualizada;
                }
            }else
            {
                statusCode = 404;
                message = 'Registro não encontrado.';
            }   
        } catch (error) {
            console.log(error.message);
            statusCode = 400;
            message = 'Erro Interno';
        }

        response.status(statusCode);
        response.json(message);

    });

    //EndPoint Apagar um registro
    app.delete('/categoria/:id',cors(), async function(request, response){

        let message;
        let statusCode;

        try {
            let id = request.params.id;

            //   import do arquivo de funções
            const controllerCategoria = require('./controller/controllerCategoria');
            
            //Busca o registro para validar a existencia
            const buscarCategoria = await controllerCategoria.buscarCategoria(id);

            if(buscarCategoria)
            {
                const categoria = await controllerCategoria.excluirCategoria(id);
                
                if (categoria)
                {
                    statusCode = 200;
                    message = 'Registro excluído com sucesso';
                }
            }else
            {
                statusCode = 404;
                message = 'Registro não encontrado.';
            }    
        } catch (error) {
            console.log(error.message);
            statusCode = 400;
            message = 'Erro Interno';
        }

        response.status(statusCode);
        response.json(message);

    
    });


//Ativa o servidor HTTP para escutar na porta xxxx 8080, e cria uma função de CallBack para escrever uma mensagem
//Sempre deve ser a ultima linha
app.listen (port, function(){
    console.log('Servidor aguardando requisições HTTP');
});