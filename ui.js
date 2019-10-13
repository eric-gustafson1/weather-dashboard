class UI {
    constructor() {
        this.location = $('#w-location');
        this.day = $('#w-day')
        this.desc = $('#w-desc');
        this.temp = $('#w-temp');
        this.icon = $('#w-icon');
        this.humidity = $('#w-humidity');
        this.hiLow = $('#w-hiLow');
        this.wind = $('#w-wind');

    }

    paint(weather) {
        $(this.location).text(weather.name)
        $(this.day).text(moment().format('(MM/DD/YYYY)'))
        $(this.desc).text(weather.weather[0].description)
        $(this.temp).text('Tempurature: ' + Math.floor(weather.main.temp) + '°F with ' + weather.weather[0].description)
        $(this.icon).attr('src', `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`)
        $(this.humidity).text(`Relative Humidity: ${weather.main.temp}%`)
        $(this.hiLow).text(`Today's Low: ${Math.floor(weather.main.temp_min)}°F / High: ${Math.floor(weather.main.temp_max)}°F`)
        $(this.wind).text(`Wind Speed: ${weather.wind.speed} mph`)

    }
}