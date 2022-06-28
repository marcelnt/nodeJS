//Criar uma função para calcular a media de dois valores
const media = function (valor1, valor2){
    let resultado  = (valor1 + valor2)/2;
    return resultado;
}

const mediaNotas = function (nota1, nota2, nota3, nota4){
    let resultado  = (nota1 + nota2 + nota3 + nota4)/4;
    return resultado;
}

//torna a função criada de forma global, para ser importada em outros arquivos
//module.exports = media;
module.exports = mediaNotas;