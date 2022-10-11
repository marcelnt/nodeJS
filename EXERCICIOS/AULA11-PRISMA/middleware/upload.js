const uploadImagem = async function (objeto){
  
    let arquivo = {status : false};
    let nomeArquivo = objeto.filename;
    let mimeType = objeto.mimetype;
    let size = (objeto.size/1000);

    if(size < 5000)
    {
        if (mimeType == 'image/jpg' || mimeType == 'image/jpeg' || mimeType == 'image/png')
        {
            arquivo = {
                            status  : true,
                            nome    : nomeArquivo
                           };
        }

    }

    return arquivo;
}


module.exports = {
    uploadImagem
}