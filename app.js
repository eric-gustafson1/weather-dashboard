const ui = new UI();
const storage = new Storage()
const weatherLocation = storage.getLocationData()
const weather = new Weather(weatherLocation.city);

$(document).ready(function () {
    getWeather()
});

function getWeather() {

    weather.getWeather()
        .then(results => {
            console.log(results)
            ui.paint(results)
        })
        .catch(err => console.log(err))
}

$('#w-change-btn').on('click', function () {
    weather.changeLocation($('#city').val());
    getWeather();
    $('#locModal').modal('hide');
    storage.setLocationData($('#city').val())
})