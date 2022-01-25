import Data from "./config.js";

const form = document.querySelector(".cityfield");
console.log(form)
const submitBtn = document.querySelector("#submitcity");

// Add city for API call
const handleForm = (event) => {
    event.preventDefault();
    // API call
    const getCoordinates = fetch("http://api.openweathermap.org/geo/1.0/direct?q=" +form.value + "&appid=" + Data.key)
        .then(response => response.json())
            .then(data => {
                const latitude = data[0].lat;
                const longitude = data[0].lon;
                const getWeatherData = fetch ("https://api.openweathermap.org/data/2.5/onecall?lat="+ latitude + "&lon=" + longitude + "&units=metric" + "&appid=" + Data.key)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        console.log(data)
                    })
                
            })
        
        
}
submitBtn.addEventListener('click', handleForm);



