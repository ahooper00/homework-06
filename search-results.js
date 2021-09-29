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
    // console.log(query);

    return query;
};

// function showResults(resultsObj) {

//     const resultBody = document.createElement("div");
//     resultBody.classList.add("result-body");
//     resultTextEl.append(resultBody);

// }
// showResults();

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
                dateDiv.className = "weather-card";
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
                windText.innerHTML = "Wind speeds up to ";
                dateDiv.appendChild(windText);

                let windDiv = document.createElement("span")
                windDiv.innerHTML = weather.wind.speed;
                windText.appendChild(windDiv);

                let humidityText = document.createElement("p")
                humidityText.innerHTML = "Humidity around ";
                dateDiv.appendChild(humidityText)

                let humidityDiv = document.createElement("span")
                humidityDiv.innerHTML = weather.main.humidity;
                humidityText.appendChild(humidityDiv)

                let iconDiv = document.createElement("img")
                let icon = weather.weather[0].icon
                let iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
                iconDiv.src = iconUrl;
                dateDiv.appendChild(iconDiv);
            }
        })
}

printForecast();
printCurrentWeather();

// const pastSearches = [];
// if (localStorage["pastSearches"]) {
//     pastSearches = JSON.parse(localStorage["pastSearches"]);
// }

// if (pastSearches.indexOf(search)) {
//     pastSearches.unshift(search);
//     if(pastSearches.length > 5) {
//         pastSearches.pop();
//     }
//     localStorage["pastSearches"] = JSON.stringify(pastSearches);
// }

// function getPastSearches() {
//     if (pastSearches.length) {
//         let html = pastSearchesTemplate({search:pastSearches});
//         $("#pastSearches").html(html);
//     }
// }

// $(document).on("click", ".pastSearchLink", function(e) {
//     e.preventDefault();
//     let search = $(this).text();
//     doSearch(search);
// });

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

