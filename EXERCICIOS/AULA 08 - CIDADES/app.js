const { getEstados, getEstado } = require ('./modulo/estados.js');
const { getEstadosCidade, getCidades } = require ('./modulo/cidades.js');

// let estado =  getEstado('SP');

// if (estado)
//     console.log(estado);
// else
//     console.log('Não foi possivel encontrar o estado.');


let estados = getEstadosCidade();
console.log(estados);

// let cidades = getCidades('SPd');
// console.log(cidades);