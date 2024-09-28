const data = 'https://api.openweathermap.org/data/2.5/weather?q=Porto Alegre&appid=a510d6f748149777617549e156ce784f';

async function verificaTempo() {
    try {
        const resultado = await fetch(data);
        const dados = await resultado.json();
        console.log(dados);
    } catch (error) {
        
    }
}   

verificaTempo();