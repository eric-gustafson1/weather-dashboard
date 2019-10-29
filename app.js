$(document).ready(function() {
  loadCities();
  getWeather();
  $(".alert").animate({ opacity: 0.01 });
});
const apikey = "14d09a756bf3ab9066ec4aca0c409bb6";
const forcastApiKey = "b1b15e88fa797225412429c1c50c122a1";

$(".cities").on("click", "button", function() {
  city = $(this).attr("data-city");
  getWeather(city);
});

$("#w-search").on("click", function() {
  let city = $("#input").val();
  city = city.replace(/[0-9]/g, "");
  $("#input").val("");

  if (city !== "") {
    getWeather(city);
  } else {
    $(".alert").text('Enter a valid city name. Example: "Chicago". Do not include numbers or special characters.');
    $(".alert").animate({ opacity: 0.9 });
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
  const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${apikey}`;

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
        $("#w-icon").attr("src", `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`);
        $("#w-temp").text("Tempurature: " + Math.floor(response.main.temp) + "°F with " + response.weather[0].description);
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
  const latitude = lat;
  const longitude = lon;
  const queryURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apikey}&lat=${latitude}&lon=${longitude}`;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    $("#w-uvIndex").text(response.value);
  });
}

function getForcast(city) {
  const queryURL = `https://api.openweathermap.org/data/2.5/forecast/?q=${city},us&units=imperial&APPID=${apikey}`;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    let forcastDayArr = [];

    for (let i = 1; i < 40; i++) {
      let forcastDay = moment(response.list[i].dt_txt).format("YYYY-MM-DD");
      if (!forcastDayArr.includes(forcastDay)) {
        forcastDayArr.push(forcastDay);
      }
    }

    const today = moment().format("YYYY-MM-DD");
    if (forcastDayArr.includes(today)) {
      const index = forcastDayArr.indexOf(today);
      forcastDayArr.splice(index, 1);
    }

    for (let j = 0; j < forcastDayArr.length; j++) {
      let maxTempArr = [];
      let temps = [];
      let max = 0;

      for (let k = 0; k < 40; k++) {
        let forcastDay = moment(response.list[k].dt_txt).format("YYYY-MM-DD");

        if (forcastDayArr[j] === forcastDay) {
          const tempurature = response.list[k].main.temp;

          if (tempurature > max) {
            max = tempurature;

            icon = response.list[k].weather[0].icon;
            icon = icon.replace(/n/g, "d");

            $(".card-day-" + j).text(moment(forcastDayArr[j]).format("dddd"));
            $(".card-title-" + j).text(moment(forcastDayArr[j]).format("MM/DD/YYYY"));
            $(".w-icon-" + j).attr("src", `https://openweathermap.org/img/wn/${icon}@2x.png`);
            $(".w-tempHi-" + j).text(`Temp: ${Math.floor(max)}°F`);
            $(".w-humidity-" + j).text(`Humidity: ${Math.floor(response.list[k].main.humidity)}%`);
          }
        }
      }
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
