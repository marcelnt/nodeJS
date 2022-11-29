/*********************************************************************
 * Objetivo: Arquivo responsável manipulacao de recebimento, 
 * tratamento e retorno de dados entre a API e a model
 * Autor: Marcel
 * Data Criacao: 31/10/2022
 * Versao: 1.0
 * 
 *********************************************************************/

//arquivo de mensagens padronizadas
const {MESSAGE_ERROR, MESSAGE_SUCCESS} = require('../modulo/config.js');

//Funcao para gerar um novo curso
const novoCurso = async function (curso) {

    //Validacao de campos obrigatórios
    if (curso.nome == '' || curso.nome == undefined || curso.carga_horaria == '' || curso.carga_horaria == undefined )
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS};
    else
    {
        //import da model de curso
        const novoCurso = require('../model/DAO/curso.js');

        //chama a funcao para inserir um novo curso
        const result = await novoCurso.insertCurso(curso);
        
        if (result)
            return {status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM};
        else
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
    }
}

//Funcao para atualizar um registro
const atualizarCurso = async function (curso) {

    
    //Validaçao para o ID como campo obrigatório
    if (curso.id == ''|| curso.id == undefined)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    //Validacao de campos obrigatórios
    else if (curso.nome == '' || curso.nome == undefined || curso.carga_horaria == '' || curso.carga_horaria == undefined )
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS};
    else
    {
        //import da model de curso
        const atualizarCurso = require('../model/DAO/curso.js');

        //chama a funcao para atualizar um curso
        const result = await atualizarCurso.updateCurso(curso);
        
        if (result)
            return {status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM};
        else
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
    }


}

//Funcao para excluir um registro
const excluirCurso = async function (id) {
    //Validaçao para o ID como campo obrigatório
    if (id == ''|| id == undefined)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    else{
        //Validaçao para verificar se ID existe no BD
        const curso = await buscarCurso(id);

        //Valida se foi encontrado um registro valido
        if (curso)
        {
            //import da model de curso
            const excluirCurso = require('../model/DAO/curso.js');

            //chama a funcao para excluir um curso
            const result = await excluirCurso.deleteCurso(id);
            
            if (result)
                return {status: 200, message: MESSAGE_SUCCESS.DELETE_ITEM};
            else
                return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
        }else{
            return {status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB};
        }
    }
}

//Funcao para retornar todos os registros
const listarCursos = async function () {
    let dadosCursosJSON = {};

    const { selectAllCursos } = require ('../model/DAO/curso.js');

    const dadosCursos = await selectAllCursos();

    if (dadosCursos)
    {
        //Criamos uma chave cursos no JSON para retornar o array de cursos
        dadosCursosJSON.cursos = dadosCursos;

        return dadosCursosJSON;
    }
    else
        return false;
}

//Funcao para retornar um registro baseado no ID
const buscarCurso = async function (id) {
    let dadosCursosJSON = {};

    //Validaçao para o ID como campo obrigatório
    if (id == ''|| id == undefined)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    else{

        const { selectByIdCurso } = require ('../model/DAO/curso.js');

        const dadosCurso = await selectByIdCurso(id);

        if (dadosCurso)
        {
            //Criamos uma chave cursos no JSON para retornar o array de curso
            dadosCursosJSON.curso = dadosCurso;

            return dadosCursosJSON;
        }
        else
            return false;
    }
}

module.exports = {
    listarCursos,
    novoCurso,
    atualizarCurso,
    excluirCurso,
    buscarCurso
}
