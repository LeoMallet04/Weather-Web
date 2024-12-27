//https://api.openweathermap.org/data/2.5/weather?q=japan&appid=af19fa1cb440a47653de8fd5d527fc63

const apiKey = "af19fa1cb440a47653de8fd5d527fc63";
const apiUrl =  "https://api.openweathermap.org/data/2.5/weather?units=metric";

async function verifyWeather(){
    try {
        var city = "moscow";
        const response = await fetch(apiUrl + "&q="+city + '&appid='+apiKey );
        var data = await response.json();
        console.log(data);
        var name = data.name
        var temp = data.main.temp + "°C";
        var humidity = data.main.humidity + "%";
        var windSpeed = data.wind.speed + "km/h";
        var weather = data.weather[0].main
        console.log(name+ "\n" + weather +"\n" + temp + "\n" + humidity + "\n" + windSpeed);
        
    } catch (error) {
        console.log(error);
    }
    
}

function main(){
    
}




