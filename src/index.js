import { DateTime } from "luxon";
import {fetchCoordinates} from './coordinates.js';

// import Data from "./config.js";

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const form = document.querySelector(".cityfield");//inputfields
const submitBtn = document.querySelector("#submitcity");

const pressEnter = (event) => {
    const pressedKey = event.key;
    if (pressedKey == "Enter") {
        handleForm();
    }
}
// Add city for API call
const handleForm = () => {
    //to only display the new data, remove childelement(ul) from parenthtml element
    let mainParent = document.querySelector('#card');
    while (mainParent.firstChild) {
        mainParent.removeChild(mainParent.firstChild);
    }
    // Geocode API call to get the coordinates needed for weather API
    fetchCoordinates(form.value);
}
const fetchWeatherData = (lat, long) => {
    fetch ("https://api.openweathermap.org/data/2.5/onecall?lat="+ lat + "&lon=" + long + "&units=metric" + "&appid=a790165930e5b592de2330f642ceff0c")
        .then(response => response.json())
        .then(data => {// data = the whole data fetched from the API.
            console.log(data)
            const dailyWeather8 = data.daily;//array of 8 objects. Objects are the weatherinfo per day.
            const dailyWeather5 = dailyWeather8.slice(0, 5);//takes the first 5 objects of the array above starting from position 0.
            const mainHtml = document.querySelector('#card');
            for (let day of dailyWeather5) {
                createDay(mainHtml, day); //refers to the function createDay
            }
        })
}
              
// function pre-creating html elements
const createElement = (tagN, idN, classN, source, innerHtml, parent) => {
    const tagName = document.createElement(tagN);
    tagName.id = idN;
    tagName.className = classN;
    tagName.src = source;
    tagName.innerHTML = innerHtml;
    parent.appendChild(tagName);

    return tagName;
};

// function creating proper html elements for each day
const createDay = (mainHtml, day) => {
    const windDirectionDegree = day.wind_deg;
    const windSpeed = day.wind_speed;
    const precipitationProb = day.pop;
    const humidity = day.humidity;
    const unixDate = day.dt;
    const dateJSconversion = new DateTime(unixDate*1000);
    console.log(dateJSconversion);
    const weekDay = dateJSconversion.getDay;
    console.log(weekDay)
    const dateDDMMYY = dateJSconversion.setLocale('en-BE').toLocaleString();

    const dayOfWeek = weekdays[weekDay];
    console.log(dayOfWeek);

    const date = dateDDMMYY;
    const minTemp = day.temp.min;
    const maxTemp = day.temp.max;
    const weatherIcon = day.weather[0].icon;

    const ulList = createElement('ul', null, 'daily-card','', '', mainHtml);

    const firstSection = createElement('section', 'card-head', '', '', '', ulList);
    
    const iconLi = createElement('li', '', 'weather-icon','', '', firstSection);
    
    createElement('img', '', 'icon', "http://openweathermap.org/img/wn/" + weatherIcon +"@2x.png", '', iconLi);
    
    createElement('li', '', 'day', '', dayOfWeek + "<br>" + date + "<br>" + "<span>" + Math.round(minTemp) + 
    "°/ " + Math.round(maxTemp) + "°" + "</span>", firstSection);

    const secondSection = createElement('section', 'card-body', '', '', '', ulList);

    createElement('li', '', 'humidity', '',"Humidity " + humidity + "%", secondSection);

    createElement('li', '', 'precipitation-prob', '', "Rain " + precipitationProb + "%", secondSection);

    createElement('li', '', 'wind-speed', '', "Wind " + Math.round(windSpeed) + " km/h", secondSection);

    createElement('li', '', 'wind-direction', '', "Wind.d. " + windDirectionDegree, secondSection);
}
// event listeners are the start of the whole operation, needs to be below. 
// Then display from top to bottom in order of occurrence the steps needed to produce final browser result.
submitBtn.addEventListener('click', handleForm);

form.addEventListener('keydown', pressEnter);

export {fetchWeatherData};

 //TODO: try with html template literal. Don't forget ; after closing backtick?
//TODO: transform wind-degrees in compass (letters)
