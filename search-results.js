const resultTextEl = document.querySelector("#result-text");
const resultContentEl = document.querySelector("#result-content");
const searchFormEl = document.querySelector("#search-form");

function currentDay() {
    let currentTimeAndDate = moment();
    $(".current-date").text(currentTimeAndDate.format("dddd, MMMM Do, YYYY"));
};
currentDay();

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
        .then(function (response) {
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
            document.querySelector(".humidity").textContent = weatherData.main.humidity;

            let icon = weatherData.weather[0].icon
            let iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
            document.querySelector(".current-icon").src = iconUrl;

            console.log(weatherData);

        })
}

function printForecast() {
    const cityName = getCityName();
    const apiKeyForecast = "e8291b7ef147e668681625dd1ef4d72e";
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKeyForecast}`;
    // console.log(url);

    fetch(url)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then(function (forecastData) {
            console.log(forecastData);
            for (let i = 0; i < 4; i++) {
                const weatherForecastIndex = 5 + (i * 8);
                const weather = forecastData.list[weatherForecastIndex];

                let dateDiv = document.createElement("div")
                const date = new Date(weather.dt*1000);
                dateDiv.innerHTML = date.toDateString();
                document.querySelector(".forecast-weather").appendChild(dateDiv);

                let minTempText = document.createElement("p")
                minTempText.innerHTML = "Minimum temperature is ";
                dateDiv.appendChild(minTempText);

                let minTempDiv = document.createElement("span")
                minTempDiv.innerHTML = kelvinToCelsius(weather.main.temp_min);
                minTempText.appendChild(minTempDiv);

                let maxTempText = document.createElement("p")
                maxTempText.innerHTML = "Maximum temperature is ";
                dateDiv.appendChild(maxTempText)

                let maxTempDiv = document.createElement("span")
                maxTempDiv.innerHTML = kelvinToCelsius(weather.main.temp_max);
                maxTempText.appendChild(maxTempDiv);

                let windText = document.createElement("p")
                windText.innerHTML

                let windDiv = document.createElement("div")
                windDiv.innerHTML = weather.wind.speed;
                maxTempDiv.appendChild(windDiv)

                let humidityDiv = document.createElement("div")
                humidityDiv.innerHTML = weather.main.humidity;
                maxTempDiv.appendChild(humidityDiv)

                let iconDiv = document.createElement("img")
                let icon = weather.weather[0].icon
                let iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
                iconDiv.src = iconUrl;
                humidityDiv.appendChild(iconDiv);
            }
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

    if (!searchInput) {
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
