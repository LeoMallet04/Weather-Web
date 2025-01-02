//https://api.openweathermap.org/data/2.5/weather?q=japan&appid=af19fa1cb440a47653de8fd5d527fc63
const apiKey = "af19fa1cb440a47653de8fd5d527fc63";
const apiUrl =  "https://api.openweathermap.org/data/2.5/weather?units=metric";

async function getWeather(){
    const input = document.getElementById('navText').value;
    let data = await verifyWeather(input);
    let loc = data.name;
    let temp = data.main.temp + "°C";
    let humidity = data.main.humidity + "%";
    let windSpeed = data.wind.speed + "km/h";
    let weather = data.weather[0].main;
    let clock
    alert(data.dt);
    //alert(loc+ "\n" + weather +"\n" + temp + "\n" + humidity + "\n" + windSpeed + "\n");

    if(document.getElementById('timer').innerHTML == ""){
        clock = convertTimezonetoTime(data.dt, data.timezone);
    }       
    if(document.getElementById('timer').innerHTML != "" && document.getElementById('navText').value != loc){
        clock = convertTimezonetoTime(data.dt, data.timezone);
    }

    
    
  
    alterData(loc,temp,humidity,windSpeed);
    Promise.all(clock);
}


async function alterData(loc, temp, humidity, windSpeed){
    document.getElementById('loc').innerHTML = loc;
    document.getElementById('temp').innerHTML = temp;
    document.getElementById('humidity').innerHTML = humidity;
    document.getElementById('wind').innerHTML = windSpeed;
}


async function verifyWeather(str){
    try {
        let response = await fetch(apiUrl + "&q="+str+ "&appid="+apiKey );
        var data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
    
}


async function convertTimezonetoTime(dt, timezone) {
    let dateObj = new Date(dt * 1000);
    console.log("DT INICIAL: "+dt);
    let timezoneOffset = (timezone / 3600);

    while(true){
        console.log("DT ATUALIZADO:" +dt);
        dateObj.setSeconds(dateObj.getSeconds() +1);    

        let currentHour = dateObj.getUTCHours() + timezoneOffset;
        let currentMinutes = dateObj.getUTCMinutes();
        let currentSeconds = dateObj.getUTCSeconds();

        if (currentHour >= 24) currentHour -= 24;
        if (currentHour < 0) currentHour += 24;

        let formatedHour = currentHour.toString().padStart(2,'0');
        let formatedMinutes = currentMinutes.toString().padStart(2,'0');
        let formatedSeconds = currentSeconds.toString().padStart(2,'0');
    
        let currentTime = `${formatedHour}:${formatedMinutes}:${formatedSeconds}`;
        document.getElementById('timer').innerHTML = currentTime;

        await new Promise((resolve) => setTimeout(resolve, 1000)); 
    }
}
