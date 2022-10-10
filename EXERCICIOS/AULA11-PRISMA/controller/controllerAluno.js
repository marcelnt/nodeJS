
//função para inserir um novo registro no BD
const novoAluno = async function(dados) {
    let status = false;
    

    if (dados.nome == '' || dados.email == '' || dados.foto == '' || dados.nome == undefined || dados.email == undefined || dados.foto == undefined)
        status = 499; //Erro Interno "Campos obrigatórios"
    else if (!dados.email.includes("@"))
        status = 498; //Erro Interno "Email inválido"
    else
    {
        //import do arquivo de funções
        const aluno = require('../model/DAO/aluno.js');
        const result = await aluno.insertAluno(dados);

        if(result)
            status = true;
    
    }

    return status;

}


//função para listar todos os registros do BD
const listarAlunos = async function() {
    //import do arquivo de funções
    const aluno = require('../model/DAO/aluno.js');

    result = await aluno.selectAllAlunos();

    return result;
  
}

//função para listar todos os registros do BD
const buscarAluno = async function(id) {
    //import do arquivo de funções
    const aluno = require('../model/DAO/aluno.js');

    result = await aluno.selectAllAlunos();

    return result;
  
}
module.exports = {
    listarAlunos,
    buscarAluno,
    novoAluno
}