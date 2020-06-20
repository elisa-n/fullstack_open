import React, {useState, useEffect} from 'react';
import axios from 'axios'

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState('')

  useEffect(() => {
    const API_KEY = process.env.REACT_APP_WEATHERSTACK_API_KEY
    axios.get('http://api.weatherstack.com/current', {
      params: {
        'access_key': API_KEY,
        'query': capital,
      }
    })
    .then(response => {
      setWeather(response.data.current);
      console.log('w:', weather)
    }
    );
  }, []);

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p><strong>temperature: </strong> {weather.temperature} Celcius</p>
      <img src={weather.weather_icons} width="100" />
      <p><strong>wind: </strong> {weather.wind_speed} mph direction {weather.wind_dir}</p>
      {console.log('ww:', weather)}
    </div>
  )
}

export default Weather;