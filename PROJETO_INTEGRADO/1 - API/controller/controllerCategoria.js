/*************************************************************************************************************************************
*   Projeto: Pizzaria   
*   Objetivo: Controller de categoria => Permite administrar as categorias da Pizzaria implementando as regras de negocio do projeto
*   Autor: Marcel
*   Data criação: 22/07/2022
*   
**************************************************************************************************************************************/

const { verifyJWT } = require('../controller/moduloJWT.js');

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
const listarCategoria = async function(rows, page, token) {
    require('../controller/moduloJWT.js');
    
    const auth = await verifyJWT(token);

    if (auth)
    {
        let offset;

        if (page == 1 || page == 0)
        {
            offset = 0;
        }else if (page > 1){
            offset = rows * (page-1);
        }

        //import do arquivo de funções
        const categoria = require('../model/DAO/categoria.js');
        result = await categoria.selectAllCategoria(rows, offset);

        return result;
    }else{
        return 401;
    }
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