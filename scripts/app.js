const cityForm = document.querySelector('.change_location');




const infoDisplay = document.querySelector('.container');

const details = document.querySelector('.info');

const time = document.querySelector('.time_image');

const icon = document.querySelector('.icon img');



const updateUi = (data) => {

    const cityDets = data.cityDets;
    const weather = data.weather;





    details.innerHTML = `
     <h5 class="city__name">${cityDets.EnglishName}</h5>
            <div class="condition">${weather.WeatherText}</div>
            <div class="weather_display">
                <span>${weather.Temperature.Metric.Value}</span>
                <span>&deg;C </span>
            </div>
    `;


    //change image to day or night

    let timeSrc = null;
    if (weather.IsDayTime) {
        timeSrc = 'day.jpg';
    } else {
        timeSrc = 'night.jpg';
    }

    time.setAttribute('src', timeSrc);

    //    icons set

    const iconSrc = `icons/${weather.WeatherIcon}.svg`;

    icon.setAttribute('src', iconSrc);

    if (infoDisplay.classList.contains('container_visibility')) {
        infoDisplay.classList.remove('container_visibility');
    }

};



const updadeCity = async(city) => {



    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return {
        cityDets: cityDets,
        weather: weather
    }

};



cityForm.addEventListener('submit', e => {

    e.preventDefault();

    const city = cityForm.city.value.trim();
    cityForm.reset();



    updadeCity(city)
        .then(data => updateUi(data))
        .catch(err => console.log(err));
});