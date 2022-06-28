

// função para inserir um novo registro no BD
const insertContato = async function(contato) {
    let status = false;

    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    const sql = "insert into tblcontato (nome, email, telefone) values ('"+contato.nome+"', '"+contato.email+"', '"+contato.telefone+"')";
    const result = await prisma.$executeRawUnsafe (sql);

    if (result)
        status = true;
    
    return status;

}

//função para atualizar um registro no BD
const updateContato = async function(contato) {
    let status = false;

    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    const sql = "update tblcontato set nome = '"+contato.nome+"', email='"+contato.email+"', telefone='"+contato.telefone+"' where id = " + contato.id;
    const result = await prisma.$executeRawUnsafe (sql);

    if (result)
        status = true;
    
    return status;
   
}

//função para apagar um registro no BD
const deleteContato = async function(id) {
    let status = false;

    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    const sql = "delete from tblcontato where id="+id;
    const result = await prisma.$executeRawUnsafe (sql);

    if (result)
        status = true;
    
    return status;
}

//função para listar todos os registros do BD
const  selectAllContato = async function() {

    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    const rsContatos = await prisma.$queryRaw `select * from tblcontato`;
    // const allUsers = prisma.user.findMany;
    if(rsContato.length > 0)
       return rsContatos;
    else
       return false;

    
}

//função para listar todos os registros do BD
const  selectByIdContato = async function(id) {
   
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    const sql = "select * from tblcontato where id="+id;

    const rsContato = await prisma.$queryRawUnsafe(sql) ;
    // const allUsers = prisma.user.findMany;
 
    if(rsContato.length > 0)
        return rsContato;
    else
        return false;
}


//torna as funções globais para serem utilizadas em outros arquivos
module.exports = {
                    insertContato,
                    updateContato,
                    deleteContato,
                    selectAllContato,
                    selectByIdContato
                };
