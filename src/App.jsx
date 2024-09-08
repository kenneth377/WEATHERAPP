import './App.css';
import { useState, useEffect } from 'react';
import Weather from './components/Weather';
import Searchbox from './components/Searchbox';
import More from './components/More';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [latlon , setLatLon] = useState({"lon":-0.1969,"lat":5.556})

  const API_KEY = process.env.REACT_APP_API_KEY
 
  function searchbycity(city) {
    if (!city.trim()) {
      setWeatherData(null);
      return;
    }
  
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('City not found. Please try another city.');
        }
        return response.json();
      })
      .then(data => {
        setWeatherData(data);
        setLatLon({
          lat:data.coord.lat,
          lon:data.coord.lon
        })
        setError(null); 
      })
      .catch(err => {
        console.error('Fetch error for weather data:', err);
        console.log(err.message)
        setError(err.message);
        setWeatherData(null);
      });
  }
  
  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=6.700071&lon=-1.6163&units=metric&appid=${API_KEY}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok for weather data');
        }

        return response.json();
      })
      .then(data => setWeatherData(data))
      .catch(err => {
        console.error('Fetch error for weather data:', err);
        setError(err);
      });

    fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${latlon.lat}&lon=${latlon.lon}&limit=1&appid=${API_KEY}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok for location data');
        }
        return response.json();
      })
      .then(data => setLocation(data[0])) 
      .catch(err => {
        console.error('Fetch error for location data:', err);
        setError(err);
      });

  }, []);

  useEffect(() => {
    if (weatherData) {
      console.log("Weather data was set: ", weatherData);
    } else {
      console.log("Weather data not set yet");
    }
  }, [weatherData]);

  useEffect(() => {
    if (location) {
      console.log("Location was set: ", location);
    } else {
      console.log("Location not set yet");
    }
  }, [location]);

  useEffect(()=>{
    fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${latlon.lat}&lon=${latlon.lon}&limit=1&appid=2dfc101573f3ea097c17c45f84ddc6e9`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok for location data');
        }
        return response.json();
      })
      .then(data => setLocation(data[0])) 
      .catch(err => {
        console.error('Fetch error for location data:', err);
        setError(err);
      });

  },[latlon])

  return (
    <div className="App">
      <div className="container">
        <Weather loc={location} data={weatherData} error={error} />
        <Searchbox searchbycity={searchbycity}/>
        <More data={weatherData} error={error} />
      </div>
    </div>
  );
}

export default App;
