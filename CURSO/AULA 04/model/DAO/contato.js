
//função para inserir um novo registro no BD
// const insertContato = function(dados) {
//     console.log(dados);
//     const db = require("./conexaoMysql");

//     const conn = await db.connect();
//     const sql = 'INSERT INTO clientes(nome,idade,uf) VALUES (?,?,?);';
//     const values = [customer.nome, customer.idade, customer.uf];
//     if(conn.query(sql, values))
//         return true;
//     else
//         return false;
// }



// //função para atualizar um registro no BD
// const updateContato = function(dados) {
//     console.log(dados);
// }

// //função para apagar um registro no BD
// const deleteContato = function(dados) {
//     console.log(dados);
// }

//função para listar todos os registros do BD
const selectAllContato = function() {
    //import do arquivo de funções
    
    var path = require( 'path' );
    // var homeService = require( path.resolve( 'app' ) );
    var caminho = path.resolve('model/DAO','conexaoMysql.js');
    const connMysql = require(caminho);

    const conexao = connMysql.connect();
    console.log(conexao);


    const [rs] = conexao.query('select * from tblcontatos');
    console.log(rs);
    //return true;
}

// //função para listar todos os registros do BD
// const selectByIdContato = function(dados) {
//     console.log(dados);
//     return false;
// }


//torna as funções globais para serem utilizadas em outros arquivos
// module.exports = {
//                     insertContato,
//                     updateContato,
//                     deleteContato,
//                     selectAllContato,
//                     selectByIdContato
//                 };
module.exports = {
         
                    selectAllContato
                    
                };