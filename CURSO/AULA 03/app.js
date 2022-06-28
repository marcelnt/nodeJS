//import da biblioteca express
const express = require('express');
//import a biblioteca de cors (permissão de acesso)
const cors = require('cors'); 


//instancia para a classe express
const app = express();

app.use ((request, response, next) => {
    //console.log('teste');
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET');
    app.use(cors());
    next();
});


//EndPoint Raícd ..z
app.get('/', cors(),function(request, response, next){
    response.writeHead(200);
    //response.send('Você esta acessando a raíz do servidor HTTP:');
});

//EndPoint Cliente
app.get('/cliente', cors(), function(request, response, next){
    //response.writeHead(200);
    response.send('Você esta na pagina de clientesSSSS');
});

//EndPoint Produto
app.get('/produto',cors(), function(request, response,next ){
    //response.writeHead(200);
    response.send('Você esta na pagina de produtos');
});

//EndPoint Produto by ID
app.get('/produto/:id',cors(), function(request, response,next ){
    //response.writeHead(200);
    response.send('Você esta na pagina de produtos, id= ' + request.params.id);
});

//EndPoint Produto by nome ou descricao como parametros
app.get('/produto/busca/:nome/:descricao',cors(), function(request, response,next ){
    console.log(request.params);
    response.send('Você esta na pagina de produtos, nome= ' + request.params.nome + request.params);
});

//EndPoint Produto, para abrir um arquivo html ao invés da mensagem
app.get('/listar-produto',cors(), function(request, response,next ){
    //response.writeHead(200);
    response.sendFile(__dirname + '/view/produtos.html');
});


//Ativa o servidor HTTP para escutar na porta xxxx 8080, e cria uma função de CallBack para escrever uma mensagem
//Sempre deve ser a ultima linha
app.listen (8080, function(){
    console.log('Servidor aguardando requisições HTTP');
});