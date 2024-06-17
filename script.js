document.getElementById('searchBtn').addEventListener('click', getWeather);

function getWeather() {
    const city = document.getElementById('cityInput').value.trim();
    if (city === '') {
        document.getElementById('weatherContainer').style.display = 'none';
        return;
    }

    const apiKey = '79c41404582859204e6e0ca5f7819f0a'; // Your updated API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => displayWeather(data))
        .catch(error => {
            const weatherContainer = document.getElementById('weatherContainer');
            weatherContainer.innerHTML = `<p>Error: ${error.message}</p>`;
            weatherContainer.style.display = 'block';
        });
}

function displayWeather(data) {
    const weatherContainer = document.getElementById('weatherContainer');
    weatherContainer.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p style="font-size: 24px;">Temperature: ${data.main.temp} °C</p>
        <p>Weather: ${getWeatherIcon(data.weather[0].main)} ${data.weather[0].description}</p>
        <p style="font-size: 14px;">Humidity: ${data.main.humidity}%</p>
        <p style="font-size: 14px;">Wind Speed: ${data.wind.speed} m/s</p>
    `;
    weatherContainer.style.display = 'block';
}

function getWeatherIcon(weather) {
    switch (weather.toLowerCase()) {
        case 'clear':
            return '<i class="fas fa-sun"></i>';
        case 'clouds':
            return '<i class="fas fa-cloud"></i>';
        case 'rain':
            return '<i class="fas fa-cloud-rain"></i>';
        case 'snow':
            return '<i class="fas fa-snowflake"></i>';
        default:
            return '<i class="fas fa-cloud"></i>';
    }
}
