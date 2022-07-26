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

/**********************************************************************************************************
 *  Autor: Marcel
 *  Rota: Categoria
 *  Data: 22/07/20222
 ***********************************************************************************************************/

    //EndPoint Listar todos os registros
    app.get('/categoria', cors(), async function(request, response){

        let statusCode;
        let message;
        let limit = 0;
        let page = 0;
        //recebe o token de validação de autenticação
        let token = request.headers['x-access-token'];
        console.log(token);

        if (request.query["limit"])
            limit = request.query["limit"];
        
        if (request.query["page"])
            page = request.query["page"];

        //   import do arquivo de funções
        const controllerCategoria = require('./controller/controllerCategoria');
        const listCategorias = await controllerCategoria.listarCategoria(limit, page, token);

        if (listCategorias)
        {
                statusCode = 200;
                message = listCategorias;
        }else{
                statusCode = 404;
                message = "Nenhum registro encontrado.";
        }  

        response.status(statusCode);
        response.json(message);

    });

    //EndPoint Buscar pelo ID
    app.get('/categoria/:id',cors(), async function(request, response){

        let id = request.params.id;

    //   import do arquivo de funções
        const controllerContato = require('./controller/controllerContato');
        const listContato = await controllerContato.buscarContato(id);

        response.status(200);
        response.json(listContato);

    });

    //EndPoint Inserir novo registro
    app.post('/categoria',cors(), jsonParser, async function(request, response){
        let message;
        let statusCode;
        let headerContentType;
        // console.log(JSON.stringify(request.headers));
        // console.log(JSON.stringify(request.headers['content-type']));

        try {

            headerContentType = JSON.stringify(request.headers['content-type']);
            headerContentType = headerContentType.replace(/"/g,'');



            if (headerContentType == "application/json")
            {
                dados = request.body;

                //   import do arquivo de funções
                const controllerCategoria = require('./controller/controllerCategoria');
                const novoCategoria = await controllerCategoria.novoCategoria(dados);

                if (novoCategoria)
                {
                    statusCode = 201;
                    const categoria = await controllerCategoria.buscarUltimaCategoria();
                    message = categoria;
                }else
                {
                    statusCode = 400;
                    message = 'O item não pode ser criado';
                }
            }else{
                statusCode = 400;
                message = 'Cabeçalho permitido apenas para [application/json]';
            }
        } catch (error) {
            statusCode = 400;
            message = 'Erro Interno';
        }

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

/**********************************************************************************************************
 *  Autor: Marcel
 *  Rota: Produto
 *  Data: 22/07/20222
 ***********************************************************************************************************/
    //EndPoint Listar todos os registros
    app.get('/produto',cors(), async function(request, response){

        let statusCode;
        let message;
        let limit = 0;
        let page = 0;

        if (request.query["limit"])
            limit = request.query["limit"];
        
        if (request.query["page"])
            page = request.query["page"];

    //   import do arquivo de funções
    const controllerCategoria = require('./controller/controllerCategoria');
    const listCategorias = await controllerCategoria.listarCategoria(limit, page);

    if (listCategorias)
    {
            statusCode = 200;
            message = listCategorias;
    }else{
            statusCode = 404;
            message = "Nenhum registro encontrado.";
    }  

    response.status(statusCode);
    response.json(message);

    });

    //EndPoint Buscar pelo ID
    app.get('/produto/:id',cors(), async function(request, response){

        let id = request.params.id;

    //   import do arquivo de funções
        const controllerContato = require('./controller/controllerContato');
        const listContato = await controllerContato.buscarContato(id);

        response.status(200);
        response.json(listContato);

    });

    //EndPoint Inserir novo registro
    app.post('/produto',cors(), jsonParser, async function(request, response){
        let message;
        let statusCode;
        let headerContentType;
        // console.log(JSON.stringify(request.headers));
        // console.log(JSON.stringify(request.headers['content-type']));

        try {

            headerContentType = JSON.stringify(request.headers['content-type']);
            headerContentType = headerContentType.replace(/"/g,'');



            if (headerContentType == "application/json")
            {
                dados = request.body;

                //   import do arquivo de funções
                const controllerCategoria = require('./controller/controllerCategoria');
                const novoCategoria = await controllerCategoria.novoCategoria(dados);

                if (novoCategoria)
                {
                    statusCode = 201;
                    const categoria = await controllerCategoria.buscarUltimaCategoria();
                    message = categoria;
                }else
                {
                    statusCode = 400;
                    message = 'O item não pode ser criado';
                }
            }else{
                statusCode = 400;
                message = 'Cabeçalho permitido apenas para [application/json]';
            }
        } catch (error) {
            statusCode = 400;
            message = 'Erro Interno';
        }

        response.status(statusCode);
        response.json(message);

    });

    //EndPoint Atualizar um registro
    app.put('/produto/:id',cors(), jsonParser, async function(request, response){

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
    app.delete('/produto/:id',cors(), async function(request, response){

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


    /**********************************************************************************************************
     *  Autor: Marcel
     *  Rota: Usuario
     *  Data: 22/07/20222
     ***********************************************************************************************************/
    //EndPoint Listar todos os registros
    app.get('/usuario/autenticar',cors(), jsonParser, async function(request, response){

        let statusCode;
        let message;

        headerContentType = JSON.stringify(request.headers['content-type']);
        headerContentType = headerContentType.replace(/"/g,'');
    
     
        if (headerContentType == "application/json")
        {
            dados = request.body;

            //   import do arquivo de funções
            const controllerUsuario = require('./controller/controllerUsuario');
            const listUsuario = await controllerUsuario.autenticarUsuario(dados);

            if (listUsuario)
            {
                    statusCode = 200;
                    message = listUsuario;
            }else{
                    statusCode = 401;
                    message = "Nenhum registro encontrado. Autenticação negada!";
            }  
        }else{
            statusCode = 400;
            message = 'Cabeçalho permitido apenas para [application/json]';
        }

        response.status(statusCode);
        response.json(message);

    });

    app.get('/usuario',cors(), async function(request, response){

        let statusCode;
        let message;
        let limit = 0;
        let page = 0;

        if (request.query["limit"])
            limit = request.query["limit"];
        
        if (request.query["page"])
            page = request.query["page"];

    //   import do arquivo de funções
    const controllerUsuario = require('./controller/controllerUsuario');
    const listUsuario = await controllerUsuario.listarUsuario(limit, page);

    if (listUsuario)
    {
            statusCode = 200;
            message = listUsuario;
    }else{
            statusCode = 404;
            message = "Nenhum registro encontrado.";
    }  

    response.status(statusCode);
    response.json(message);

    });

    //EndPoint Buscar pelo ID
    app.get('/usuario/:id',cors(), async function(request, response){

        let id = request.params.id;

    //   import do arquivo de funções
        const controllerContato = require('./controller/controllerContato');
        const listContato = await controllerContato.buscarContato(id);

        response.status(200);
        response.json(listContato);

    });

    //EndPoint Inserir novo registro
    app.post('/usuario',cors(), jsonParser, async function(request, response){
        let message;
        let statusCode;
        let headerContentType;
        // console.log(JSON.stringify(request.headers));
        // console.log(JSON.stringify(request.headers['content-type']));

        try {

            headerContentType = JSON.stringify(request.headers['content-type']);
            headerContentType = headerContentType.replace(/"/g,'');



            if (headerContentType == "application/json")
            {
                dados = request.body;

                //   import do arquivo de funções
                const controllerUsuario = require('./controller/controllerUsuario');
                const novoUsuario = await controllerUsuario.novoUsuario(dados);

                if (novoUsuario)
                {
                    statusCode = 201;
                    const usuario = await controllerUsuario.buscarUltimoUsuario();
                    message = usuario;
                }else
                {
                    statusCode = 400;
                    message = 'O item não pode ser criado';
                }
            }else{
                statusCode = 400;
                message = 'Cabeçalho permitido apenas para [application/json]';
            }
        } catch (error) {
            statusCode = 400;
            message = 'Erro Interno';
        }

        response.status(statusCode);
        response.json(message);

    });

    //EndPoint Atualizar um registro
    app.put('/usuario/:id',cors(), jsonParser, async function(request, response){

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
    app.delete('/usuario/:id',cors(), async function(request, response){

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


    const verifyJWT = async function(request, response, token, next)
    {
    
        //Verifica se o token recebido na aplicação é válido
        jwt.verify(token, SECRET, (err, decoded) =>{
    
            if (err)
                return response.status(401);
            else
                decoded.userID;
                next();
        });
    }

//Ativa o servidor HTTP para escutar na porta xxxx 8080, e cria uma função de CallBack para escrever uma mensagem
//Sempre deve ser a ultima linha
app.listen (8080, function(){
    console.log('Servidor aguardando requisições HTTP');
});