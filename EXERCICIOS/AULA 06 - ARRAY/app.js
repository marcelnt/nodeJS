//Declarar um array (que já é considerado como um objeto)
var lista = [];
var lista2 = [10, 20, 30, 50, 100];
var lista3 = ["José", 20, true];

//verificando o tipo de dados do array
console.log('Verificar tipo de dados de um array');
console.log(typeof(lista));
console.log(typeof(lista2));
console.log(typeof(lista3));

console.log('Verificar tipo de dados de um elemento do array');
console.log(typeof(lista3[0])); // string
console.log(typeof(lista3[1])); //inteiro
console.log(typeof(lista3[2])); //bool

//contar a qtde de itens de um array
console.log('Contar itens de um array')
console.log(lista.length);
console.log(lista2.length);
console.log(lista3.length);

//acessando itens
console.log('Acessar itens de um array')

console.log(lista2[2]);
console.log(lista3[0]);

console.log(lista3[lista3.length-1]); //acessando o ultimo elemento do array

//Utilizando laços de repetição
//While
console.log('\n#### while ####\n')
let cont = 0;
while (cont <= lista3.length -1)
{
    console.log('O item '+ cont + ' do array é '+ lista3[cont]);
    cont+=1;
}
//For
console.log('\n#### for ####\n')

for (cont = 0; cont <= lista3.length -1; cont++)
{
    console.log('O item '+ cont + ' do array é '+ lista3[cont]);
}
//For each
const exibir = function()
{
    console.log('\n#### for each ####\n')

    lista3.forEach(function (item, cont)
    {
        console.log('O item '+ cont + ' do array é '+ item);
    });
}
//Adicionando item no final do array
lista3.push('Maria');
lista3.push(20.5);

exibir();

//remover o ultimo item do array
lista3.pop();
exibir();

//adicionar item no inicio do array
lista3.unshift('testando o array');
exibir();

//remover do inicio do array
lista3.shift();
exibir();

//procurando elementos de um array
let item = lista3.push('José');
console.log(item); //????????

let posicao = lista3.indexOf('José');
console.log('indice:' + posicao);

//remover item pela posicao
console.log(lista3);
lista3.splice(1, 2); // a partir da posição x, remove tantos itens
console.log(lista3);


lista3.splice(2); //remove apenas aquele item da posição
console.log(lista3); 

//copiar a estrutura de um array
let lista4 = lista3.slice();
console.log(lista4); 

//array dentro de outro array
let cidades = ['Barueri', 'Jandira', 'Osasco', 'Itapevi'];

let cadastro = ['José', '011977777', cidades];

console.log(cadastro);
console.log(cadastro[2]);

cont = 0 
while (cont <= cadastro[2].length-1)
{
    console.log('As cidades são:' + cadastro[2][cont]);
    cont+=1;
}


