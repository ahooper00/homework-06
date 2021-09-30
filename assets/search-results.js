const resultTextEl = document.querySelector("#result-text");
const resultContentEl = document.querySelector("#result-content");
const searchFormEl = document.querySelector("#search-form");

// Presents the current date when a city is searched
function currentDay() {
    let currentTimeAndDate = moment();
    $(".current-date").text(currentTimeAndDate.format("dddd, MMMM Do, YYYY"));
};
currentDay();

// The parameters are defined by the city name that has been searched
function getCityName() {
    const searchParams = document.location.search;

    const query = searchParams.replace("?q=", "");

    return query;
};

// Prints the city name is the correct html location
document.querySelector("#result-text").textContent = getCityName();

// Define the required the url and API
function printCurrentWeather() {
    const cityName = getCityName();
    const apiKey = "e8291b7ef147e668681625dd1ef4d72e";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    console.log(url);

    // Fetches the information from the API
    fetch(url)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        // After the fetch, the required weather information is called and inserted into the appropriate html sections
        .then(function (weatherData) {
            console.log(weatherData);
            document.querySelector(".temperature").textContent = kelvinToCelsius(weatherData.main.temp);
            document.querySelector(".feels-like").textContent = kelvinToCelsius(weatherData.main.feels_like);
            document.querySelector(".sky").textContent = weatherData.weather[0].description;
            document.querySelector(".wind").textContent = weatherData.wind.speed;
            document.querySelector(".humidity").textContent = weatherData.main.humidity;

            // The icons are retrieved using a different url
            let icon = weatherData.weather[0].icon
            let iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
            document.querySelector(".current-icon").src = iconUrl;

            console.log(weatherData);

        })
}

// This function calls and prints the forecast weather information
function printForecast() {
    const cityName = getCityName();
    const apiKeyForecast = "e8291b7ef147e668681625dd1ef4d72e";
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKeyForecast}`;

    fetch(url)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        
        // For this function, the html parts are created using javascript, as a for loop has been used to go through each day
        .then(function (forecastData) {
            console.log(forecastData);
            for (let i = 0; i < 4; i++) {
                const weatherForecastIndex = 5 + (i * 8);
                const weather = forecastData.list[weatherForecastIndex];

                // The date fetched is in unix, and so here it is converted to proper date notation
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

                // Again the icons are called
                let iconDiv = document.createElement("img")
                let icon = weather.weather[0].icon
                let iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
                iconDiv.src = iconUrl;
                dateDiv.appendChild(iconDiv);
            }
        })
}

// Calls the functions that fetches and prints the weather information
printForecast();
printCurrentWeather();

// Converts the temperature from kelvin (information fetched from API) to Celsius
function kelvinToCelsius(kelvin) {
    return Math.round(kelvin - 273.15);
}

// Function allows cities to be searched one after the other
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