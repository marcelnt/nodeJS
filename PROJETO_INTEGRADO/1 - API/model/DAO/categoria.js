

// função para inserir um novo registro no BD
const insertCategoria = async function(categoria) {
    let status = false;

    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    const sql = "insert into tblCategoria (nome, icone) values ('"+categoria.nome+"', '"+categoria.icone+"')";
    const result = await prisma.$executeRawUnsafe (sql);

    if (result)
        status = true;
    
    return status;

}

//função para atualizar um registro no BD
const updateCategoria = async function(categoria) {
    let status = false;

    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    const sql = "update tblCategoria set nome = '"+categoria.nome+"', icone='"+categoria.icone+"' where id = " + categoria.id;
    const result = await prisma.$executeRawUnsafe (sql);

    if (result)
        status = true;
    
    return status;
   
}

//função para apagar um registro no BD
const deleteCategoria = async function(id) {
    let status = false;

    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    const sql = "delete from tblCategoria where id="+id;
    const result = await prisma.$executeRawUnsafe (sql);

    if (result)
        status = true;
    
    return status;
}

//função para listar todos os registros do BD
const  selectAllCategoria = async function() {

    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    const rsCategoria = await prisma.$queryRaw `select * from tblCategoria`;
    // const allUsers = prisma.user.findMany;
    if(rsCategoria.length > 0)
       return rsCategoria;
    else
       return false;

    
}

//função para listar todos os registros do BD
const  selectByIdCategoria = async function(id) {
   
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    const sql = "select * from tblCategoria where id="+id;

    const rsCategoria = await prisma.$queryRawUnsafe(sql) ;
    // const allUsers = prisma.user.findMany;
 
    if(rsCategoria.length > 0)
        return rsCategoria;
    else
        return false;
}

//função para Localizar o ultimo registros do BD
const  selectByLastCategoria = async function() {
   
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    const sql = "select * from tblCategoria order by id desc limit 1";

    const rsCategoria = await prisma.$queryRawUnsafe(sql) ;
    // const allUsers = prisma.user.findMany;
 
    if(rsCategoria.length > 0)
        return rsCategoria;
    else
        return false;
}


//torna as funções globais para serem utilizadas em outros arquivos
module.exports = {
                    insertCategoria,
                    updateCategoria,
                    deleteCategoria,
                    selectAllCategoria,
                    selectByIdCategoria,
                    selectByLastCategoria
                };
