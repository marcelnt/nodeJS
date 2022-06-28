/*************************************************************************************************
 *  Diferença de var, let e const 
 * 
 * var - ao criar uma variavel ela autometicamente já será inicializada com (undefined), 
 *  as vezes as varaiveis que serão criadas deverão ser utilizadas apenas em um outro momento
 * 
 * let - criar uma variavel e ela estará disponivel para uso somente dentro daquele bloco, 
 *  não podendo ser acessada fora do bloco
 * 
 * const - é utilizada para declarar uma varaivel e ela não ser mais modificada
 *  
 * 
 *************************************************************************************************/
console.log('Calculadora Simples');

var readline = require('readline');
const { calcular } = require('./modulo/calculadora.js');

var entrada = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

entrada.question("Digite o numero1:\n",  function(numero1) {
    let valor1 = numero1;
    
    entrada.question("Digite o numero2:\n",  function(numero2) {
        let valor2 = numero2;

        entrada.question("Digite uma opercação matmética:\n",  function(opcao) {
            let operacao = opcao.toUpperCase();

            //import do arquivo de funções
            require('./modulo/calculadora.js');
            
            let resultado = calcular(valor1, valor2, operacao);
            console.log(resultado);
            // if (operacao == 'SOMAR')
            // {
            //     let resultado = parseFloat(valor1) + parseFloat(valor2);
            //     console.log(resultado);
            // }else if(operacao == 'SUBTRAIR'){
            //     let resultado = parseFloat(valor1) - parseFloat(valor2);
            //     console.log(resultado);
            // }else if(operacao == 'MULTIPLICAR'){
            //     let resultado = parseFloat(valor1) * parseFloat(valor2);
            //     console.log(resultado);
            // }else if(operacao == 'DIVIDIR'){
            //     let resultado = parseFloat(valor1) / parseFloat(valor2);
            //     console.log(resultado);
            // }
            
            entrada.close();
        });    
    });
});


// function calcular (valor1, valor2, operacao){
//     let resultado;
//     if (operacao == 'SOMAR')
//     {
//         resultado = parseFloat(valor1) + parseFloat(valor2);
//     }else if(operacao == 'SUBTRAIR'){
//         resultado = parseFloat(valor1) - parseFloat(valor2);
//     }else if(operacao == 'MULTIPLICAR'){
//         resultado = parseFloat(valor1) * parseFloat(valor2);
//     }else if(operacao == 'DIVIDIR'){
//         resultado = parseFloat(valor1) / parseFloat(valor2);
//     }else{
//         resultado = false;
//     }

//     return resultado;
// }




