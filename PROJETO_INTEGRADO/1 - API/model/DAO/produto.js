/*************************************************************************************************************************************
*   Projeto: Pizzaria   
*   Objetivo: Model de produtos => Permite administrar os produtos da Pizzaria no Banco de Dados
*   Autor: Marcel
*   Data criação: 22/07/2022
*   
**************************************************************************************************************************************/

// função para inserir um novo registro no BD
const insertProduto = async function(produto) {
    let status = false;

    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    const sql = "insert into tblProduto (nome, icone) values ('"+Produto.nome+"', '"+Produto.icone+"')";
    const result = await prisma.$executeRawUnsafe (sql);

    if (result)
        status = true;
    
    return status;

}

//função para atualizar um registro no BD
const updateProduto = async function(produto) {
    let status = false;

    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    const sql = "update tblProduto set nome = '"+Produto.nome+"', icone='"+Produto.icone+"' where id = " + Produto.id;
    const result = await prisma.$executeRawUnsafe (sql);

    if (result)
        status = true;
    
    return status;
   
}

//função para apagar um registro no BD
const deleteProduto = async function(id) {
    let status = false;

    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    const sql = "delete from tblProduto where id="+id;
    const result = await prisma.$executeRawUnsafe (sql);

    if (result)
        status = true;
    
    return status;
}

//função para listar todos os registros do BD
const  selectAllProduto = async function(rows, page) {

    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    if (rows > 0 && page == 0)
        sql = "select * from tblProduto limit "+rows;
    else if (rows > 0 && page > 0) 
        sql = "select * from tblProduto limit "+rows+" offset "+page;
    else
        sql = "select * from tblProduto";
  
    //const rsProduto = await prisma.$queryRaw `select * from tblProduto`;
    const rsProduto = await prisma.$queryRawUnsafe (sql);
    // const allUsers = prisma.user.findMany;
    if(rsProduto.length > 0)
       return rsProduto;
    else
       return false;

    
}

//função para listar todos os registros do BD
const  selectByIdProduto = async function(id) {
   
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    const sql = "select * from tblProduto where id="+id;

    const rsProduto = await prisma.$queryRawUnsafe(sql) ;
    // const allUsers = prisma.user.findMany;
 
    if(rsProduto.length > 0)
        return rsProduto;
    else
        return false;
}

//função para Localizar o ultimo registros do BD
const  selectByLastProduto = async function() {
   
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    const sql = "select * from tblProduto order by id desc limit 1";

    const rsProduto = await prisma.$queryRawUnsafe(sql) ;
    // const allUsers = prisma.user.findMany;
 
    if(rsProduto.length > 0)
        return rsProduto;
    else
        return false;
}


//torna as funções globais para serem utilizadas em outros arquivos
module.exports = {
                    insertProduto,
                    updateProduto,
                    deleteProduto,
                    selectAllProduto,
                    selectByIdProduto,
                    selectByLastProduto
                };
