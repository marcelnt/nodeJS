'use strict'
const listMessage = async function () {
    
    const url = 'http://localhost:8080/description';
    const response = await fetch(url);
    const dados = await response.json();

    
    return dados;


};


const createCard = async function () {
    const dados = await listMessage();
    const obj = document.querySelector('#message');
    const card = [];

    dados.description.forEach(element => {
        
        let item = `<div class="icone imagePosition"></div>
                    <div class="card acessibilidade">
                        <span> ${element.data_hora} </span>
                        <p>${element.texto}</p>
                    </div>`
        
        card.push(item)

        
    });

    obj.innerHTML = card.reverse().join('');
}



