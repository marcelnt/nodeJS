var readline = require('readline');
const { inherits } = require('util');
//const { calcular } = require('./modulo/calculadora.js');

var entrada = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const exibeMenu = async function ()
{
    let itemMenu;

    console.log ('Escolha uma opção do Menu: \n');
    console.log ('[1] - Média \n');
    console.log ('[2] - Calculadora \n');
    console.log ('[3] - Tabuada \n');
    console.log ('[0] - Sair \n');

    entrada.question("Digite a opção desejada: ", function(numero1) {
        itemMenu = parseInt(numero1);
    });

    return itemMenu;
}


const menu = async function (item)
{
    let itemMenu = item;
    console.log (itemMenu);
    switch (itemMenu) {
        case 1:
            const { media } = require ('../../AULA 02 - MEDIA/app.js');
            break;
        case 2:
            const { calculadora } = require ('../AULA 03 - CALCULADORA/app.js');
            break;
        case 3:
            const { tabuada } = require ('../AULA 04 - TABUADA/app.js');
            break;
        case 0: 
            entrada.question("Deseja realmente sair?: [0] - Sair | [1] - Continuar:",  function(resposta) {
                let resp = resposta;
                console.log(resp);
                if (resp == 0)
                    process.exit();
                
            });

        default:
            break;
    }
}


module.exports = {
    exibeMenu,
    menu
}