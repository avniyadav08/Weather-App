function weatherEmoji(condition) {
    const cond = condition.toLowerCase();
    if (cond.includes("clear")) return "☀️";
    if (cond.includes("cloud")) return "☁️";
    if (cond.includes("rain")) return "🌧️";
    if (cond.includes("thunder")) return "⛈️";
    if (cond.includes("snow")) return "❄️";
    if (cond.includes("mist") || cond.includes("fog")) return "🌫️";
    return "🌈";
}

function setWeatherBackground(condition){
    const codn=condition.toLowerCase();
    const body=document.querySelector(".weather");

    if(codn.includes("clear"))
        body.style.background="linear-gradient(to right, #fceabb, #f8b500)";
    else if(codn.includes("cloud"))
        body.style.background="linear-gradient(to right, #a1c4fd, #c2e9fb)";
    else if(codn.includes("rain"))
        body.style.background="linear-gradient(to right, #4e54c8, #8f94fb)";
    else if(codn.includes("thunder"))
        body.style.background="linear-gradient(to right, #3a3a3a, #0f2027)";
    else if(codn.includes("snow"))
        body.style.background="linear-gradient(to right, #e0eafc, #cfdef3)";
    else
        body.style.background="linear-gradient(to right, #a1c4fd, #c2e9fb)";

}


async function getWeather() {
    const city = document.getElementById('cityname').value;
    const api_keys = 'af9582de5baf552d53bd50d7b9f11369';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_keys}&units=metric`;

    const weatherResult = document.getElementById('weatherResult');
    weatherResult.innerHTML = "🌐 Fetching data...."

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            const temp = data.main.temp;
            const condition = data.weather[0].description;
            const cityName = data.name;
            const humidity=data.main.humidity;
            const wind=data.wind.speed;
            const emoji=weatherEmoji(condition);

            setWeatherBackground(condition);

            weatherResult.innerHTML = `
            <div class="card">
                <h2>${emoji} ${condition}</h2>
                <p>📍<strong> City:</strong> ${cityName}</p>
                <p>🌡️<strong> Temperature:</strong> ${temp} °C</p>
                <p>💧<strong>Humidity:</strong> ${humidity}%</p>
                <p>🌬️ <strong>Wind:</strong> ${wind} m/s</p>
            </div>
            `;
        } else {
            weatherResult.innerHTML = 'Alas! 😕 City not found...';
        }
    } catch (error) {
        weatherResult.innerHTML = "⚠️Something went wrong";
    }
}

