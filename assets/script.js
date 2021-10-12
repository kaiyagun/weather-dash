console.log("what's up");

//input vars
var searchInput = document.getElementById("city-input");
var cityInput = $("#city-input").val();
var searchBtn = document.getElementById("search-btn");
var APIkey = "&appid=47523fcfa432220823eeddae011ae353";
var api = "https://api.openweathermap.org/data/2.5/weather?q=";

var dayOne = $("#day1");
var dayTwo = $("#day2");
var dayThree = $("#day3");
var dayFour = $("#day4");
var dayFive = $("#day5");

// var fiveDays = [dayOne, dayTwo, dayThree, dayFour, dayFive];

//used to check function
var searches = [];
var recentList = document.getElementById("recent-search");

//click event
searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  console.log(searchInput.value);
  getWeather();
  storeInput();
  renderLastSearch();
  getLatLong();
});

//get search city and gets lat and long from api
function getLatLong () {
    var url = api + searchInput.value + APIkey;

    fetch(url)
    .then(function (response) {
        if (response.ok) {
            return response.json();
        }
    })
    .then(function (data) {
        latitude = data.coord.lat;
        longitude = data.coord.lon;
        fiveDay();
    })
}

//puts lat and long to get 5 day response, appends to cards
function fiveDay() {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&appid=47523fcfa432220823eeddae011ae353`).then(function (response) {
        if (response.ok) {
            response.json().then((data) => {
                for (let i = 0; i < 5; i++) {
                    const nextDay = moment()
                    .add(i +1, 'd')
                    .format('MMMM Do');
                    var buildFiveDay = $('#day' + i);
                    buildFiveDay.append(`<h5>${nextDay}</h5><hr>`);
                    var futureWeatherIcon = data['daily'][i].weather[0]['icon'];
                    console.log(futureWeatherIcon);
                    buildFiveDay.append(
                      '<div>Temp: ' + data['daily'][i].temp.day + '&deg;F</div><br>'
                    );
                    buildFiveDay.append(
                      '<div>Wind: ' + data['daily'][i].wind_speed + 'mph</div><br>'
                    );
                    buildFiveDay.append(
                      '<div>Humidity: ' + data['daily'][i].humidity + '%</div><br>'
                    );

                    
                }
                
            });
        };
    });
};

function getWeather() {
  var url = api + searchInput.value + "&units=imperial" + APIkey;
  console.log(url);

  fetch(url).then(function (response) {
    if (response.ok) {
      response.json().then((data) => {
        var nameValue = data["name"];
        var temp = data["main"]["temp"];
        var wind = data["wind"]["speed"];
        var humid = data["main"]["humidity"];
        var desc = data["weather"][0]["description"];

        document.getElementById("temp").innerHTML = temp + "°F";
        document.getElementById("current-search-city").innerHTML = nameValue;
        document.getElementById("wind").innerHTML = wind + "mph";
        document.getElementById("humid").innerHTML = humid + "%";
        document.getElementById("desc").innerHTML = desc;
      });
    }
  });
}

//puts search value into localstorage
function storeInput() {
  localStorage.setItem("searches", JSON.stringify(searches));
}

//loads recent searches on page load
function renderLastSearch() {
  recentList.innerHTML = "";

  for (var i = 0; i < searches.length; i++) {
    var search = searches[i];
    var newLi = document.createElement("a");
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

init();
