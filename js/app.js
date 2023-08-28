const cityForm = document.querySelector('[data-js="change-location"]')
const cityNameContarnier = document.querySelector('[data-js="city-name"]')
const cityWeatherContarnier = document.querySelector('[data-js="city-weather"]')
const cityTemparatureContarnier = document.querySelector('[data-js="city-temperature"]')
const cityCard = document.querySelector('[data-js="city-card"]')
let timeImg = document.querySelector('[data-js="time"]')
const timeIconContainer = document.querySelector('[data-js="time-icon"]')

const showCityCard = () => {
    
    if (cityCard.classList.contains('d-none')) {

        cityCard.classList.remove('d-none')
    }
}


const addTextContent = (container, content) => container.textContent = content

const fetchCityWeatherInfo = async (CityName) => {

    const [{ Key, LocalizedName }] = await getCityData(CityName)
    const [{WeatherText, Temperature, IsDayTime, WeatherIcon }] = await getCityWeather(Key)

    return { LocalizedName, WeatherText, Temperature, IsDayTime, WeatherIcon }
}


const showCityWeatherInfo = async CityName => {

    await fetchCityWeatherInfo(CityName)

    const timeIcon = `<img src="/src/icons/${WeatherIcon}.svg"/>`
    
    IsDayTime ? timeImg.src = '/src/day.svg' :  timeImg.src = '/src/night.svg'
    
    
    timeIconContainer.innerHTML = timeIcon
    
    addTextContent(cityNameContarnier, LocalizedName)
    addTextContent(cityWeatherContarnier, WeatherText)
    addTextContent(cityTemparatureContarnier, Temperature.Metric.Value)

    showCityCard()
}

const showLocalStorage = () => {
    const city = localStorage.getItem('city')

    if (city) {
        showCityWeatherInfo(city)
    }
}

cityForm.addEventListener('submit', async event => {
    event.preventDefault()
    const inputValue = event.target.city.value
    

      showCityWeatherInfo(inputValue)


      localStorage.setItem('city', inputValue)

        
        cityForm.reset()
    }
)

showLocalStorage()