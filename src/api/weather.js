// Open-Meteo: free, real weather data, no API key required.
const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search'
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast'

// WMO weather codes -> label + emoji
const WEATHER_CODES = {
  0: ['Clear sky', '☀️'],
  1: ['Mainly clear', '🌤️'],
  2: ['Partly cloudy', '⛅'],
  3: ['Overcast', '☁️'],
  45: ['Fog', '🌫️'],
  48: ['Rime fog', '🌫️'],
  51: ['Light drizzle', '🌦️'],
  53: ['Drizzle', '🌦️'],
  55: ['Dense drizzle', '🌧️'],
  61: ['Light rain', '🌧️'],
  63: ['Rain', '🌧️'],
  65: ['Heavy rain', '🌧️'],
  71: ['Light snow', '🌨️'],
  73: ['Snow', '🌨️'],
  75: ['Heavy snow', '❄️'],
  80: ['Rain showers', '🌦️'],
  81: ['Rain showers', '🌧️'],
  82: ['Violent showers', '⛈️'],
  95: ['Thunderstorm', '⛈️'],
  96: ['Thunderstorm with hail', '⛈️'],
  99: ['Thunderstorm with hail', '⛈️'],
}

export function describeWeather(code) {
  const [label, icon] = WEATHER_CODES[code] ?? ['Unknown', '❓']
  return { label, icon }
}

export async function fetchWeatherByCity(city) {
  // 1) City name -> coordinates
  const geoRes = await fetch(
    `${GEO_URL}?name=${encodeURIComponent(city)}&count=1&language=en&format=json`,
  )
  if (!geoRes.ok) throw new Error('Could not look up that city.')
  const geoData = await geoRes.json()
  if (!geoData.results || geoData.results.length === 0) {
    throw new Error(`No city found for "${city}".`)
  }
  const { name, country, latitude, longitude } = geoData.results[0]

  // 2) Coordinates -> current weather
  const params = new URLSearchParams({
    latitude,
    longitude,
    current:
      'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m',
    timezone: 'auto',
  })
  const wxRes = await fetch(`${FORECAST_URL}?${params}`)
  if (!wxRes.ok) throw new Error('Could not load weather data.')
  const wx = await wxRes.json()
  const c = wx.current
  const { label, icon } = describeWeather(c.weather_code)

  return {
    city: name,
    country,
    temperature: Math.round(c.temperature_2m),
    feelsLike: Math.round(c.apparent_temperature),
    humidity: c.relative_humidity_2m,
    windSpeed: Math.round(c.wind_speed_10m),
    condition: label,
    icon,
    updatedAt: c.time,
  }
}
