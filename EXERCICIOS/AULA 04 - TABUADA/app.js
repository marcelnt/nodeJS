console.log('Tabuada Simples');

var readline = require('readline');
const { inherits } = require('util');
//const { calcular } = require('./modulo/calculadora.js');

var entrada = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

entrada.question("Digite uma tabuada:\n",  function(numero1) {
    let tabuada = numero1;
    let resultado;
    console.log ('\n\n #### FOR ########### CALCULO DA TABUADA DO [' + tabuada + '] ########################################## \n');
    for (let index = 0; index <= 10; index++) {
        resultado = tabuada * index;
        console.log (tabuada + " x " + index + " = " + resultado);
    }

    console.log ('\n\n #### WHILE ########### CALCULO DA TABUADA DO [' + tabuada + '] ########################################## \n');
    let cont = 0 ;
    while ( cont <= 10 )
    {
        resultado = tabuada * cont;
        console.log (tabuada + " x " + cont + " = " + resultado);
        cont ++;
    }
});