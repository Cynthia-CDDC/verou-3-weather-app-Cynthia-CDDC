/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/coordinates.js":
/*!****************************!*\
  !*** ./src/coordinates.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"fetchCoordinates\": () => (/* binding */ fetchCoordinates)\n/* harmony export */ });\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ \"./src/index.js\");\n\r\nconst fetchCoordinates = (inputCity) => {// const inputCity = form.value\r\n    const getCoordinates = fetch(\"http://api.openweathermap.org/geo/1.0/direct?q=\" +inputCity + \"&appid=a790165930e5b592de2330f642ceff0c\")\r\n        .then(response => {\r\n            return response.json();\r\n        })\r\n        .then(data => {\r\n            const latitude = data[0].lat;\r\n            const longitude = data[0].lon;\r\n            //API call with coordinates\r\n            (0,_index_js__WEBPACK_IMPORTED_MODULE_0__.fetchWeatherData)(latitude, longitude); //refers to the function fetchWeatherData\r\n        })\r\n}\r\n \n\n//# sourceURL=webpack://weather-app/./src/coordinates.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"fetchWeatherData\": () => (/* binding */ fetchWeatherData)\n/* harmony export */ });\n/* harmony import */ var _coordinates_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./coordinates.js */ \"./src/coordinates.js\");\n\r\n\r\n// import Data from \"./config.js\";\r\n\r\nconst weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];\r\nconst form = document.querySelector(\".cityfield\");//inputfields\r\nconst submitBtn = document.querySelector(\"#submitcity\");\r\n\r\nconst pressEnter = (event) => {\r\n    const pressedKey = event.key;\r\n    if (pressedKey == \"Enter\") {\r\n        handleForm();\r\n    };\r\n}\r\n// Add city for API call\r\nconst handleForm = (event) => {\r\n    //to only display the new data, remove childelement(ul) from parenthtml element\r\n    let mainParent = document.querySelector('#card');\r\n    while (mainParent.firstChild) {\r\n        mainParent.removeChild(mainParent.firstChild);\r\n    }\r\n    // Geocode API call to get the coordinates needed for weather API\r\n    (0,_coordinates_js__WEBPACK_IMPORTED_MODULE_0__.fetchCoordinates)(form.value);\r\n}\r\nconst fetchWeatherData = (lat, long) => {\r\n    const getWeatherData = fetch (\"https://api.openweathermap.org/data/2.5/onecall?lat=\"+ lat + \"&lon=\" + long + \"&units=metric\" + \"&appid=a790165930e5b592de2330f642ceff0c\")\r\n        .then(response => response.json())\r\n        .then(data => {// data = the whole data fetched from the API.\r\n            console.log(data)\r\n            const dailyWeather8 = data.daily;//array of 8 objects. Objects are the weatherinfo per day.\r\n            const dailyWeather5 = dailyWeather8.slice(0, 5);//takes the first 5 objects of the array above starting from position 0.\r\n            const mainHtml = document.querySelector('#card');\r\n            for (let day of dailyWeather5) {\r\n                createDay(mainHtml, day); //refers to the function createDay\r\n            }\r\n        })\r\n}\r\n              \r\n// function pre-creating html elements\r\nconst createElement = (tagN, idN, classN, source, innerHtml, parent) => {\r\n    const tagName = document.createElement(tagN);\r\n    tagName.id = idN;\r\n    tagName.className = classN;\r\n    tagName.src = source;\r\n    tagName.innerHTML = innerHtml;\r\n    parent.appendChild(tagName);\r\n\r\n    return tagName;\r\n};\r\n\r\n// function creating proper html elements for each day\r\nconst createDay = (mainHtml, day) => {\r\n    const windDirectionDegree = day.wind_deg;\r\n    const windSpeed = day.wind_speed;\r\n    const precipitationProb = day.pop;\r\n    const humidity = day.humidity;\r\n    const unixDate = day.dt;\r\n    const dateJSconversion = new Date(unixDate*1000);\r\n    const weekDay = dateJSconversion.getDay();\r\n    const dateDDMMYY = dateJSconversion.toLocaleDateString(\"en-BE\");\r\n    const dayOfWeek = weekdays[weekDay];\r\n    const date = dateDDMMYY;\r\n    const minTemp = day.temp.min;\r\n    const maxTemp = day.temp.max;\r\n    const weatherIcon = day.weather[0].icon;\r\n\r\n    const ulList = createElement('ul', null, 'daily-card','', '', mainHtml);\r\n\r\n    const firstSection = createElement('section', 'card-head', '', '', '', ulList);\r\n\r\n    \r\n    const iconLi = createElement('li', '', 'weather-icon','', '', firstSection);\r\n    \r\n    const iconImg = createElement('img', '', 'icon', \"http://openweathermap.org/img/wn/\" + weatherIcon +\"@2x.png\", '', iconLi);\r\n    \r\n    const cardDayandTemp = createElement('li', '', 'day', '', dayOfWeek + \"<br>\" + date + \"<br>\" + \"<span>\" + Math.round(minTemp) + \r\n    \"°/ \" + Math.round(maxTemp) + \"°\" + \"</span>\", firstSection);\r\n\r\n    const secondSection = createElement('section', 'card-body', '', '', '', ulList);\r\n\r\n    const humid = createElement('li', '', 'humidity', '',\"Humidity \" + humidity + \"%\", secondSection);\r\n\r\n    const precipitationPr = createElement('li', '', 'precipitation-prob', '', \"Rain \" + precipitationProb + \"%\", secondSection);\r\n\r\n    const windSp = createElement('li', '', 'wind-speed', '', \"Wind \" + Math.round(windSpeed) + \" km/h\", secondSection);\r\n\r\n    const windDirection = createElement('li', '', 'wind-direction', '', \"Wind.d. \" + windDirectionDegree, secondSection);\r\n}\r\n// event listeners are the start of the whole operation, needs to be below. \r\n// Then display from top to bottom in order of occurrence the steps needed to produce final browser result.\r\nsubmitBtn.addEventListener('click', handleForm);\r\n\r\nform.addEventListener('keydown', pressEnter);\r\n\r\n\r\n\r\n //TODO: try with html template literal. Don't forget ; after closing backtick?\r\n//TODO: transform wind-degrees in compass (letters)\r\n\n\n//# sourceURL=webpack://weather-app/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;