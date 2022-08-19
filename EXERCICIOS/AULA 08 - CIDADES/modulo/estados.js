var estados = [
    {
        "sigla" : "SP",
        "nome"  : "São Paulo"
    },
    {
        "sigla" : "RJ",
        "nome"  : "Rio de Janeiro"
    },
    {
        "sigla" : "AC",
        "nome"  : "Acre"
    },


];

const getEstados = function (){
    estados.forEach(item => {
        console.log(item.sigla); 
    });
};

const getEstado = function (sigla){
    let siglaEstado = sigla;
    let dados = {};
    let erro = true;

    estados.forEach(item => {
        if (item.sigla.indexOf(siglaEstado) == 0)
        {
            dados.nome = item.nome;
            dados.sigla = item.sigla;
            erro = false;
        }   
    });

    if (erro)
        return false;
    else
        return dados;

}


module.exports = {
    getEstados, getEstado
}