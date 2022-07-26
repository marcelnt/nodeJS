const jwt = require('jsonwebtoken');
const SECRET = 'a1b2c3';
const EXPIRES = 60;


const createJWT = async function(payLoad)
{
    //Gera o token JWT, que é composto por 3 partes:
            //payload é passado uma dado de chave para identificar quem é a pessoas que esta se autenticando
            //Chave de autenticação que é a senha
            //tempo de expiração do token
    const token = jwt.sign({userID: payLoad}, SECRET, {expiresIn: EXPIRES});
    
    return token;
}


const verifyJWT = async function(token, next)
{

    //Verifica se o token recebido na aplicação é válido
    jwt.verify(token, SECRET, (err, decoded) =>{
        console.log(err);
        console.log(decoded);
        // if (err)
        //     return false;
        // else
        //     return decoded.userID;
        //     next();
    });
}

module.exports = {
    createJWT,
    verifyJWT
}