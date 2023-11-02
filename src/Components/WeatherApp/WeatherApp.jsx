import React, { useState } from 'react';
import './WeatherApp.css';
import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
import humidity_icon from '../Assets/humidity.png';

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState({
    humidity: null,
    windSpeed: null,
    temperature: null,
    location: null,
  });

  const [wicon, setWicon] = useState(cloud_icon);
  const api_key = "138f55e0b4f3dda5681c721c2dbf7c19";

  const search = async () => {
    const cityInput = document.querySelector(".cityInput");

    if (cityInput.value === "") {
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${api_key}`;
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setWeatherData({
          humidity: data.main.humidity,
          windSpeed:Math.floor (data.wind.speed),
          temperature: Math.floor(data.main.temp),
          location: data.name,
        });

        // Correct the weather icon checks
        const icon = data.weather[0].icon;
        if (icon === '01d' || icon === '01n') {
          setWicon(clear_icon);
        } else if (icon === '02d' || icon === '02n') {
          setWicon(cloud_icon);
        } else if (icon === '03d' || icon === '03n' || icon === '04d' || icon === '04n') {
          setWicon(drizzle_icon);
        } else if (icon === '09d' || icon === '09n' || icon === '10d' || icon === '10n') {
          setWicon(rain_icon);
        } else if (icon === '13d' || icon === '13n') {
          setWicon(snow_icon);
        } else {
          setWicon(cloud_icon); 
        }
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="Search" />
        <div className="search-icon" onClick={search}>
          <img src={search_icon} alt="" />
        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="" />
      </div>
      <div className="weather-temp">
        {weatherData.temperature !== null ? `${weatherData.temperature}°C` : 'Loading...'}
      </div>
      <div className="weather-location">
        {weatherData.location || 'Enter a location'}
      </div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent">
              {weatherData.humidity !== null ? `${weatherData.humidity}%` : 'Loading...'}
            </div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" className="icon" />
          <div className="data">
            <div className="wind-rate">
              {weatherData.windSpeed !== null ? `${weatherData.windSpeed} km/h` : 'Loading...'}
            </div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
