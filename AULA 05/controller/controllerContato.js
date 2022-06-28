// const { result } = require('lodash');

//função para inserir um novo registro no BD
const novoContato = async function(dados) {
    let status = false;
   
    //import do arquivo de funções
    const contato = require('../model/DAO/contato.js');
    const result = await contato.insertContato(dados);

    if(result)
        status = true;

    return status;

}
  
//função para atualizar um registro no BD
const atualizarContato = async function(dados) {
    let status = false;

    //import do arquivo de funções
    const contato = require('../model/DAO/contato.js');
    result = await contato.updateContato(dados);

    if(result)
        status = true;

    return status;
}
  
//função para apagar um registro no BD
const apagarContato = async function(id) {
    let status = false;

    //import do arquivo de funções
    const contato = require('../model/DAO/contato.js');
    result = await contato.deleteContato(id);

    if(result)
        status = true;

    return status;
}
  
//função para listar todos os registros do BD
const listarContato = async function() {
    //import do arquivo de funções
    const contato = require('../model/DAO/contato.js');
    dadosContato = await contato.selectAllContato();

    return dadosContato;
}

//função para listar todos os registros do BD
const buscarContato = async function(id) {
    //import do arquivo de funções
    const contato = require('../model/DAO/contato.js');
    dadosContato = await contato.selectByIdContato(id);

    return dadosContato;
}
  
  
  //torna as funções globais para serem utilizadas em outros arquivos
  module.exports = {
                      novoContato,
                      atualizarContato,
                      apagarContato,
                      listarContato,
                      buscarContato
                  };