const { setCliente } = require('./modulo/crud.js');
var readline = require('readline');

var entrada = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

while (continuar)
{

    entrada.question("Digite o nome:\n",  function(dados) {
        let nome = dados;
        
        entrada.question("Digite o telefone:\n",  function(dados) {
            let telefone = dados;
            
            entrada.question("Digite o nome:\n",  function(dados) {
                let email = dados;
                
                setCliente(nome, telefone, email);

                
                
            });    
            
        });

    });

    
}