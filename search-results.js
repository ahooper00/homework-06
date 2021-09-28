const resultTextEl = document.querySelector("#result-text");
const resultContentEl = document.querySelector("#result-content");
const searchFormEl = document.querySelector("#search-form");

function getCityName() {
    const searchParams = document.location.search;

    const query = searchParams.replace("?q=", "");
    console.log(query);

    return query;
};

function showResults(resultsObj) {
    console.log(resultsObj);

    const resultBody = document.createElement("div");
    resultBody.classList.add("result-body");
    resultTextEl.append(resultBody);

}
showResults();

document.querySelector("#result-text").textContent = getCityName();

function printCurrentWeather() {
    const cityName = getCityName();
    const apiKey = "e8291b7ef147e668681625dd1ef4d72e";
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    console.log(url);

    fetch(url)
    .then (function (response) {
        if (!response.ok) {
            throw response.json();
        }
        return response.json();
    })
    .then(function (weatherData) {
        console.log(weatherData);
        document.querySelector(".temperature").textContent = kelvinToCelsius(weatherData.main.temp);
        document.querySelector(".feels-like").textContent = kelvinToCelsius(weatherData.main.feels_like);
        document.querySelector(".sky").textContent = weatherData.weather[0].description;
        document.querySelector(".wind").textContent = weatherData.wind.speed;

        console.log(weatherData);

    })
}

function printForecast() {
    const cityName = getCityName();
    const apiKeyForecast = "e8291b7ef147e668681625dd1ef4d72e";
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKeyForecast}`;
    // console.log(url);

    fetch(url)
    .then (function (response) {
        if (!response.ok) {
            throw response.json();
        }
        return response.json();
    })
    .then (function (forecastData) {
        console.log(forecastData);
        document.querySelector(".day-one").textContent = forecastData.list[1].dt_txt;
        console.log(forecastData.list[1].dt_txt)
    })
}

printForecast();
printCurrentWeather();

function kelvinToCelsius(kelvin) {
    return Math.round(kelvin - 273.15);
} 

function handleFormSubmit(event) {
    event.preventDefault();

    const searchInput = document.querySelector("#search-input").value;

    if(!searchInput) {
        console.error("You need a search input value!");
        return;
    }
    const queryString = './search-results.html?q=' + searchInput;

    location.assign(queryString)
}

searchFormEl.addEventListener('submit', handleFormSubmit);

// async function getData() {
//     const cityName = "sydney";
//     const apiKey = "e8291b7ef147e668681625dd1ef4d72e";
//     const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
//     const response = await fetch(url);
//     const weatherData = await response.json();
//     console.log(weatherData)
//     console.log(`Hi! In ${cityName} it's a lovely ${weatherData.main.temp} degrees Kelvin or some shit 🥶`);
// }

// getData();
