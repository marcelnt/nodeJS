//função para listar todos os registros do BD
const  selecAuthByPassword = async function(login, senha) {

    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    sql = `select CAST(id AS float) as id ,login from tbl_aluno_usuario where login = '${login}' and senha = '${senha}'`;
    
    
    const rsAlunos = await prisma.$queryRawUnsafe (sql);

    if(rsAlunos.length > 0)
       return rsAlunos[0];
    else
       return false;

}


module.exports = {
    selecAuthByPassword
}