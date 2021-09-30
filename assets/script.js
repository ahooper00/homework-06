const searchFormEl = document.querySelector("#search-form");

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