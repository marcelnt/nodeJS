//Escreve uma mensagem no prompt
console.log("Aula 01 - Iniciando com Node.JS");

//Importa a biblioteca de entrada de dados
var readline = require('readline');

//Cria uma interface para entrada e saída de dados com o usuário
var entrada = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//Entrada de dados pelo teclado
entrada.question("Digite o seu nome: \n",  function(nome) {

    //Cria uma variavel local para receber o valor digitado pelo usuário
    let nomeUsuario = nome;

    if (nomeUsuario != "")
        //Escreve na tela uma mensagem com a variavel utilizada
        console.log("Bem vindo ao Node ["+nomeUsuario+"].");
    else
        console.log("É necessário a entrada de um valor válido");
        
    entrada.close;

});




