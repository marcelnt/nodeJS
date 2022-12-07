/* Constantes para mensagens de erro do sistema */
const MESSAGE_ERROR = {
    BODY_NULL             : 'Corpo da mensagem não pode ser vazio!!',
    CONTENT_TYPE_JSON     : 'Cabeçalho permitido apenas para [application/json]!',
    NOT_CREATE_ITEM       : 'Não foi possivel inserir o item no banco de dados, verifique se todos os os dados foram enviados corretamente!',
    NOT_UPDATE_ITEM       : 'Não foi possivel alterar o item no banco de dados, verifique se todos os os dados foram enviados corretamente!',
    FIELDS_NULL           : 'Não foi possivel realizar esta requisição pois existem campos no body da mensagem que são obrigatórios!',
    INVALID_EMAIL         : 'Não foi possivel realizar esta requisição pois o email informado não é válido!'
}

/* Constantes para mensagens de sucesso do sistema */
const MESSAGE_SUCCESS = {
    INSERT_ITEM     : 'Item criado com sucesso!',
    UPDATE_ITEM     : 'Item atualizado com sucesso!',
    DELETE_ITEM     : 'Item excluido com sucesso!'
}


module.exports = {
    MESSAGE_ERROR,
    MESSAGE_SUCCESS
}