class Weather {
    constructor(city) {
        this.apikey = '14d09a756bf3ab9066ec4aca0c409bb6';
        this.city = city;
    }

    // Fetch Weather from API
    async getWeather() {
        // const response = await fetch(`api.openweathermap.org/data/2.5/weather?q=${this.city}&units=imperial,${this.apikey}`);
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=imperial&APPID=${this.apikey}`);

        const responseData = await response.json();

        return responseData;
    }

    // Change the location
    changeLocation(city) {
        this.city = city;

    }

}