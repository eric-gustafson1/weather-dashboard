$(document).ready(function () {
    getWeather()
    getForcast()
});

$('#w-change-btn').on('click', function () {
    weather.changeLocation($('#city').val());
    getWeather();
    $('#locModal').modal('hide');
    storage.setLocationData($('#city').val())
})

function getWeather() {
    let city = 'Denver';
    let apikey = '14d09a756bf3ab9066ec4aca0c409bb6';
    let queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${apikey}`;
    // console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // console.log(response)

        $('#w-location').text(response.name)
        $('#w-day').text(moment().format('(MM/DD/YYYY)'))
        $('#w-icon').attr('src', `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`)
        $('#w-temp').text('Tempurature: ' + Math.floor(response.main.temp) + '°F with ' + response.weather[0].description)
        $('#w-hiLow').text(`Today's Low: ${Math.floor(response.main.temp_min)}°F / High: ${Math.floor(response.main.temp_max)}°F`)
        $('#w-humidity').text(`Relative Humidity: ${response.main.temp}%`)
        $('#w-wind').text(`Wind Speed: ${response.wind.speed} mph`)
        $('#w-uvIndex').text('UV Index:')
    })

}

function getForcast() {

    let city = 'Denver';
    let apikey = '14d09a756bf3ab9066ec4aca0c409bb6';
    let queryURL = `http://api.openweathermap.org/data/2.5/forecast?q=${city},us&units=imperial&APPID=${apikey}`
    // console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        console.log(response.list[1].weather[0].icon)

        for (let i = 1; i < 6; i++) {

            $('.w-icon-' + i).attr('src', `http://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png`)
            $('.w-temp-' + i).text(`Temp: ${Math.floor(response.list[i].main.temp_max)}°F`)
            $('.w-humidity-' + i).text(`Humidity: ${Math.floor(response.list[i].main.humidity)}%`)
        }

    })
    for (let i = 1; i < 6; i++) {
        $('.card-title-' + i).text(moment().add(i, 'days').format('MM/DD/YYYY'))

    }

}