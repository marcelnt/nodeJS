//Calculadora
const calcular = function (valor1, valor2, operacao){
    let resultado;
    if (operacao == 'SOMAR'){
        resultado = somar(valor1, valor2);
    }else if(operacao == 'SUBTRAIR'){
        resultado = subtrair(valor1, valor2);
    }else if(operacao == 'MULTIPLICAR'){
        resultado = multiplicar(valor1, valor2);
    }else if(operacao == 'DIVIDIR'){
        resultado = dividir(valor1, valor2);
    }else{
        resultado = false;
    }

    return resultado;
}

//Arrow Function
const somar =       (valor1, valor2)  => parseFloat(valor1) + parseFloat(valor2);
const subtrair =    (valor1, valor2)  => parseFloat(valor1) - parseFloat(valor2);
const multiplicar = (valor1, valor2)  => parseFloat(valor1) * parseFloat(valor2);
const dividir =     (valor1, valor2)  => parseFloat(valor1) / parseFloat(valor2);


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

//Aqui definimos o que será função global para outros arquivos
module.exports = {
    calcular
}