var clientes = [];

const setCliente = function (nomeCliente, telefoneCliente, emailCliente)
{
    let nome = nomeCliente;
    let telefone = telefoneCliente;
    let email = emailCliente;
    let erro = false;

    let novoCliente = [];

    if (nome == '' || telefone == '' || email == '')
    {
        erro = true;
        console.log('Erro: Todos os valores devem ser preenchidos.')
    }
    else if(email.indexOf('@') == -1)
    {
        erro = true;
        console.log('Erro: Email inserido não é válido.')
    }else
    {
        novoCliente.push(nome,telefone,email);
        clientes.push(novoCliente);
        console.log ('Registro inserido com sucesso.')
    }

    if(erro)
        return false;
    else
        return true;

}

module.exports = {
    setCliente
}