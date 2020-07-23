$(document).ready(function () {
  var appID = "3e684ec40d1ec38b4ab47574d4baeb20";
  getFromLocalStorage();

  //For Loop to create forecast days
  for (var i = 1; i < 6; i++) {
    var cardMarkup = `
        <div class="card" id="card-day${i}">
        <div class="card-body">
          <h5 class="card-title" id="card-day${i}-date">Day ${i}</h5>
          <div id="card-day${i}-icon"></div>
          <p>Temp:<span id="card-day${i}-temp"></span></p>
          <p>Humidity:<span id="card-day${i}-humidity"></span></p>
        </div>
      </div>`;
    $("#card-deck").append(cardMarkup);
  }

  //user searches for a city's weather
  $("#search-button").on("click", function () {
    var city = $("#city-input").val();
    storeCity(city);
    getCurrentWeather(city);
  });

  function createCityList(citySearchList) {
    $("#city-list").empty();
  }

  var cityArray = [];
  function storeCity(city) {
    cityArray.push(city);
    localStorage.setItem("cities", JSON.stringify(cityArray));
    getFromLocalStorage();
  }

  //refresh the page and saved information stays in place
  function getFromLocalStorage() {
    if (localStorage.getItem("cities") !== null) {
      //Clear out city list div
      $("#city-list").html("");
      var cities = JSON.parse(window.localStorage.getItem("cities"));
      for (var i = 0; i < cities.length; i++) {
        var cityMarkup = `<li class="city-item" data-city="${cities[i]}>${cities[i]}</li>`;
        $("#city-list").append(cityMarkup);
      }
    }
  }

  function getCurrentWeather(city) {
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appID}`;
    $.ajax({
      url: url,
      method: "GET",
    }).then(function (response) {
      // $("#").text(JSON.stringify(response));
      console.log(response);
    });
  }

  function getForecastWeather(city) {
    var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${appID}`;
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      // $("#").text(JSON.stringify(response));
      console.log(response);
    });
  }
});

//cities you've searched are listed(display) and stored in local storage
//selected city gets fed into weather api as a parameter
//receive object from weather api
//look through object for the weather data
//append data to DOM
//5 day forecast
