const jwt = require('jsonwebtoken');
const SECRET = 'a1b2c3';
const EXPIRES = 60;

//Criação da chava JWT
const createJWT = async function(payLoad)
{
    //Gera o token JWT, que é composto por 3 partes:
            //payload é passado uma dado de chave para identificar quem é a pessoas que esta se autenticando
            //Chave de autenticação que é a senha
            //tempo de expiração do token
    const token = jwt.sign({userID: payLoad}, SECRET, {expiresIn: EXPIRES});
    
    return token;
}

//Verificação do JWT
const verifyJWT = async function(token)
{
    let statusVerify = false;
    //Verifica se o token recebido na aplicação é válido
    jwt.verify(token, SECRET, async function (err, decoded) {
        //console.log(err)
        if (err)
            statusVerify = false;
        else
            // return decoded.userID;
            statusVerify = true;
    });

    return statusVerify;
}

module.exports = {
    createJWT,
    verifyJWT
}