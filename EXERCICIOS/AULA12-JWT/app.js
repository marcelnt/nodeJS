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
        const jwt = require('./midleware/controllerJWT.js');

        const validade = await jwt.validateJWT(token);
        //console.log(validade);
        if (validade){
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

    //EndPoint Autenticar Aluno
    app.post('/aluno/autenticar',cors(),jsonParser,  async function(request, response){

        let login = request.body.login
        let senha = request.body.senha

    //   import do arquivo de funções
        const controllerAluno = require('./controller/controllerAluno');
        const aluno = await controllerAluno.autenticarAluno(login, senha);

        //console.log(aluno);

        if(aluno){
            response.status(200);
            response.json(aluno);
        }else{
            response.status(415);
            response.json("{'erro': 'Não autorizado'}");
        }
    });


//Ativa o servidor HTTP para escutar na porta xxxx 8080, e cria uma função de CallBack para escrever uma mensagem
//Sempre deve ser a ultima linha
app.listen (port, function(){
    console.log('Servidor aguardando requisições HTTP');
});