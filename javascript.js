//https://api.openweathermap.org/data/2.5/weather?q=japan&appid=af19fa1cb440a47653de8fd5d527fc63
const apiKey = "af19fa1cb440a47653de8fd5d527fc63";
const apiUrl =  "https://api.openweathermap.org/data/2.5/weather?units=metric";
var currentTimer = null;

async function getWeather(){
    const navText = document.getElementById('navText');
    const input = navText.value;
    const url = `${apiUrl}&q=${input}&appid=${apiKey}&_=${Date.now()}`;
    
    alert(url);
    let data = await verifyWeather(url);

    let currentCity = document.getElementById('loc').innerHTML;

    defaultNavText(navText);

    if(!data || !data.dt || !data.timezone){
            navText.style.backgroundColor = "#DD210F";
            navText.style.color = "#FFFFFF";
            navText.placeholder = "This city doesn't exist...";
        return;
    }
    
    let loc = data.name +"";
    let temp = data.main.temp + "°C";
    let humidity = data.main.humidity + "%";
    let windSpeed = data.wind.speed + "km/h";
    let weather = data.weather[0].main;

    if(currentCity != loc){

        if(currentTimer){
            clearInterval(currentTimer);
            currentTimer = null;
        }

        let dateObj = new Date(data.dt * 1000);
        let timezoneOffset = (data.timezone / 3600);
    
        let formatedHour = formateTime(dateObj.getUTCHours() + timezoneOffset);
    
        clock(dateObj,timezoneOffset);
    
        alterData(loc,temp,humidity,windSpeed, weather, formatedHour);
    }
 
}


async function alterData(loc, temp, humidity, windSpeed, weather, currentHour){
    let background = document.body;
    let weatherSection = document.getElementById('weatherSection');
    let image = document.getElementById('image');
    let weatherImg = document.querySelectorAll('.weatherImg');

    image.style.display = 'initial';

    weatherImg.forEach(img => {
        img.style.display = 'initial';
    });

    document.getElementById('loc').innerHTML = loc;
    document.getElementById('temp').innerHTML = temp;
    document.getElementById('humidity').innerHTML = humidity;
    document.getElementById('wind').innerHTML = windSpeed;

    let timeOption = discoverLocalTime(parseInt(currentHour));
    
    alert(weather);
    alert(timeOption);

    if(weather == "Drizzle"){
        weather = "Rain";
    } 
    if(weather == "Haze" || weather == "Smoke" || weather == "Fog" || weather == "Dust" 
        || weather == "Sand" || weather == "Ash" || weather == "Squall" || weather == "Tornado"){
        weather = "Mist";
    }


    switch (weather) {
        case "Clear":
            if(timeOption == "Day"){
                background.style.backgroundImage = 'linear-gradient(to top,#FFFFFF,#5CC2FD)';
                weatherSection.style.backgroundImage = 'linear-gradient(#D9EAF4,#5EB8ED)';
                image.src = "/assets/Sunday-Clear.svg";
                
            }
            if(timeOption == "Night"){
                background.style.backgroundImage = 'linear-gradient(to top,#0C6AA0,#000304)';
                weatherSection.style.backgroundImage = 'linear-gradient(#06527E,#1D1B1B)';
                image.src = "/assets/MoonNight-Clear.svg";
            }

            break;
        
        case "Clouds":
            if(timeOption == "Day"){
                background.style.backgroundImage = 'linear-gradient(to top,#9BB5C5,#435356)';
                weatherSection.style.backgroundImage = 'linear-gradient(#BEE6EF,#303F4E)';
                image.src = "assets/CloudyDay.svg";
            }
            if(timeOption == "Night"){
                background.style.backgroundImage = 'linear-gradient(to top,#49555C,#000000)';
                weatherSection.style.backgroundImage = 'linear-gradient(#8D95A8,#161621)';
                image.src = "assets/CloudyNight.svg";
            }
        
            break;

        case "Rain":
            if(timeOption == "Day"){
                background.style.backgroundImage = 'linear-gradient(to top,#B2D0DD,#075980)';
                weatherSection.style.backgroundImage = 'linear-gradient(#86B1CA,#005C91)';
                image.src = "assets/RainDay.svg";
            }
            if(timeOption == "Night"){
                background.style.backgroundImage = 'linear-gradient(to top,#000681,#000000)';
                weatherSection.style.backgroundImage = 'linear-gradient(#015382,#08113F)';
                image.src = "assets/RainNight.svg";
            }
            
            break;

        case "Thunderstorm":
            if(timeOption == "Day"){
                background.style.backgroundImage = 'linear-gradient(to top,#7E6ECF,#02167A)';
                weatherSection.style.backgroundImage = 'linear-gradient(#9C90F0,#142C98)';
                image.src = "assets/Storm.svg";
            }
            if(timeOption == "Night"){
                background.style.backgroundImage = 'linear-gradient(to top,#2F3352,#000000)';
                weatherSection.style.backgroundImage = 'linear-gradient(#33394C,#000000)';
                image.src = "assets/Storm.svg";
            }
            
            break;

        case "Snow":
            background.style.backgroundImage = 'linear-gradient(to top,#FFFFFF,#00A2FF)';
            weatherSection.style.backgroundImage = 'linear-gradient(#D6F0FF,#00AEFF)';
            image.src = "assets/Snowing.svg";

            break;

        case "Mist":
            background.style.backgroundImage = 'linear-gradient(to top,#DDE8EB,#6F99A3)';
            weatherSection.style.backgroundImage = 'linear-gradient(#ADD3D5,#65AFB5 )';
            image.src = "assets/HazeMist.svg";

            break;
        default:
        break;
    }
}


async function verifyWeather(url){
    try {
        let response = await fetch(url);
        if(!response.ok){
            throw new Error(`Error on the requisition: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.log(error);
    }
    
}

async function clock(dateObj, timezoneOffset) {

    if(currentTimer == null){
        currentTimer = setInterval(() => {
            
            dateObj.setSeconds(dateObj.getSeconds() +1);    
    
            let currentHour = dateObj.getUTCHours() + timezoneOffset;
            let currentMinutes = dateObj.getUTCMinutes();
            let currentSeconds = dateObj.getUTCSeconds();
    
            if (currentHour >= 24) currentHour -= 24;
            if (currentHour < 0) currentHour += 24;
    
            let formatedHour = formateTime(currentHour);
            let formatedMinutes = formateTime(currentMinutes);
            let formatedSeconds = formateTime(currentSeconds);
        
            let currentTime = `${formatedHour}:${formatedMinutes}:${formatedSeconds}`;
            document.getElementById('timer').innerHTML = currentTime;
            
        },1000);
    }
}

function discoverLocalTime(currentHour) {
    let option = "";

    if (currentHour >= 6 && currentHour <= 19) {
        option = "Day";
    }
    if (currentHour < 6 || currentHour > 19) {
        option = "Night";
    }
    return option;
}

function formateTime(time){
    let formatedTime = time.toString().padStart(2,'0');

    return formatedTime;
}


function defaultNavText(navText){
    navText.style.backgroundColor = "#EBF1FD";
    navText.style.color = "#252a2ddd";
    navText.placeholder = "Type the desired city...";
}