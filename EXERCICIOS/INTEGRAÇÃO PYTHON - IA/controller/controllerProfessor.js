
//função para listar todos os registros do BD
const listDescriptions = async function() {
    //import do arquivo de funções
    const description = require('../model/DAO/professor.js');

    result = await description.selectAllDescription();
    //result = await description.AllDescription();

    return result;
  
}


module.exports = {
    listDescriptions

}