
//função para inserir um novo registro no BD
const novoContato = function(dados) {

  //import do arquivo de funções
  const contato = require('../model/DAO/contato.js');
  if(contato.insertContato(dados))
    return true;
  else
    return false;
}

//função para atualizar um registro no BD
const atualizarContato = function(dados) {
    console.log(dados);
}

//função para apagar um registro no BD
const apagarContato = function(dados) {
    console.log(dados);
}

//função para listar todos os registros do BD
const listarContato = function() {
    //import do arquivo de funções
    const contato = require('../model/DAO/contato.js');
    dados = contato.selectAllContato();
    console.log(dados);
    return true;
}


//torna as funções globais para serem utilizadas em outros arquivos
module.exports = {
                    novoContato,
                    atualizarContato,
                    apagarContato,
                    listarContato
                };