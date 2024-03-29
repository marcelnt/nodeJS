const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('./modulo/config');

const express = require('express');

const port = process.env.PORT || 8080;

//import a biblioteca de cors (permissão de acesso)
// const cors = require('cors'); 
const bodyParser = require('body-parser');

//import a biblioteca de cors (permissão de acesso)
const cors = require('cors'); 

//import a biblioteca de upload de imagens
const multer  = require('multer');

//Apagar arquivo
const fs = require('fs');

const upload = multer({ dest: 'arquivos/' })

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

    //Função para receber o Token enviado pelo header da requisição e validar
    const verifyJWT = async function(request, response, next){
        let token = request.headers['x-access-token'];
        const jwt = require('./controller/controllerJWT.js');

        const validade = await jwt.validateJWT(token);
        console.log(validade);
        if (validade){
            //request.userId = validade;
            next();
        }else
            return response.status(401).end();
    }



    //EndPoint Listar todos os registros
    app.get('/alunos', verifyJWT, cors(), async function(request, response){

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
    app.get('/aluno/:id',cors(),  async function(request, response){

        let id = request.params.id;

    //   import do arquivo de funções
        const controllerAluno = require('./controller/controllerAluno');
        const aluno = await controllerAluno.buscarAluno(id);

        response.status(200);
        response.json(aluno);

    });


    //EndPoint Autenticar Aluno
    app.post('/aluno/autenticar',cors(),jsonParser,  async function(request, response){

        let login = request.body.login
        let senha = request.body.senha

    //   import do arquivo de funções
        const controllerAluno = require('./controller/controllerAluno');
        const aluno = await controllerAluno.autenticarAluno(login, senha);

        console.log(aluno);

        if(aluno){
            response.status(200);
            response.json(aluno);
        }else{
            response.status(415);
            response.json("{'erro': 'Não autorizado'}");
        }
    });

    //EndPoint Inserir novo registro
    app.post('/aluno',cors(), jsonParser, upload.single('foto'), async function(request, response){
        let message;
        let statusCode;
        let headerContentType;
        // console.log(JSON.stringify(request.headers));
        // console.log(JSON.stringify(request.headers['content-type']));

        //try {

            headerContentType = request.headers['content-type'].split(';');
            //headerContentType = headerContentType[0].replace(/"/g,'');

            // console.log(headerContentType[0]);

            if (headerContentType[0] == "application/json")
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
            }else if (headerContentType[0] == "multipart/form-data"){
                //Para fazer upload de imagens pelo node devemos utilizar a dependencia multer
                //npm install --save multer
                //console.log(request.file);
                //   import do arquivo de funções
                const uploadArquivo = require('./middleware/upload');
                const image = await uploadArquivo.uploadImagem(request.file);
          
                
                if (image.status)
                {
                    statusCode = 466;
                    message = 'MESSAGE_ERROR.CONTENT_TYPE_JSON' + image.nome;
                }else{
                    
                    fs.unlink('./arquivos/'+request.file.filename, function (err){
                       
                    });
                    statusCode = 467;
                    message = 'ERRO';
                    
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
    app.put('/aluno/:id',cors(), jsonParser, async function(request, response){

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
    app.delete('/aluno/:id',cors(), async function(request, response){

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