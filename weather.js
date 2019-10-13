// class Weather {
//     constructor(city) {
//         this.apikey = '14d09a756bf3ab9066ec4aca0c409bb6';
//         this.city = city;
//     }



//     // Fetch Weather from API
//     // async getWeather() {
//     //     const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=imperial&APPID=${this.apikey}`);

//     //     const responseData = await response.json();

//     //     return responseData;
//     // }

//     // Fetch UVI from API
//     // async getUVI() {
//     //     // const response = await fetch(`http://api.openweathermap.org/data/2.5/uvi?appid=${this.apikey}&lat=${this.lat}&lon=${this.lon}`)
//     //     const response = await fetch(`http://api.openweathermap.org/data/2.5/uvi?appid=${this.apikey}&lat=${response.coord.lat}&lon=${response.cood.lon}`)
//     //     const responseData = await response.json();

//     //     return UVI;
//     //     console.log(UVI)
//     // }

//     // Change the location
//     changeLocation(city) {
//         this.city = city;

//     }


// }