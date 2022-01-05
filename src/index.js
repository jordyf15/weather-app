import './index.css';

async function getWeatherData(location) {
    const apiCall = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=f4d3afe8690a5aa5fefaddb6259abf79`;
    const response = await fetch(apiCall);
    const weatherData = await response.json();
    return weatherData;
}

const weatherForm = document.querySelector('#weather-form');
const locationInput = document.querySelector('#location-input');
weatherForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const location = locationInput.value;
    const weatherData = await getWeatherData(location);
    console.log(weatherData);
});
