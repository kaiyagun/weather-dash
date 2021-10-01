console.log("what's up")

//input vars
var searchInput = document.getElementById('city-input');
var searchBtn = $("#search-btn");

searchBtn.click(getInput);

function getInput() {
    console.log(searchInput.value);
}