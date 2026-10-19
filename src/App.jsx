import { useState } from 'react'
import SearchBar from './components/SearchBar.jsx'
import WeatherCard from './components/WeatherCard.jsx'
import { fetchWeatherByCity } from './api/weather.js'
import './App.css'

function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async () => {
    const query = city.trim()
    if (!query) return

    setLoading(true)
    setError('')
    try {
      const data = await fetchWeatherByCity(query)
      setWeather(data)
    } catch (err) {
      setWeather(null)
      setError(err.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="app">
      <h1>Weather App</h1>
      <p className="subtitle">Built with React + Vite</p>

      <SearchBar
        value={city}
        onChange={setCity}
        onSearch={handleSearch}
        disabled={loading}
      />

      {error && <p className="error">{error}</p>}
      {weather && <WeatherCard weather={weather} />}
      {!weather && !error && !loading && (
        <p className="hint">Enter a city name to see the current weather.</p>
      )}
    </main>
  )
}

export default App
