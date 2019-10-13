class Storage {
    constructor() {
        // this.city = city
        this.defaultCity = 'Highlands Ranch'
    }

    setLocationData(city) {
        localStorage.setItem('city', city)
    }

    getLocationData() {
        if (localStorage.getItem('city') === null) {
            this.city = this.defaultCity

        } else {
            this.city = localStorage.getItem('city')
        }

        return {
            city: this.city
        }
    }
}