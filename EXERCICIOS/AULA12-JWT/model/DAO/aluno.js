

// função para inserir um novo registro no BD
const insertAluno = async function(aluno) {
    let status = false;

    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    const sql = "insert into tbl_aluno (nome, email, foto) values ('"+aluno.nome+"', '"+aluno.email+"', '"+aluno.foto+"')";
    const result = await prisma.$executeRawUnsafe (sql);
 

    if (result)
        status = true;
    
    return status;

}

//função para listar todos os registros do BD
const  selectAllAlunos = async function() {

    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    sql = "select CAST(id AS float) as id ,nome from tbl_aluno";
  
    //const rsCategoria = await prisma.$queryRaw `select * from tblCategoria`;
    const rsAlunos = await prisma.$queryRawUnsafe (sql);

    if(rsAlunos.length > 0)
       return rsAlunos;
    else
       return false;

}

//função para listar todos os registros do BD
const  selectByIdAluno = async function(id) {

    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    sql = "select CAST(id AS float) as id ,nome from tbl_aluno where id ="+id;
  
    //const rsCategoria = await prisma.$queryRaw `select * from tblCategoria`;
    const rsAlunos = await prisma.$queryRawUnsafe (sql);

    if(rsAlunos.length > 0)
       return rsAlunos;
    else
       return false;

}

//função para listar todos os registros do BD
const  selectLastIdAluno = async function() {

    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    sql = "select cast(id as float) as id from tbl_aluno order by id desc limit 1";
  
    //const rsCategoria = await prisma.$queryRaw `select * from tblCategoria`;
    const rsAluno = await prisma.$queryRawUnsafe (sql);

    if(rsAluno.length > 0)
       return rsAluno[0].id;
    else
       return false;

}

module.exports = {
    selectAllAlunos,
    selectByIdAluno,
    insertAluno,
    selectLastIdAluno
}