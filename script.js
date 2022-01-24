import Data from "./config.js";

const form = document.querySelector(".cityfield");
console.log(form)
const submitBtn = document.querySelector("#submitcity");

// Add city for API call
const handleForm = (event) => {
    event.preventDefault();

    // API call
    const getData = fetch("https://api.openweathermap.org/data/2.5/weather?q=" + form.value + "&appid=" + Data.key)
        .then(response => response.json())
        .then(data => console.log(data))
}

submitBtn.addEventListener('click', handleForm);