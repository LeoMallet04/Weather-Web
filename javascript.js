//https://api.openweathermap.org/data/2.5/weather?q=japan&appid=af19fa1cb440a47653de8fd5d527fc63

const apiKey = "af19fa1cb440a47653de8fd5d527fc63";
const apiUrl =  "https://api.openweathermap.org/data/2.5/weather?units=metric";

async function getWeather(){
    const input = document.getElementById('navText').value;
    alert(input);
    await verifyWeather(input);


    // document.getElementById('navButton').addEventListener("click", function(){
    //     input = document.getElementById('navText').innerHTML;
    //     alert("Input1"+input);
    // });
    // alert("Input2"+ input);
    // verifyWeather(input);
}

async function verifyWeather(str){
    try {
        let response = await fetch(apiUrl + "&q="+str+ "&appid="+apiKey );
        var data = await response.json();
        var name = data.name;
        var temp = data.main.temp + "°C";
        var humidity = data.main.humidity + "%";
        var windSpeed = data.wind.speed + "km/h";
        var weather = data.weather[0].main;
        alert(name+ "\n" + weather +"\n" + temp + "\n" + humidity + "\n" + windSpeed);

    } catch (error) {
        console.log(error);
    }
    
}






