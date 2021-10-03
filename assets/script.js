console.log("what's up");

//input vars
var searchInput = document.getElementById('city-input');
var cityInput = $("#city-input").val();
var searchBtn = document.getElementById("search-btn");
var APIkey = "&appid=47523fcfa432220823eeddae011ae353";
var api = "http://api.openweathermap.org/data/2.5/weather?q="


//used to check function
var searches = [];
var recentList = document.getElementById('recent-search');


searchBtn.addEventListener("click", function(event) {
    event.preventDefault();
    console.log(searchInput.value)
    getWeather();
    storeInput();
    renderLastSearch();
});



function getWeather() {

    var url = api + searchInput.value + "&units=imperial" + APIkey;
    console.log(url);

    fetch(url)
    .then(function (response) {
        if (response.ok) {
            
            response.json().then(data => {
                var nameValue = data['name'];
                var temp = data['main']['temp'];
                var wind = data['wind']['speed'];
                var humid = data['main']['humidity'];
                var desc = data['weather'][0]['description'];

                document.getElementById('temp').innerHTML = temp + "°F";
                document.getElementById('current-search-city').innerHTML = nameValue;
                document.getElementById('wind').innerHTML = wind + "mph";
                document.getElementById('humid').innerHTML = humid + "%";
                document.getElementById('desc').innerHTML = desc;
            });
        
        };
    });
};

//puts search value into localstorage
function storeInput() {
    localStorage.setItem("searches", JSON.stringify(searches));
}

//loads recent searches on page load
function renderLastSearch() {
   
    recentList.innerHTML = "";

    for (var i = 0; i < searches.length; i++) {
        var search = searches[i];
        var newLi = document.createElement('a');
        newLi.textContent = search;
        newLi.classList.add("list-group-item-action");
        newLi.classList.add("list-group-item");
        newLi.setAttribute("data-index", i);

        recentList.appendChild(newLi);
    }
    
}

function init() { 
    var lastSearch = JSON.parse(localStorage.getItem("searches"));
    if (lastSearch !== null) {
        searches = lastSearch;
    }

    renderLastSearch();
}

init()
