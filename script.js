$(document).ready(function () {
  var appID = "3e684ec40d1ec38b4ab47574d4baeb20";
  getFromLocalStorage();

  //For Loop to create forecast days
  for (var i = 1; i < 6; i++) {
    var cardMarkup = `
        <div class="card" id="card-day${i}">
        <div class="card-body">
          <h5 class="card-title" id="card-day${i}-date">Day ${i}</h5>
          <img id="card-day${i}-icon">
          <p>Temp:&nbsp;<span id="card-day${i}-temp"></span>°F</p>
          <p>Humidity:&nbsp;<span id="card-day${i}-humidity"></span>%</p>
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

  //city input is added to local storage
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
        var cityMarkup = `<li class="city-item" data-city="${cities[i]}">${cities[i]}</li>`;
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
      addCurrentWeatherInfo(response);
    });
  }
//manipulating the DOM
  function addCurrentWeatherInfo(obj) {
    console.log(obj)
    $("#current-wind").html("");
    $("#current-wind").append(obj.wind.speed);
    $("#current-humidity").html("");
    $("#current-humidity").append(obj.main.humidity);
    $("#current-temp").html("");
    $("#current-temp").append(temperatureConverter(obj.main.temp));
    var icon = obj.weather[0].icon;
    var iconURL = `http://openweathermap.org/img/wn/${icon}.png`;
    $("#current-icon").html("");
    $("#current-icon").attr("src", iconURL);


    getCurrentUV(obj.coord.lat, obj.coord.lon);
    getForecastWeather(obj.coord.lat, obj.coord.lon);
  }

  function getCurrentUV(lat, lon) {
    var url = `http://api.openweathermap.org/data/2.5/uvi?appid=${appID}&lat=${lat}&lon=${lon}`;
    $.ajax({
      url: url,
      method: "GET",
    }).then(function (response) {
      addCurrentUVInfo(response);
    });
  }

  //uv index button/color
  function addCurrentUVInfo(obj) {
    var uvIndex = obj.value;
    var uvIndexRounded = Math.floor(uvIndex);
    var uvColor;

    if (uvIndexRounded < 2) {
      uvColor = "btn-success"; //green
    }

    if (uvIndexRounded > 2 && uvIndexRounded < 6) {
      uvColor = "btn-warning"; // yellow
    }

    if (uvIndexRounded > 5 && uvIndexRounded < 8) {
      uvColor = "orange"; //orange
    }

    if (uvIndexRounded > 7 && uvIndexRounded < 11) {
      uvColor = "btn-danger"; //red
    }

    if (uvIndexRounded > 10) {
      uvColor = "purple"; //purple
    }

    //reset divs
    $("#current-uv-level").html("");
    $("#current-uv-level").removeClass(
      "btn-success btn-warning orange btn-danger purple"
    );
    //add UV info
    $("#current-uv-level").addClass(uvColor);
    $("#current-uv-level").append(uvIndex);
  }

  function getForecastWeather(lat, lon) {
    var url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly&appid=${appID}`;
    $.ajax({
      url: url,
      method: "GET",
    }).then(function (response) {
      addFiveDayForecast(response);
    });
  }
  // target the day 5 blocks
  function addFiveDayForecast(obj) {
    console.log(obj);
    for (var i = 0; i < 5; i++) {
      var icon = obj.daily[i].weather[0].icon;
      var iconURL = `http://openweathermap.org/img/wn/${icon}.png`;
      $(`#card-day${i + 1}-icon`).html("");
      $(`#card-day${i + 1}-icon`).attr("src", iconURL);
      $(`#card-day${i + 1}-temp`).html("");
      $(`#card-day${i + 1}-temp`).append(temperatureConverter(obj.daily[i].temp.max));

      $(`#card-day${i + 1}-humidity`).html("");
      $(`#card-day${i + 1}-humidity`).append(obj.daily[i].humidity);
    }
  }

  //Convert kelvin to fahrenheit
  function temperatureConverter(valNum) {
    valNum = parseFloat(valNum);
    var calcTemp = valNum * 1.8 - 459.67;
    return Math.round(calcTemp);
  }
});

//selected city gets fed into weather api as a parameter
//receive object from weather api
//look through object for the weather data
//append data to DOM
//5 day forecast

//icons for weather
//update styling and html
