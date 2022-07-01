// const { result } = require('lodash');

//função para inserir um novo registro no BD
const novoCategoria = async function(dados) {
    let status = false;
   
    //import do arquivo de funções
    const categoria = require('../model/DAO/categoria.js');
    const result = await categoria.insertCategoria(dados);

    if(result)
        status = true;

    return status;

}
  
//função para atualizar um registro no BD
const atualizarCategoria = async function(dados) {
    let status = false;

    //import do arquivo de funções
    const categoria = require('../model/DAO/categoria.js');
    result = await categoria.updateCategoria(dados);

    if(result)
        status = true;

    return status;
}
  
//função para apagar um registro no BD
const excluirCategoria = async function(id) {
    let status = false;

    //import do arquivo de funções
    const categoria = require('../model/DAO/categoria.js');
    result = await categoria.deleteCategoria(id);

    if(result)
        status = true;

    return status;
}
  
//função para listar todos os registros do BD
const listarCategoria = async function() {
    //import do arquivo de funções
    const categoria = require('../model/DAO/categoria.js');
    result = await categoria.selectAllCategoria();

    return result;
}

//função para listar todos os registros do BD
const buscarCategoria = async function(id) {
    //import do arquivo de funções
    const categoria = require('../model/DAO/categoria.js');
    result = await categoria.selectByIdCategoria(id);

    return result;
}
  
//função para listar todos os registros do BD
const buscarUltimaCategoria = async function() {
    //import do arquivo de funções
    const categoria = require('../model/DAO/categoria.js');
    result = await categoria.selectByLastCategoria();

    return result;
} 
  //torna as funções globais para serem utilizadas em outros arquivos
  module.exports = {
                      novoCategoria,
                      atualizarCategoria,
                      excluirCategoria,
                      listarCategoria,
                      buscarCategoria,
                      buscarUltimaCategoria
                  };