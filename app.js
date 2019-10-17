$(document).ready(function() {
  loadCities();
  getWeather();
  $(".alert").animate({
    opacity: 0.01
  });
});

$(".cities").on("click", "button", function() {
  city = $(this).attr("data-city");
  getWeather(city);
});

$("#w-search").on("click", function() {
  let city = $("#input").val();
  city = city.replace(/[^A-Za-z]/g, "");
  $("#input").val("");
  if (city !== "") {
    getWeather(city);
  } else {
    $(".alert").text(
      'Enter a valid city name. Example: "Chicago". No numbers or special characters.'
    );
    $(".alert").animate({
      opacity: 0.9
    });
    $(".alert").animate(
      {
        opacity: 0.01
      },
      5000
    );
  }
  event.preventDefault();
});

function getWeather(city) {
  if (city === undefined || city === "") {
    city = "denver";
  } else {
    city = city.toLowerCase();
  }
  let apikey = "14d09a756bf3ab9066ec4aca0c409bb6";
  let queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${apikey}`;

  $.ajax({
    url: queryURL,
    method: "GET",
    statusCode: {
      404: function() {
        $(".alert").text(`The city named "${city}" was not found`);
        $(".alert").animate({
          opacity: 0.9
        });
        $(".alert").animate(
          {
            opacity: 0.01
          },
          5000
        );
      },
      200: function(response) {
        $("#w-location").text(response.name);
        $("#w-day").text(moment().format("(MM/DD/YYYY)"));
        $("#w-icon").attr(
          "src",
          `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`
        );
        $("#w-temp").text(
          "Tempurature: " +
            Math.floor(response.main.temp) +
            "°F with " +
            response.weather[0].description
        );
        $("#w-humidity").text(`Relative Humidity: ${response.main.temp}%`);
        $("#w-wind").text(`Wind Speed: ${response.wind.speed} mph`);

        let lat = response.coord.lat;
        let lon = response.coord.lon;
        getUVIndex(lat, lon);
        getForcast(city);

        if (!cityArr.includes(city.toLowerCase())) {
          cityArr.push(city);
          saveCity(city);
          createCityBtns(city);
        }
      }
    }
  });
}

function getUVIndex(lat, lon) {
  let apikey = "14d09a756bf3ab9066ec4aca0c409bb6";
  let latitude = lat;
  let longitude = lon;
  let queryURL = `http://api.openweathermap.org/data/2.5/uvi?appid=${apikey}&lat=${latitude}&lon=${longitude}`;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    $("#w-uvIndex").text(response.value);
  });
}

function getForcast(city) {
  let apikey = "14d09a756bf3ab9066ec4aca0c409bb6";
  let queryURL = `http://api.openweathermap.org/data/2.5/forecast/?q=${city},us&units=imperial&APPID=${apikey}`;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    for (let i = 1; i < 40; i++) {
      let day =
        moment()
          .add(i, "days")
          .format("YYYY-MM-DD") + " 21:00:00";

      response.list.forEach(function(data) {
        if (data.dt_txt === day) {
          let forcastDay = data.dt_txt;

          // $('.card-title-' + i).text(forcastDay)
          $(".card-day-" + i).text(moment(forcastDay).format("dddd"));
          $(".card-title-" + i).text(moment(forcastDay).format("MM/DD/YYYY"));
          // $('.card-title-' + i).text(moment(forcastDay).format('dddd'))
          $(".w-icon-" + i).attr(
            "src",
            `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
          );
          $(".w-tempHi-" + i).text(`Temp: ${Math.floor(data.main.temp_max)}°F`);
          $(".w-humidity-" + i).text(
            `Humidity: ${Math.floor(data.main.humidity)}%`
          );
        }
      });
    }
  });
}

function saveCity(city) {
  localStorage.setItem("cityList", JSON.stringify(cityArr));
}

function loadCities() {
  if (localStorage.getItem("cityList") === null) {
    cityArr = [];
  } else {
    cityArr = JSON.parse(localStorage.getItem("cityList"));
    cityArr.forEach(function(city) {
      createCityBtns(city);
    });
  }
}

function createCityBtns(city) {
  let cityBtn = $("<button>").text(city);
  cityBtn.addClass("btn btn-outline-info btn-block");
  cityBtn.attr("data-city", city);
  $(".cities").append(cityBtn);
}
