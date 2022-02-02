// import Data from "./config.js";

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const form = document.querySelector(".cityfield");//inputfields
const submitBtn = document.querySelector("#submitcity");

const pressEnter = (event) => {
    const pressedKey = event.key;
    if (pressedKey == "Enter") {
        handleForm();
    };
}

// Add city for API call
const handleForm = (event) => {
    //to only display the new data, remove childelement(ul) from parenthtml element
    let mainParent = document.querySelector('#card');
    while (mainParent.firstChild) {
        mainParent.removeChild(mainParent.firstChild);
    }
    // Geocode API call to get the coordinates needed for weather API
    fetchCoordinates(form.value);
}
              
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

const fetchWeatherData = (lat, long) => {
    const getWeatherData = fetch ("https://api.openweathermap.org/data/2.5/onecall?lat="+ lat + "&lon=" + long + "&units=metric" + "&appid=a790165930e5b592de2330f642ceff0c")
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
    const dateJSconversion = new Date(unixDate*1000);
    const weekDay = dateJSconversion.getDay();
    const dateDDMMYY = dateJSconversion.toLocaleDateString("en-BE");
    const dayOfWeek = weekdays[weekDay];
    const date = dateDDMMYY;
    const minTemp = day.temp.min;
    const maxTemp = day.temp.max;
    const weatherIcon = day.weather[0].icon;

    const ulList = createElement('ul', null, 'daily-card','', '', mainHtml);

    const firstSection = createElement('section', 'card-head', '', '', '', ulList);

    
    const iconLi = createElement('li', '', 'weather-icon','', '', firstSection);
    
    const iconImg = createElement('img', '', 'icon', "http://openweathermap.org/img/wn/" + weatherIcon +"@2x.png", '', iconLi);
    
    const cardDayandTemp = createElement('li', '', 'day', '', dayOfWeek + "<br>" + date + "<br>" + "<span>" + Math.round(minTemp) + 
    "°/ " + Math.round(maxTemp) + "°" + "</span>", firstSection);

    const secondSection = createElement('section', 'card-body', '', '', '', ulList);

    const humid = createElement('li', '', 'humidity', '',"Humidity " + humidity + "%", secondSection);

    const precipitationPr = createElement('li', '', 'precipitation-prob', '', "Rain " + precipitationProb + "%", secondSection);

    const windSp = createElement('li', '', 'wind-speed', '', "Wind " + Math.round(windSpeed) + " km/h", secondSection);

    const windDirection = createElement('li', '', 'wind-direction', '', "Wind.d. " + windDirectionDegree, secondSection);
}
// event listeners are the start of the whole operation, needs to be below. 
// Then display from top to bottom in order of occurrence the steps needed to produce final browser result.
submitBtn.addEventListener('click', handleForm);

form.addEventListener('keydown', pressEnter);

 //TODO: try with html template literal. Don't forget ; after closing backtick?
//TODO: transform wind-degrees in compass (letters)
