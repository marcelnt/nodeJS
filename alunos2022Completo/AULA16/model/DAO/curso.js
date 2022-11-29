/*********************************************************************
 * Objetivo: Arquivo responsável pela manipulacao de dados com o BD 
 *      (insert, update, delete e select)
 * Autor: Marcel
 * Data Criacao: 31/10/2022
 * Versao: 1.0
 * 
 *********************************************************************/

//Funcao para inserir um novo registro no BD
const insertCurso = async function (curso) {
    try {

        //Import da classe prismaClient, que é responsável pelas interacoes com o BD
        const { PrismaClient } = require('@prisma/client');

        //Instancia da classe PrismaClient
        const prisma = new PrismaClient();

        let sql = `insert into tbl_curso (nome,
                                        sigla, 
                                        carga_horaria,
                                        icone
                                        )
                                        values(
                                            '${curso.nome}',
                                            '${curso.sigla}',
                                            '${curso.carga_horaria}',
                                            '${curso.icone}'
                                        )`;

        console.log(sql);
        
        // Executa o script SQL no Banco de dados 
        //($executeRawUnsafe permite encaminhar uma variavel contendo o script)
        const result = await prisma.$executeRawUnsafe (sql);

        //Verifica se o script foi executado com sucesso no BD
        if (result)
            return true;
        else
            return false;

    } catch (error) {
        return false;
    }
}

//Funcao para atualizar um registro no BD
const updateCurso = async function (curso) {
    try {

        //Import da classe prismaClient, que é responsável pelas interacoes com o BD
        const { PrismaClient } = require('@prisma/client');

        //Instancia da classe PrismaClient
        const prisma = new PrismaClient();

        let sql = `update tbl_curso set nome            = '${curso.nome}', 
                                        sigla           = '${curso.sigla}', 
                                        carga_horaria   = '${curso.carga_horaria}', 
                                        icone           = '${curso.icone}'
                                        
                            where id = '${curso.id}'
                        `;
       
        
        // Executa o script SQL no Banco de dados 
        //($executeRawUnsafe permite encaminhar uma variavel contendo o script)
        const result = await prisma.$executeRawUnsafe (sql);

        //Verifica se o script foi executado com sucesso no BD
        if (result)
            return true;
        else
            return false;

    } catch (error) {
        return false;
    }

}

//Funcao para excluir um registro no BD
const deleteCurso = async function (id) {
    try {

        //Import da classe prismaClient, que é responsável pelas interacoes com o BD
        const { PrismaClient } = require('@prisma/client');

        //Instancia da classe PrismaClient
        const prisma = new PrismaClient();

        let sql = `delete from tbl_curso
                            where id = '${id}'
                        `;
        // Executa o script SQL no Banco de dados 
        //($executeRawUnsafe permite encaminhar uma variavel contendo o script)
        const result = await prisma.$executeRawUnsafe (sql);

        
        //Verifica se o script foi executado com sucesso no BD
        if (result)
            return true;
        else
            return false;

    } catch (error) {
        return false;
    }



}

//Funcao para retornar todos os registros do BD
const selectAllCursos = async function () {

    //Import da classe prismaClient, que é responsável pelas interacoes com o BD
    const { PrismaClient } = require('@prisma/client');

    //Instancia da classe PrismaClient
    const prisma = new PrismaClient();

    //Criamos um objeto do tipo RecordSet (rsCursos) para receber os dados do BD
    //através do script SQL (select)
    let sql = `select cast(id as float) as id, 
                    nome, 
                    sigla, 
                    carga_horaria,
                    icone
                from tbl_curso order by id desc`;

    const rsCursos = await prisma.$queryRawUnsafe(sql);

    if (rsCursos.length > 0)
        return rsCursos;
    else
        return false;

}

//Funcao para retornar apenas o registro baseado no ID
const selectByIdCurso = async function (id) {

    //Import da classe prismaClient, que é responsável pelas interacoes com o BD
    const { PrismaClient } = require('@prisma/client');

    //Instancia da classe PrismaClient
    const prisma = new PrismaClient();

    //Criamos um objeto do tipo RecordSet (rsAlunos) para receber os dados do BD
    //através do script SQL (select)

    let sql = `select cast(id as float) as id, 
                    nome, 
                    sigla, 
                    carga_horaria, 
                    icone
                from tbl_curso 
                where id = ${id}`

    const rsCurso = await prisma.$queryRawUnsafe(sql) ;

    if (rsCurso.length > 0)
        return rsCurso;
    else
        return false;

}

module.exports = {
    selectAllCursos,
    insertCurso,
    updateCurso,
    deleteCurso,
    selectByIdCurso
}