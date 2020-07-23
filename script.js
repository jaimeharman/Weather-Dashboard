$( document ).ready(function() {
    var appID = "e27a48bbfe8b7080a3aafdc66fff63f3";

    $(".query_btn").click(function(){
        var query_param = $(this).prev().val();
    })

//For Loop to create forecast days
    for (var i=1; i < 6; i++) {
        var cardMarkup = `
        <div class="card" id="card-day${i}">
        <div class="card-body">
          <h5 class="card-title" id="card-day${i}-date">Day ${i}</h5>
          <div id="card-day${i}-icon"></div>
          <p>Temp:<span id="card-day${i}-temp"></span></p>
          <p>Humidity:<span id="card-day${i}-humidity"></span></p>
        </div>
      </div>`
      $("#card-deck").append(cardMarkup);
    }

    $("#search-button").on("click", function() {
        var city = $("#city-input").val()
        console.log(city)
    });
});

//user searches for a city's weather
//cities you've searched are listed(display) and stored in local storage
//selected city gets fed into weather api as a parameter
//receive object from weather api
//look through object for the weather data
//append data to DOM
//5 day forecast
