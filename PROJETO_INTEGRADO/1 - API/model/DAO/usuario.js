/*************************************************************************************************************************************
*   Projeto: Pizzaria   
*   Objetivo: Model de produtos => Permite administrar os produtos da Pizzaria no Banco de Dados
*   Autor: Marcel
*   Data criação: 22/07/2022
*   
**************************************************************************************************************************************/

// função para inserir um novo registro no BD
const insertUsuario = async function(usuario) {
    let status = false;

    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    const sql = "insert into tblUsuario (nome, usuario, senha) values ('"+usuario.nome+"', '"+usuario.usuario+"', '"+usuario.senha+"')";
    const result = await prisma.$executeRawUnsafe (sql);

    if (result)
        status = true;
    
    return status;

}

//função para atualizar um registro no BD
const updateUsuario = async function(usuario) {
    let status = false;

    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    const sql = "update tblProduto set nome = '"+usuario.nome+"', icone='"+usuario.icone+"' where id = " + usuario.id;
    const result = await prisma.$executeRawUnsafe (sql);

    if (result)
        status = true;
    
    return status;
   
}

//função para apagar um registro no BD
const deleteUsuario = async function(id) {
    let status = false;

    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    const sql = "delete from tblUsuario where id="+id;
    const result = await prisma.$executeRawUnsafe (sql);

    if (result)
        status = true;
    
    return status;
}

//função para listar todos os registros do BD
const  selectAllUsuario = async function(rows, page) {

    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    if (rows > 0 && page == 0)
        sql = "select * from tblUsuario limit "+rows;
    else if (rows > 0 && page > 0) 
        sql = "select * from tblUsuario limit "+rows+" offset "+page;
    else
        sql = "select * from tblUsuario";
  
    //const rsProduto = await prisma.$queryRaw `select * from tblProduto`;
    const rsUsuario = await prisma.$queryRawUnsafe (sql);
    // const allUsers = prisma.user.findMany;
    if(rsUsuario.length > 0)
       return rsUsuario;
    else
       return false;

    
}

//função para listar todos os registros do BD
const  selectByIdUsuario = async function(id) {
   
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    const sql = "select * from tblUsuario where id="+id;

    const rsUsuario = await prisma.$queryRawUnsafe(sql) ;
    // const allUsers = prisma.user.findMany;
 
    if(rsUsuario.length > 0)
        return rsUsuario;
    else
        return false;
}

//função para Localizar o ultimo registros do BD
const  selectByLastUsuario = async function() {
   
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    const sql = "select * from tblUsuario order by id desc limit 1";

    const rsUsuario = await prisma.$queryRawUnsafe(sql) ;
    // const allUsers = prisma.user.findMany;
 
    if(rsUsuario.length > 0)
        return rsUsuario;
    else
        return false;
}


//função para listar todos os registros do BD
const  selectByAutenticUsuario = async function(dados) {
   
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    const sql = "select * from tblUsuario where usuario='"+dados.usuario+ "' and senha='"+dados.senha+"'" ;

    const rsUsuario = await prisma.$queryRawUnsafe(sql) ;
    // const allUsers = prisma.user.findMany;
 
    if(rsUsuario.length > 0)
        return rsUsuario;
    else
        return false;
}

//torna as funções globais para serem utilizadas em outros arquivos
module.exports = {
                    insertUsuario,
                    updateUsuario,
                    deleteUsuario,
                    selectAllUsuario,
                    selectByIdUsuario,
                    selectByLastUsuario,
                    selectByAutenticUsuario
                };
