import './index.css';

async function getWeatherData(location) {
    const apiCall = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=f4d3afe8690a5aa5fefaddb6259abf79`;
    const response = await fetch(apiCall);
    const weatherData = await response.json();
    return weatherData;
}

function formatDate(date) {
    const dateOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    };
    let dateString = new Date(date * 1000).toLocaleString('en-US', dateOptions).split(',');
    dateString.splice(1, 0, ',');
    dateString = dateString.join('');
    return dateString;
}

function formatTime(date) {
    const timeOptions = { hour: 'numeric', minute: 'numeric' };
    const currentTime = new Date(date * 1000).toLocaleString('en-US', timeOptions);
    return currentTime;
}

function convertCelcius(temp) {
    const celcius = temp - 273.15;
    return celcius.toFixed(2);
}

function displayData(weatherData) {
    const weatherLocation = document.querySelector('#weather-location');
    weatherLocation.textContent = weatherData.name;

    const weatherDate = document.querySelector('#weather-date');
    weatherDate.textContent = formatDate(weatherData.dt);

    const weatherTime = document.querySelector('#weather-time');
    weatherTime.textContent = formatTime(weatherData.dt);

    const weatherDescription = document.querySelector('#weather-description');
    weatherDescription.textContent = weatherData.weather[0].description;

    const weatherIcon = document.querySelector('#weather-icon');
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    weatherIcon.alt = weatherData.weather[0].main;

    const weatherTemp = document.querySelector('#weather-temperature');
    weatherTemp.textContent = `${convertCelcius(weatherData.main.temp)} °C`;

    const feelsLike = document.querySelector('#feels-like-data');
    feelsLike.textContent = `${convertCelcius(weatherData.main.feels_like)} °C`;

    const humidity = document.querySelector('#humidity-data');
    humidity.textContent = `${weatherData.main.humidity} %`;

    const windSpeed = document.querySelector('#wind-speed-data');
    windSpeed.textContent = `${weatherData.wind.speed} km/h`;
}

async function init() {
    const weatherData = await getWeatherData('tokyo');
    displayData(weatherData);
}

const weatherForm = document.querySelector('#weather-form');
const locationInput = document.querySelector('#location-input');
weatherForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const location = locationInput.value;
    const weatherData = await getWeatherData(location);
    // console.log(weatherData);
    displayData(weatherData);
});

init();
