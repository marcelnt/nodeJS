/*************************************************************************************************************************************
*   Projeto: Pizzaria   
*   Objetivo: Controller de produto => Permite administrar os produtos da Pizzaria implementando as regras de negocio do projeto
*   Autor: Marcel
*   Data criação: 22/07/2022
*   
**************************************************************************************************************************************/

//função para inserir um novo registro no BD
const novoUsuario = async function(dados) {
    let status = false;
   
    //import do arquivo de funções
    const usuario = require('../model/DAO/usuario.js');
    const result = await usuario.insertUsuario(dados);

    if(result)
        status = true;

    return status;

}

//função para atualizar um registro no BD
const atualizarUsuario = async function(dados) {
    let status = false;

    //import do arquivo de funções
    const produto = require('../model/DAO/usuario.js');
    result = await produto.updateUsuario(dados);

    if(result)
        status = true;

    return status;
}
  
//função para apagar um registro no BD
const excluirUsuario = async function(id) {
    let status = false;

    //import do arquivo de funções
    const usuario = require('../model/DAO/usuario.js');
    result = await usuario.deleteUsuario(id);

    if(result)
        status = true;

    return status;
}
  
//função para listar todos os registros do BD
const listarUsuario = async function(rows, page) {

    let offset;

    if (page == 1 || page == 0)
    {
        offset = 0;
    }else if (page > 1){
        offset = rows * (page-1);
    }

    //import do arquivo de funções
    const produto = require('../model/DAO/usuario.js');
    result = await produto.selectAllUsuario(rows, offset);

    return result;
}

//função para listar todos os registros do BD
const buscarUsuario = async function(id) {
    //import do arquivo de funções
    const usuario = require('../model/DAO/usuario.js');
    result = await usuario.selectByIdUsuario(id);

    return result;
}

//função para listar todos os registros do BD
const buscarUltimoUsuario = async function() {
    //import do arquivo de funções
    const usuario = require('../model/DAO/usuario.js');
    result = await usuario.selectByLastUsuario();

    return result;
} 


//função para listar todos os registros do BD
const autenticarUsuario = async function(dados) {
    //import do arquivo de funções
    const usuario = require('../model/DAO/usuario.js');
    const jwt = require('../controller/moduloJWT.js');
    result = await usuario.selectByAutenticUsuario(dados);
    
    if (result)
    {
        const newToken = await jwt.createJWT(result.id);

        if (newToken)
        {
            result[0].auth  = true;
            result[0].token = newToken;
        }else{
            return false;
        }
         return result;
    }else    
        return false;
}

//torna as funções globais para serem utilizadas em outros arquivos
module.exports = {
                    novoUsuario,
                    atualizarUsuario,
                    excluirUsuario,
                    listarUsuario,
                    buscarUsuario,
                    buscarUltimoUsuario,
                    autenticarUsuario
                };