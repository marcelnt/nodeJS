console.log('Calculo de médias');

var readline = require('readline');

var entrada = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

entrada.question("Digite o nome do aluno:\n",  function(nome) {
    let nomeAluno = nome.toUpperCase();
        entrada.question("Digite a nota 1:\n",  function(valor) {
            let nota1 = parseFloat(valor);
            
            entrada.question("Digite a nota 2:\n",  function(valor) {
                let nota2 = parseFloat(valor); 

                entrada.question("Digite a nota 3:\n",  function(valor) {
                    let nota3 = parseFloat(valor); 

                    entrada.question("Digite a nota 4:\n",  function(valor) {
                        let nota4 = parseFloat(valor);

                        if(nomeAluno == "" || isNaN(nota1) || isNaN(nota2) || isNaN(nota3) || isNaN(nota4))
                        {
                            console.log("Dados inválidos");
                            entrada.close();
                        }else{
                            let media = (nota1 + nota2 + nota3 + nota4)/4;

                            if(media < 3)
                            {
                                console.log("Aluno [" +nomeAluno + "] reprovado por média: " + media.toFixed(1));
                            }else if(media <5){
                                console.log("Aluno [" +nomeAluno + "] de exame, sua média final foi: " + media.toFixed(1));
                            }else if(media >=5){
                                console.log("Aluno [" +nomeAluno + "] Aprovado com média: " + media.toFixed(1));
                            }

                            entrada.close();
                        }

                    });
                });
            });    
        });
});