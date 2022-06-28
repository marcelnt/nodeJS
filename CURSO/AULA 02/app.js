// Criando um servidor HTTP utilizando recursos nativos do Node

//Import arquivo de requisições http
var http = require('http');

//criando um servidor http para responder uma mensagem.
http.createServer (function (req, response){
    response.writeHead(200);
    response.end('Configurando servidor HTTP em NodeJS');
}).listen(8080);

