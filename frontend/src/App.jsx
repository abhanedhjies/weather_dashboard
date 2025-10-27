import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/weather?city=${city}`);
      setWeather(res.data);
    } catch (err) {
      alert("City not found");
    }
  };

  return (
    <div className="container">
      <h1>Weather Dashboard</h1>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeather}>Get Weather</button>

      {weather && (
        <div className="weather-card">
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Condition: {weather.weather[0].description}</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="icon"
          />
        </div>
      )}
    </div>
  );
}
