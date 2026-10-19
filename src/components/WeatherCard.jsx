function WeatherCard({ weather }) {
  return (
    <div className="weather-card">
      <h2>
        {weather.city}, {weather.country}
      </h2>
      <div className="weather-main">
        <span className="weather-icon" aria-hidden="true">
          {weather.icon}
        </span>
        <span className="weather-temp">{weather.temperature}°C</span>
      </div>
      <p className="weather-condition">{weather.condition}</p>

      <div className="weather-details">
        <div>
          <span className="label">Feels like</span>
          <span>{weather.feelsLike}°C</span>
        </div>
        <div>
          <span className="label">Humidity</span>
          <span>{weather.humidity}%</span>
        </div>
        <div>
          <span className="label">Wind</span>
          <span>{weather.windSpeed} km/h</span>
        </div>
      </div>
    </div>
  )
}

export default WeatherCard
