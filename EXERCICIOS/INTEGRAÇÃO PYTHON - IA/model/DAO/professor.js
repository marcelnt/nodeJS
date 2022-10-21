


//função para listar todos os registros do BD
const  selectAllDescription = async function() {

    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    sql = "select id, texto, date_format(data_hora, '%d/%m/%Y %k:%i') as data_hora from tbl_fala order by data_hora";
  
    //const rsCategoria = await prisma.$queryRaw `select * from tblCategoria`;
    const rsDesc = await prisma.$queryRawUnsafe (sql);

    //prisma.$disconnect();

    if(rsDesc.length > 0)
       return rsDesc;
    else
       return false;

}

//função para listar todos os registros do BD
const  AllDescription = async function() {

    var dados =  [
            {
                "id"      : "1",
                "texto"   : "teste 123 123"
            },
            {
                "id"      : "2",
                "texto"   : "teste 123 123 456"
            },
            {
                "id"      : "3",
                "texto"   : "teste 123 123 789"
            },
            {
                "id"      : "4",
                "texto"   : "teste 123 123 0123"
            },
            {
                "id"      : "5",
                "texto"   : "teste 123 123 456789123 sjkdfsdk flksdklflk sldfj lsd l flsjdl fjlsldfj lsdjl fjlsdjlf jldjslkjl fjlslf jlskdjlfjlsjdljflsj flsjdf jsldfj sddfjlksdfjlsdjf lsfldjsdl fjsldkjf klsdjf lksdjfl jsldfjl jsldfl jsldj fsdlfj lsdfjlsdlf jlsdlf jsldkfj lskdfjlksdjf kljsldfj "
            },
            {
                "id"      : "6",
                "texto"   : "aaaa aaaaaa"
            },
            {
                "id"      : "7",
                "texto"   : "ccc  bbbbbb"
            }
        ]
    

    return dados;

}

module.exports = {
    selectAllDescription,
    AllDescription

}