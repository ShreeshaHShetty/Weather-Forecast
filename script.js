document.getElementById('searchBtn').addEventListener('click', getWeather);

function getWeather() {
    const city = document.getElementById('cityInput').value.trim();
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
        });
}

function displayWeather(data) {
    const weatherContainer = document.getElementById('weatherContainer');
    weatherContainer.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}
