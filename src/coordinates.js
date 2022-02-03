import {fetchWeatherData} from './index.js';
const fetchCoordinates = (inputCity) => {// const inputCity = form.value
    const getCoordinates = fetch("http://api.openweathermap.org/geo/1.0/direct?q=" +inputCity + "&appid=a790165930e5b592de2330f642ceff0c")
        .then(response => {
            return response.json();
        })
        .then(data => {
            const latitude = data[0].lat;
            const longitude = data[0].lon;
            //API call with coordinates
            fetchWeatherData(latitude, longitude); //refers to the function fetchWeatherData
        })
}
export {fetchCoordinates}; 