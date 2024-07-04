// script.js
document.addEventListener("DOMContentLoaded", function() {
    const apiKey = 'YOUR_API_KEY';
    const cityInput = document.getElementById('cityInput');
    const forecastContainer = document.querySelector('.forecast');

    function fetchWeatherData(city) {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
        
        fetch(url)
            .then(response => response.json())
            .then(data => updateWeatherUI(data));
    }

    function updateWeatherUI(data) {
        // Update today's overview
        const today = data.list[0];
        document.querySelector('.temperature').textContent = `${today.main.temp}°C`;
        document.querySelector('.weather-desc').textContent = today.weather[0].description;
        document.querySelector('.location-info span:nth-child(1)').textContent = data.city.name;
        document.querySelector('.location-info span:nth-child(2)').textContent = new Date(today.dt * 1000).toDateString();
        document.querySelector('.additional-info .info-item:nth-child(1)').textContent = `Wind Speed: ${today.wind.speed} km/h`;
        document.querySelector('.additional-info .info-item:nth-child(2)').textContent = `Humidity: ${today.main.humidity}%`;
        document.querySelector('.additional-info .info-item:nth-child(3)').textContent = `Pressure: ${today.main.pressure} hPa`;
        document.querySelector('.additional-info .info-item:nth-child(4)').textContent = `Visibility: ${today.visibility / 1000} km`;
        document.querySelector('.additional-info .info-item:nth-child(5)').textContent = `Sunrise: ${new Date(data.city.sunrise * 1000).toLocaleTimeString()}`;
        document.querySelector('.additional-info .info-item:nth-child(6)').textContent = `Sunset: ${new Date(data.city.sunset * 1000).toLocaleTimeString()}`;

        // Update 5 days forecast
        forecastContainer.innerHTML = '';
        data.list.forEach(item => {
            const forecastItem = document.createElement('div');
            forecastItem.className = 'forecast-item';
            forecastItem.innerHTML = `
                <div>${new Date(item.dt * 1000).toLocaleString()}</div>
                <div>${item.main.temp}°C</div>
                <div>${item.weather[0].description}</div>
            `;
            forecastContainer.appendChild(forecastItem);
        });
    }

    cityInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            fetchWeatherData(cityInput.value);
        }
    });

    fetchWeatherData('Istanbul'); // Default city
});
