//TODO: make webpage responsive
//TODO: add style and design to page
import Data from "./config.js";
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const form = document.querySelector(".cityfield");
console.log(form)
const submitBtn = document.querySelector("#submitcity");
// Add city for API call
const handleForm = (event) => {
    //to only display the new data, remove childelement(ul) from parenthtml element
    let mainParent = document.querySelector('#card');
    while (mainParent.firstChild) {
        mainParent.removeChild(mainParent.firstChild);
    }
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

                    const mainHtml = document.querySelector('#card');
                    
                    for (let day of dailyWeather5) {
                        //TODO: try with html template literal. Don't forget ; after closing backtick?
                        const ulList = document.createElement("ul");
                        ulList.className = "daily-card";
                        mainHtml.appendChild(ulList);

                        const firstSection = document.createElement("section");
                        firstSection.id = "card-head";
                        ulList.appendChild(firstSection);

                        //TODO: transform wind-degrees in compass (letters)
                        const weatherIcon = day.weather[0].icon;
                        const iconLi = document.createElement("li");
                        iconLi.className = "weather-icon";
                        firstSection.appendChild(iconLi);

                        const iconImg = document.createElement('img')
                        iconImg.src = "http://openweathermap.org/img/wn/" + weatherIcon +"@2x.png";
                        iconImg.className = "icon";
                        iconLi.appendChild(iconImg);

                        const unixDate = day.dt;
                        const dateJSconversion = new Date(unixDate*1000);
                        console.log(dateJSconversion.getDay());
                        const weekDay = dateJSconversion.getDay();
                        const dateDDMMYY = dateJSconversion.toLocaleDateString("en-BE");
                        console.log(dateDDMMYY)
                        const dayOfWeek = weekdays[weekDay];
                        const date = dateDDMMYY;
                        const minTemp = day.temp.min;
                        const maxTemp = day.temp.max;

                        const cardDayandTemp = document.createElement("li");
                        cardDayandTemp.className = "day";
                        cardDayandTemp.innerHTML = dayOfWeek + "<br>" + date + "<br>" + "<span>" + Math.round(minTemp) + "° min" + 
                        Math.round(maxTemp) + "° max" + "</span>";
                        firstSection.appendChild(cardDayandTemp);

                        const secondSection = document.createElement("section");
                        secondSection.id = "card-body";
                        ulList.appendChild(secondSection);

                        const humidity = day.humidity;
                        const humid = document.createElement("li");
                        humid.className = "humidity";
                        humid.innerHTML = "Humidity" + humidity + "%";
                        secondSection.appendChild(humid);

                        const precipitationProb = day.pop;
                        const precipitationPr= document.createElement("li");
                        precipitationPr.className = "precipitation-prob";
                        precipitationPr.innerHTML = "Rain" + precipitationProb + "%";
                        secondSection.appendChild(precipitationPr);

                        const windSpeed = day.wind_speed;
                        const windSp = document.createElement("li");
                        windSp.className = "wind-speed";
                        windSp.innerHTML = "Wind" + windSpeed + " km/h";
                        secondSection.appendChild(windSp);

                        const windDirectionDegree = day.wind_deg;
                        const windDirection= document.createElement("li");
                        windDirection.className = "wind-direction";
                        windDirection.innerHTML = "Wind.d." + windDirectionDegree;
                        secondSection.appendChild(windDirection);
                    }
                })
            
        })
}
submitBtn.addEventListener('click', handleForm);
