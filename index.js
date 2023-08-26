const container = document.querySelector('.container');
//const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector(' .weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

const search = document.querySelector('.search-box button');
const locationInput = document.getElementById('locationInput');

// Add an event listener for the Enter key press event on the input field
locationInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        search.click(); // Trigger the click event of the search button
    }
});

search.addEventListener('click', () =>{ 
    const APIKey = '22af15a98e3e3fa2fe1762b0558c3d69';
    const searchInput = document.querySelector('.search-box input');
    const location = searchInput.value;

    if (location === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIKey}`)
    .then(response => response.json())
    .then(json => {
        
        if (json.cod === '404') {
            // Show 404 message
            error404.style.display = 'block';
            error404.classList.add('fadeIn');
            // Reset other sections
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            // Adjust container height
            container.style.height = '400px'; // You can adjust this value as needed
        } else {
            // Show weather info
            error404.style.display = 'none';
            error404.classList.remove('fadeIn');
            // Show weather sections
            weatherBox.style.display = 'block';
            weatherDetails.style.display = 'flex';
            // Adjust container height
            container.style.height = '590px'; // You can adjust this value as needed
        }
        
        const img = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');
        
        switch(json.weather[0].main) {
            case 'Clear':
                img.src = 'images/clear.png';
                break;

            case 'Rain':
            case 'Drizzle':
                img.src = 'images/rain.png';
                break;

            case 'Snow':
                img.src = 'images/snow.png';
                break;

            case 'Clouds':
                img.src = 'images/cloud.png';
                break;

            case 'Haze':
                img.src = 'images/mist.png';
                break;

            case 'Smoke':
                img.src = 'images/smoke2.png';
                break;

            case 'Fog':
                img.src = 'images/fog.png';
                break;
                
            default:
                img.src = '';
        }

        temperature.innerHTML = `${parseInt(json.main.temp, 10)-273}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '590px';
        weatherDetails.style.marginTop = '30px';
    });
    
});