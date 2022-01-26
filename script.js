//TODO: make webpage responsive
import Data from "./config.js";

const form = document.querySelector(".cityfield");
console.log(form)
const submitBtn = document.querySelector("#submitcity");

// Add city for API call
const handleForm = (event) => {
    event.preventDefault();
    // Geocode API call to get the coordinates needed for weather API
    const getCoordinates = fetch("http://api.openweathermap.org/geo/1.0/direct?q=" +form.value + "&appid=" + Data.key)
        .then(response => {
            console.log(response);
            return response.json();
        })
        .then(data => {
            const latitude = data[0].lat;
            const longitude = data[0].lon;
            //API call with coordinates
            const getWeatherData = fetch ("https://api.openweathermap.org/data/2.5/onecall?lat="+ latitude + "&lon=" + longitude + "&units=metric" + "&appid=" + Data.key)
                .then(response => response.json())
                .then(data => {
                    console.log(data)// the whole data fetched from the API.
                    const dailyWeather8 = data.daily;//array of 8 objects. Objects are the weatherinfo per day.
                    console.log(dailyWeather8)
                    const dailyWeather5 = dailyWeather8.slice(0, 5);//takes the first 5 objects of the array above starting from position 0.
                    console.log(dailyWeather5)

                    const mainHtml = document.querySelector('#daily');
                    
                    for (let day of dailyWeather5) {
                        //TODO: try with html template literal. Don't forget ; after closing backtick?
                        const olList = document.createElement("ol");
                        olList.className = "daily";
                        mainHtml.appendChild(olList);

                        const unixDate = day.dt;
                        const dateJSconversion = new Date(unixDate*1000);
                        const dateDDMMYY = dateJSconversion.toLocaleDateString("en-BE");
                        console.log(dateDDMMYY)
                        const date = document.createElement("li");
                        date.className = "date";
                        date.innerHTML = dateDDMMYY;
                        olList.appendChild(date);

                        //TODO: round the temperature-numbers
                        //TODO: create letter day-string form date data
                        //TODO: transform wind-degrees in compass (letters)
                        const weatherIcon = day.weather[0].icon;
                        const iconLi = document.createElement("li");
                        iconLi.className = "weather-icon";
                        olList.appendChild(iconLi);
                        const iconImg = document.createElement('img')
                        iconImg.src = "http://openweathermap.org/img/wn/" + weatherIcon +"@2x.png";
                        iconLi.appendChild(iconImg);
                        
                        const minTemp = day.temp.min;
                        const minTmp= document.createElement("li");
                        minTmp.className = "min-temp";
                        minTmp.innerHTML = minTemp;
                        olList.appendChild(minTmp);

                        const maxTemp = day.temp.max;
                        const maxTmp= document.createElement("li");
                        maxTmp.className = "max-temp";
                        maxTmp.innerHTML = maxTemp;
                        olList.appendChild(maxTmp);

                        const humidity = day.humidity;
                        const humid = document.createElement("li");
                        humid.className = "humidity";
                        humid.innerHTML = humidity;
                        olList.appendChild(humid);

                        const windSpeed = day.wind_speed;
                        const windSp = document.createElement("li");
                        windSp.className = "wind-speed";
                        windSp.innerHTML = windSpeed;
                        olList.appendChild(windSp);

                        const windDirectionDegree = day.wind_deg;
                        const windDirection= document.createElement("li");
                        windDirection.className = "wind-direction";
                        windDirection.innerHTML = windDirectionDegree;
                        olList.appendChild(windDirection);

                        const precipitationProb = day.pop;
                        const precipitationPr= document.createElement("li");
                        precipitationPr.className = "precipitation-prob";
                        precipitationPr.innerHTML = precipitationProb;
                        olList.appendChild(precipitationPr);
                    }
                })
            
        })
}
submitBtn.addEventListener('click', handleForm);
