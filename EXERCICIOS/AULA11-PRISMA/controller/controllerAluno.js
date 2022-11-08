
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
        const aluno      = require('../model/DAO/aluno.js');
        const alunoCurso = require('../model/DAO/alunoCurso.js');

        const result = await aluno.insertAluno(dados);

        if(result)
        {
            let dadosAlunoCurso = {} ;

            let id_aluno = await aluno.selectLastIdAluno();
            let id_curso = dados.curso[0].id;
            

            dadosAlunoCurso.id_aluno = id_aluno;
            dadosAlunoCurso.id_curso = id_curso;

            const resultAlunoCurso = await alunoCurso.insertAlunoCurso(dadosAlunoCurso);

            if (resultAlunoCurso)
                status = true;

        }
    
    }

    return status;

}


//função para listar todos os registros do BD
const listarAlunos = async function() {
    // const dadosAlunos = [];
    //import do arquivo de funções
    const aluno = require('../model/DAO/aluno.js');
    const alunoCurso = require('../model/DAO/alunoCurso.js');

    result = await aluno.selectAllAlunos();

    // result.forEach(async item =>  {
    //     //return Promise(async function (dadosAlunos){
    //         const dadosCursoAluno = await alunoCurso.selectCursosByAluno(item.id);
    //         item.curso = dadosCursoAluno;
        
    //         dadosAlunos.push(item);
            
            
    //     //});
    // });

    //Precisamos trocar o  foreach pelo map pois neste exemplo precisamos retornar um novo objeto com o resultado do foreach (não retorna valor)
    const dadosAlunos = result.map(async item =>  {
            const dadosCursoAluno = await alunoCurso.selectCursosByAluno(item.id);
            if (dadosCursoAluno)
                item.curso = dadosCursoAluno;
            else
                item.curso = "Nenhum curso encontrado."
        
            return item;
    });

    //await foi utilizado para fazer com que a promessa seja realizada, porém como a variavel item esta também sendo executado como uma promessa então colocamos Promisse all()
    return await Promise.all(dadosAlunos) ;
  
}

//função para listar todos os registros do BD
const buscarAluno = async function(id) {
    let result = {};
    
    //import do arquivo de funções
    const aluno = require('../model/DAO/aluno.js');
    const alunoCurso = require('../model/DAO/alunoCurso.js');

    const dadosAluno = await aluno.selectByIdAluno(id);

    const dadosCursoAluno = await alunoCurso.selectCursosByAluno(id);

    // dadosAluno = JSON.stringify(dadosAluno);
    dadosAluno[0].cursos = dadosCursoAluno;

    // result.aluno = dadosAluno;
    // console.log (dadosAluno);

    return dadosAluno[0];
  
}
module.exports = {
    listarAlunos,
    buscarAluno,
    novoAluno
}