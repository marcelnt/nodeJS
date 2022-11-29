/*********************************************************************
 * Objetivo: Arquivo resposnsável pela manipulacao de dados com o BD 
 *      (insert, update, delete e select)
 * Autor: Marcel
 * Data Criacao: 06/10/2022
 * Versao: 1.0
 * 
 *********************************************************************/

//Funcao para inserir um novo registro no BD
const insertAluno = async function (aluno) {
    try {

        //Import da classe prismaClient, que é responsável pelas interacoes com o BD
        const { PrismaClient } = require('@prisma/client');

        //Instancia da classe PrismaClient
        const prisma = new PrismaClient();

        let sql = `insert into tbl_aluno (nome, 
                                        foto, 
                                        rg, 
                                        cpf, 
                                        email, 
                                        data_nascimento, 
                                        telefone, 
                                        celular, 
                                        sexo)
                                        values(
                                            '${aluno.nome}',
                                            '${aluno.foto}',
                                            '${aluno.rg}',
                                            '${aluno.cpf}',
                                            '${aluno.email}',
                                            '${aluno.data_nascimento}',
                                            '${aluno.telefone}',
                                            '${aluno.celular}',
                                            '${aluno.sexo}'
                                        )`;
        
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
const updateAluno = async function (aluno) {
    try {

        //Import da classe prismaClient, que é responsável pelas interacoes com o BD
        const { PrismaClient } = require('@prisma/client');

        //Instancia da classe PrismaClient
        const prisma = new PrismaClient();

        let sql = `update tbl_aluno set nome            = '${aluno.nome}', 
                                        foto            = '${aluno.foto}', 
                                        rg              = '${aluno.rg}', 
                                        cpf             = '${aluno.cpf}', 
                                        email           = '${aluno.email}', 
                                        data_nascimento = '${aluno.data_nascimento}', 
                                        telefone        = '${aluno.telefone}', 
                                        celular         = '${aluno.celular}', 
                                        sexo            = '${aluno.sexo}'
                            where id = '${aluno.id}'
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
const deleteAluno = async function (id) {
    try {

        //Import da classe prismaClient, que é responsável pelas interacoes com o BD
        const { PrismaClient } = require('@prisma/client');

        //Instancia da classe PrismaClient
        const prisma = new PrismaClient();

        let sql = `delete from tbl_aluno
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
const selectAllAlunos = async function () {

    //Import da classe prismaClient, que é responsável pelas interacoes com o BD
    const { PrismaClient } = require('@prisma/client');

    //Instancia da classe PrismaClient
    const prisma = new PrismaClient();

    //Criamos um objeto do tipo RecordSet (rsAlunos) para receber os dados do BD
    //através do script SQL (select)
    const rsAlunos = await prisma.$queryRaw `select cast(id as float) as id, nome, foto, sexo, rg, cpf, email, telefone, celular, data_nascimento from tbl_aluno order by id desc`;

    if (rsAlunos.length > 0)
        return rsAlunos;
    else
        return false;

}

//Funcao para retornar apenas o registro baseado no ID
const selectByIdAluno = async function (id) {

    //Import da classe prismaClient, que é responsável pelas interacoes com o BD
    const { PrismaClient } = require('@prisma/client');

    //Instancia da classe PrismaClient
    const prisma = new PrismaClient();

    //Criamos um objeto do tipo RecordSet (rsAlunos) para receber os dados do BD
    //através do script SQL (select)

    let sql = `select cast(id as float) as id, 
                    nome, 
                    foto, 
                    sexo, 
                    rg, 
                    cpf, 
                    email, 
                    telefone, 
                    celular, 
                    data_nascimento 
                from tbl_aluno 
                where id = ${id}`
    console.log(sql);
    const rsAluno = await prisma.$queryRawUnsafe(sql) ;

    if (rsAluno.length > 0)
        return rsAluno;
    else
        return false;

}

//Funcao para retornar o ultimo ID gerado no BD
const selectLastId = async function (){
    //Import da classe prismaClient, que é responsável pelas interacoes com o BD
    const { PrismaClient } = require('@prisma/client');

    //Instancia da classe PrismaClient
    const prisma = new PrismaClient();

    //Script para buscar o ultimo ID gerado no BD
    let sql = `select cast(id as float) as id 
                    from tbl_aluno 
                    order by id desc 
                    limit 1;`;

    const rsAluno = await prisma.$queryRawUnsafe(sql) ;
   
    if (rsAluno)
        return rsAluno[0].id;
    else
        return false;
        
    
}

module.exports = {
    selectAllAlunos,
    insertAluno,
    updateAluno,
    deleteAluno,
    selectByIdAluno,
    selectLastId
}