const { getEstados, getEstado } = require ('./modulo/estados.js');

let estado =  getEstado('SPs');

if (estado)
    console.log(estado);
else
    console.log('Não foi possivel encontrar o estado.')