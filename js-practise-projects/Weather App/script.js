const form = document.querySelector('.citysearcherform');
const input = document.querySelector('.citylocator');

const cityAndCountryName = document.querySelector('.cityAndCountryName');
const currentTemperature = document.querySelector('.currentTemperature');
const weatherCondition = document.querySelector('.weatherCondition');
const weatherIcon = document.querySelector('.weatherIcon');
const humidity = document.querySelector('.humidity');
const windSpeed = document.querySelector('.windSpeed');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    linker(input.value);
    form.reset();
})

async function linker(inputvalue) {
    const weatherInfo = await getWeather(inputvalue);
    uiInstructor(weatherInfo);
}

async function getWeather(cityname) {
    try {
        const response = await fetch(`https://wttr.in/${cityname}?format=j1`);
        if (response.ok) {
            const data = await response.json(); 
            return data;
        } else {
            throw new Error('Failed to fetch data');
        }
    } 
    catch (error) {
        console.error('Error:', error); 
    }
}

function uiInstructor(weatherInfo) {
    console.log(weatherInfo);
    cityAndCountryName.textContent = `City Name: ${weatherInfo.nearest_area[0].areaName[0].value}\nCountry Name: ${weatherInfo.nearest_area[0].country[0].value}`;

    currentTemperature.textContent = `Current Temperature: ${weatherInfo.current_condition[0].temp_C} °C / ${weatherInfo.current_condition[0].temp_F} °F`;

    weatherCondition.textContent = `Weather Condition: ${weatherInfo.current_condition[0].weatherDesc[0].value}`;

    const img = new Image();
    img.src = `${weatherInfo.current_condition[0].weatherIconUrl[0].value}`;

    weatherIcon.textContent = `Weather Icon: `;
    weatherIcon.appendChild(img);

    humidity.textContent = `Humidity: ${weatherInfo.current_condition[0].humidity}%`;

    windSpeed.textContent = `Wind Speed: ${weatherInfo.current_condition[0].windspeedKmph} Kmph / ${weatherInfo.current_condition[0].windspeedMiles} Mph`;
}