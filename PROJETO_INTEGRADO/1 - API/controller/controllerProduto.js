/*************************************************************************************************************************************
*   Projeto: Pizzaria   
*   Objetivo: Controller de produto => Permite administrar os produtos da Pizzaria implementando as regras de negocio do projeto
*   Autor: Marcel
*   Data criação: 22/07/2022
*   
**************************************************************************************************************************************/

//função para inserir um novo registro no BD
const novoproduto = async function(dados) {
    let status = false;
   
    //import do arquivo de funções
    const produto = require('../model/DAO/produto.js');
    const result = await produto.insertproduto(dados);

    if(result)
        status = true;

    return status;

}

//função para atualizar um registro no BD
const atualizarproduto = async function(dados) {
    let status = false;

    //import do arquivo de funções
    const produto = require('../model/DAO/produto.js');
    result = await produto.updateproduto(dados);

    if(result)
        status = true;

    return status;
}
  
//função para apagar um registro no BD
const excluirproduto = async function(id) {
    let status = false;

    //import do arquivo de funções
    const produto = require('../model/DAO/produto.js');
    result = await produto.deleteproduto(id);

    if(result)
        status = true;

    return status;
}
  
//função para listar todos os registros do BD
const listarproduto = async function(rows, page) {

    let offset;

    if (page == 1 || page == 0)
    {
        offset = 0;
    }else if (page > 1){
        offset = rows * (page-1);
    }

    //import do arquivo de funções
    const produto = require('../model/DAO/produto.js');
    result = await produto.selectAllproduto(rows, offset);

    return result;
}

//função para listar todos os registros do BD
const buscarproduto = async function(id) {
    //import do arquivo de funções
    const produto = require('../model/DAO/produto.js');
    result = await produto.selectByIdproduto(id);

    return result;
}
  
//função para listar todos os registros do BD
const buscarUltimaproduto = async function() {
    //import do arquivo de funções
    const produto = require('../model/DAO/produto.js');
    result = await produto.selectByLastproduto();

    return result;
} 
//torna as funções globais para serem utilizadas em outros arquivos
module.exports = {
                    novoproduto,
                    atualizarproduto,
                    excluirproduto,
                    listarproduto,
                    buscarproduto,
                    buscarUltimaproduto
                };