/*********************************************************************
 * Objetivo: API responsável pela manipulacao de dados do Back-end
 *          (GET, POST, PUT, DELETE)
 * Autor: Marcel
 * Data Criacao: 10/10/2022
 * Versao: 1.0
 * 
 * Versao:2.0
 *      Novas implementaçoes:
 *          
 * 
 * Anotacoes: 
 *  //Para manipular o acesso a BD podemos utilizar o Prisma
    //Para instalar o prisma, devemos rodar os seguintes comandos
    //npm install prisma --save
    //npx prisma
    //npx prisma init
    //npm install @prisma/client
 *********************************************************************/

//Import das bibliotecas
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//arquivo de mensagens padronizadas
const {MESSAGE_ERROR, MESSAGE_SUCCESS} = require('./modulo/config.js');

const app = express();

//Configuracao de cors para liberar o acesso a API
app.use((request, response, next) => {
    response.header ('Access-Control-Allow-Origin', '*');
    response.header ('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    app.use(cors());
    next();
});

//Criamos um objeto que permite receber um JSON no body das requisicoes
const jsonParser = bodyParser.json()

/**************************************************************
    Rotas para CRUD (Create, Read, Update e Delete) de alunos
    Data: 10/10/2022
***************************************************************/

//EndPoint para Listar todos os Alunos
app.get('/v1/alunos', cors(), async function (request, response){

    let statusCode;
    let message;

    //import do arquivo controllerAluno
    const controllerAluno = require('./controller/controllerAluno.js');

    //Retorna todos os alunos existentes no BD
    const dadosAlunos = await controllerAluno.listarAlunos();

    //Valida se existe retorno de dados
    if(dadosAlunos)
    {   //Status 200
        statusCode = 200;
        message = dadosAlunos;
    }else{
        //Status 404
        statusCode = 404;
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }
    //console.log(message);
    //Retorna os dados da API
    response.status(statusCode);
    response.json(message);

});

//EndPoint para Buscar um Aluno pelo ID
app.get('/v1/aluno/:id', cors(), async function (request, response){

    let statusCode;
    let message;
    let id = request.params.id;

    //Validação do ID na requisição
    if (id != '' && id != undefined)
    {
        //import do arquivo controllerAluno
        const controllerAluno = require('./controller/controllerAluno.js');

        //Retorna todos os alunos existentes no BD
        const dadosAluno = await controllerAluno.buscarAluno(id);

        //Valida se existe retorno de dados
        if(dadosAluno)
        {   //Status 200
            statusCode = 200;
            message = dadosAluno;
        }else{
            //Status 404
            statusCode = 404;
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }
    }else{
        statusCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID;
    }

    //Retorna os dados da API
    response.status(statusCode);
    response.json(message);

});

//EndPoint para inserir um novo Aluno
app.post('/v1/aluno', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;
    let headerContentType;

    //Reccebe o tipo de content-type que foi enviado no header da requisicao
        //application/json
    headerContentType = request.headers['content-type'];

    //Validar se o content-type é do tipo application/json
    if (headerContentType == 'application/json'){
        //Recebe do corpo da mensagem o conteudp
        let dadosBody = request.body;

        //Realiza um processo de conversao de dados para conseguir comparar o json vazio
        if (JSON.stringify(dadosBody) != '{}')
        {
            //imnport do arquivo da controller de aluno
            const controllerAluno = require('./controller/controllerAluno.js');
            //Chama a funcao novoAluno da controller e encaminha os dados do body 
            const novoAluno = await controllerAluno.novoAluno(dadosBody);

            statusCode = novoAluno.status;
            message = novoAluno.message;
            
        }else{
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;
        }

    }else{
        statusCode = 415;
        message = MESSAGE_ERROR.CONTENT_TYPE;
    }

    response.status(statusCode);
    response.json(message);


});

//EndPoint para atualizar um Aluno existente
app.put('/v1/aluno/:id', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;
    let headerContentType;

    //Reccebe o tipo de content-type que foi enviado no header da requisicao
        //application/json
    headerContentType = request.headers['content-type'];

    //Validar se o content-type é do tipo application/json
    if (headerContentType == 'application/json'){
        //Recebe do corpo da mensagem o conteudp
        let dadosBody = request.body;

        //Realiza um processo de conversao de dados para conseguir comparar o json vazio
        if (JSON.stringify(dadosBody) != '{}')
        {
            //Recebe o id enviado por parametro na requisição
            let id = request.params.id;
            
            //Validação do ID na requisição
            if (id != '' && id != undefined)
            {
                //Adiciona o id no JSON que chegou do corpo da requisição
                dadosBody.id = id;
                //imnport do arquivo da controller de aluno
                const controllerAluno = require('./controller/controllerAluno.js');
                //Chama a funcao novoAluno da controller e encaminha os dados do body 
                const novoAluno = await controllerAluno.atualizarAluno(dadosBody);

                statusCode = novoAluno.status;
                message = novoAluno.message;
            }else{
                statusCode = 400;
                message = MESSAGE_ERROR.REQUIRED_ID;
            }

            
        }else{
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;
        }

    }else{
        statusCode = 415;
        message = MESSAGE_ERROR.CONTENT_TYPE;
    }

    response.status(statusCode);
    response.json(message);


});

//EndPoint para excluir um Aluno existente
app.delete('/v1/aluno/:id', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;
    let id = request.params.id;
    
    //Validação do ID na requisição
    if (id !== '' && id !== undefined){
        //import do arquivo da controller de aluno
        const controllerAluno = require('./controller/controllerAluno.js');
        
        //Chama a funcao para excluir um item 
        const aluno = await controllerAluno.excluirAluno(id);

        statusCode = aluno.status;
        message = aluno.message;

    }else{
        statusCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID;
    }

    response.status(statusCode);
    response.json(message);

});



/**************************************************************
    Rotas para CRUD (Create, Read, Update e Delete) de cursos
    Data: 31/10/2022
***************************************************************/

//EndPoint para Listar todos os Cursos
app.get('/v1/cursos', cors(), async function (request, response){

    let statusCode;
    let message;

    //import do arquivo controllerCurso
    const controllerCurso = require('./controller/controllerCurso.js');

    //Retorna todos os cursos existentes no BD
    const dadosCursos = await controllerCurso.listarCursos();

    //Valida se existe retorno de dados
    if(dadosCursos)
    {   //Status 200
        statusCode = 200;
        message = dadosCursos;
    }else{
        //Status 404
        statusCode = 404;
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }
    //Retorna os dados da API
    response.status(statusCode);
    response.json(message);

});

//EndPoint para Buscar um Curso pelo ID
app.get('/v1/curso/:id', cors(), async function (request, response){

    let statusCode;
    let message;
    let id = request.params.id;

    //Validação do ID na requisição
    if (id != '' && id != undefined)
    {
        //import do arquivo controllerCurso
        const controllerCurso = require('./controller/controllerCurso.js');

        //Retorna todos os cursos existentes no BD
        const dadosCurso = await controllerCurso.buscarCurso(id);

        //Valida se existe retorno de dados
        if(dadosCurso)
        {   //Status 200
            statusCode = 200;
            message = dadosCurso;
        }else{
            //Status 404
            statusCode = 404;
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }
    }else{
        statusCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID;
    }

    //Retorna os dados da API
    response.status(statusCode);
    response.json(message);

});

//EndPoint para inserir um novo Curso
app.post('/v1/curso', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;
    let headerContentType;

    //Reccebe o tipo de content-type que foi enviado no header da requisicao
        //application/json
    headerContentType = request.headers['content-type'];

    //Validar se o content-type é do tipo application/json
    if (headerContentType == 'application/json'){
        //Recebe do corpo da mensagem o conteudp
        let dadosBody = request.body;

        //Realiza um processo de conversao de dados para conseguir comparar o json vazio
        if (JSON.stringify(dadosBody) != '{}')
        {
            //imnport do arquivo da controller de curso
            const controllerCurso = require('./controller/controllerCurso.js');
            //Chama a funcao novoAluno da controller e encaminha os dados do body 
            const novoCurso = await controllerCurso.novoCurso(dadosBody);

            statusCode = novoCurso.status;
            message = novoCurso.message;
            
        }else{
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;
        }

    }else{
        statusCode = 415;
        message = MESSAGE_ERROR.CONTENT_TYPE;
    }

    response.status(statusCode);
    response.json(message);

});

//EndPoint para atualizar um Curso existente
app.put('/v1/curso/:id', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;
    let headerContentType;

    //Reccebe o tipo de content-type que foi enviado no header da requisicao
        //application/json
    headerContentType = request.headers['content-type'];

    //Validar se o content-type é do tipo application/json
    if (headerContentType == 'application/json'){
        //Recebe do corpo da mensagem o conteudp
        let dadosBody = request.body;

        //Realiza um processo de conversao de dados para conseguir comparar o json vazio
        if (JSON.stringify(dadosBody) != '{}')
        {
            //Recebe o id enviado por parametro na requisição
            let id = request.params.id;
            
            //Validação do ID na requisição
            if (id != '' && id != undefined)
            {
                //Adiciona o id no JSON que chegou do corpo da requisição
                dadosBody.id = id;
                //imnport do arquivo da controller de curso
                const controllerCurso = require('./controller/controllerCurso.js');
                //Chama a funcao atualizarCurso da controller e encaminha os dados do body 
                const curso = await controllerCurso.atualizarCurso(dadosBody);

                statusCode = curso.status;
                message = curso.message;
            }else{
                statusCode = 400;
                message = MESSAGE_ERROR.REQUIRED_ID;
            }

            
        }else{
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;
        }

    }else{
        statusCode = 415;
        message = MESSAGE_ERROR.CONTENT_TYPE;
    }

    response.status(statusCode);
    response.json(message);


});

//EndPoint para excluir um Curso existente
app.delete('/v1/curso/:id', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;
    let id = request.params.id;
    
    //Validação do ID na requisição
    if (id !== '' && id !== undefined){
        //import do arquivo da controller de aluno
        const controllerCurso = require('./controller/controllerCurso.js');
        
        //Chama a funcao para excluir um item 
        const curso = await controllerCurso.excluirCurso(id);

        statusCode = curso.status;
        message = curso.message;

    }else{
        statusCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID;
    }

    response.status(statusCode);
    response.json(message);

});

//Ativa o servidor para receber requisicoes HTTP
app.listen(8080, function(){
    console.log('Servidor aguardando requisicoes!');
});








