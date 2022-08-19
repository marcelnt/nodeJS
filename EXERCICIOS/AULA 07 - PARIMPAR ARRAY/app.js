const { exit } = require('process');
const { getPar, getImpar, getParImpar } = require('./modulo/par_impar.js');

var readline = require('readline');


var entrada = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

entrada.question("Digite o numero1:\n",  function(numero1) {
    let numeroInicial = numero1;
    entrada.question("Digite o numero1:\n",  function(numero1) {
        let numeroFinal = numero1;

        let numerosPares = getPar(numeroInicial, numeroFinal);
        let numerosImpares = getImpar(numeroInicial, numeroFinal);
        let numerosParesImpares = getParImpar(numeroInicial, numeroFinal);

        console.log("\n Lista de números Pares")
        if (numerosPares)
            console.log(numerosPares)
        else
            console.log('Não foram encontrados números Pares');


        console.log("\nLista de números Impares")
        if (numerosImpares)
            console.log(numerosImpares)
        else
            console.log('Não foram encontrados números Impares');


        console.log("\nLista de números Pares e Impares")
        if (numerosParesImpares)
            console.log(numerosParesImpares)
        else
            console.log('Não foram encontrados números Impares');
        
        process.exit();
    });
});