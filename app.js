$(document).ready(function () {
    let city
    getWeather(city)
    console.log(city)
    getForcast()
    loadCities()
});

// let cityArr = []



$('#w-change-btn').on('click', function () {
    weather.changeLocation($('#city').val());
    getWeather();
    $('#locModal').modal('hide');
    storage.setLocationData($('#city').val());
})

function getWeather(city) {
    if (city === undefined || city === '') {

        city = 'Highlands Ranch';
    } else {
        city = city
    }
    console.log(city)
    let apikey = '14d09a756bf3ab9066ec4aca0c409bb6';
    let queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${apikey}`;
    // console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // console.log(response);

        $('#w-location').text(response.name);
        $('#w-day').text(moment().format('(MM/DD/YYYY)'));
        $('#w-icon').attr('src', `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`);
        $('#w-temp').text('Tempurature: ' + Math.floor(response.main.temp) + '°F with ' + response.weather[0].description);
        $('#w-humidity').text(`Relative Humidity: ${response.main.temp}%`);
        $('#w-wind').text(`Wind Speed: ${response.wind.speed} mph`);

        let lat = response.coord.lat;
        let lon = response.coord.lon;
        getUVIndex(lat, lon)
    })
}

function getUVIndex(lat, lon) {
    let apikey = '14d09a756bf3ab9066ec4aca0c409bb6';
    let latitude = lat
    let longitude = lon
    let queryURL = `http://api.openweathermap.org/data/2.5/uvi?appid=${apikey}&lat=${latitude}&lon=${longitude}`

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        $('#w-uvIndex').text(response.value)
    })

}

function getForcast() {

    let city = 'Denver';
    let apikey = '14d09a756bf3ab9066ec4aca0c409bb6';
    let queryURL = `http://api.openweathermap.org/data/2.5/forecast?q=${city},us&units=imperial&APPID=${apikey}`

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // console.log(response)

        for (let i = 1; i < 6; i++) {

            $('.w-icon-' + i).attr('src', `http://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png`)
            $('.w-tempHi-' + i).text(`Temp: ${Math.floor(response.list[i].main.temp_max)}°F`)
            $('.w-humidity-' + i).text(`Humidity: ${Math.floor(response.list[i].main.humidity)}%`)
            // $('.w-humidity-' + i).text(`dt_txt ${response.list[i].dt_txt}`)
        }

        for (let j = 0; j < 40; j++) {

            if (response.list[j].dt_txt === '2019') {

                console.log(response.list[j].dt_txt)
            }

        }

    })
    for (let i = 1; i < 6; i++) {
        $('.card-title-' + i).text(moment().add(i, 'days').format('MM/DD/YYYY'))

    }

}

$('#w-search').on('click', function () {
    console.log($('#input').val())
    let city = $('#input').val()
    getWeather(city)

    cityArr.push(city)
    console.log(cityArr)
    saveCity(city)

    createCityBtns(city)


})

function saveCity(city) {
    localStorage.setItem('cityList', JSON.stringify(cityArr))

}

function loadCities() {

    if (localStorage.getItem('cityList') === null) {
        cityArr = []
    } else {

        cityArr = JSON.parse(localStorage.getItem('cityList'))
        cityArr.forEach(function (city) {
            createCityBtns(city)
        })
    }
}

function createCityBtns(city) {
    let cityBtn = $('<button>').text(city)
    cityBtn.addClass('btn btn-outline-info btn-block')
    $('.cities').append(cityBtn)
}