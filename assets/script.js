console.log("what's up");

//input vars
var searchInput = document.getElementById('city-input');
var cityInput = JSON.stringify(searchInput);
var searchBtn = document.getElementById("search-btn");
var APIkey = "47523fcfa432220823eeddae011ae353";

var queryURL = "api.openweathermap.org/data/2.5/weather?q=" + document.getElementById("city-input").value + "&appid=" + APIkey;
//used to check function
var searches = [];
var recentList = document.getElementById('recent-search');


searchBtn.addEventListener("click", function(event) {
    event.preventDefault();

    
    console.log(queryURL);

    if (inputText === "") {
      return;
    }

    
  
    searches.push(inputText);
    searchInput.value = "";

    console.log(cityInput)
    storeInput();
    renderLastSearch();
    // getData();
  });


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

// function getData() {
//     console.log(queryURL);
// }