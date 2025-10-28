import React, { useState } from 'react'
import axios from 'axios'
import './styles.css'

function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState('')

  const fetchWeather = async () => {
    try {
      setError('')
      const response = await axios.get(`http://localhost:4000/api/weather?city=${city}`)
      setWeather(response.data)
    } catch (err) {
      setWeather(null)
      setError('City not found or server error.')
    }
  }

  return (
    <div className="container">
      <h1>🌦️ Weather Dashboard</h1>
      <div className="input-section">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
  <div className="weather-card">
    <h2>{weather.name}</h2>
    <img
      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
      alt="icon"
      className="weather-icon"
    />
    <p>{weather.weather[0].description}</p>
    <p>🌡️ {Math.round(weather.main.temp - 273.15)}°C</p>
    <p>💨 Wind: {weather.wind.speed} m/s</p>
    <p>💧 Humidity: {weather.main.humidity}%</p>
  </div>
)}

    </div>
  )
}

export default App
