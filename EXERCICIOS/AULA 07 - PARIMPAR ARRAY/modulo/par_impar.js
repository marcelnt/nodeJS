const getPar = function (numero1, numero2)
{
    let numeroInicial = parseInt(numero1);
    let numeroFinal = parseInt(numero2);
    var numerosPares = [];

    while (numeroInicial <= numeroFinal) {
        if(numeroInicial%2 == 0)
            numerosPares.push(numeroInicial);
    
    numeroInicial++
    }

    if (numerosPares.length > 0)
        return numerosPares;
    else
        return false;
}

const getImpar = function (numero1, numero2)
{
    let numeroInicial = parseInt(numero1);
    let numeroFinal = parseInt(numero2);
    var numerosImpares = [];

    while (numeroInicial <= numeroFinal) {
        if(numeroInicial%2 != 0)
        numerosImpares.push(numeroInicial);
    
    numeroInicial++
    }

    if (numerosImpares.length > 0)
        return numerosImpares;
    else
        return false;
}

const getParImpar = function (numero1, numero2)
{
    let numeroInicial = parseInt(numero1);
    let numeroFinal = parseInt(numero2);
    let numerosParesImpares = [];

    numerosParesImpares.push(getPar(numeroInicial, numeroFinal));  
    numerosParesImpares.push(getImpar(numeroInicial, numeroFinal));  

    if (numerosParesImpares.length > 0)
        return numerosParesImpares;
    else
        return false;
}

module.exports = {
    getPar, getImpar, getParImpar
}