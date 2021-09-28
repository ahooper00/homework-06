const resultTextEl = document.querySelector("#result-text");
const resultContentEl = document.querySelector("#result-content");
const searchForm = document.querySelector("#search-form");

function getCityName() {
    const searchParams = document.location.search;

    const query = searchParams.replace("?q=", "");
    console.log(query);

    return query;
};

function showResults(resultsObj) {
    console.log(resultsObj);

    const resultDiv = document.createElement('div');
    resultDiv.classList.add('resultDiv', 'bg-light', 'text-dark', 'p-3');

}

function getData() {
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
    })
}
getData()

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
