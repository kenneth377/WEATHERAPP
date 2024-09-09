import './App.css';
import { useState, useEffect } from 'react';
import Weather from './components/Weather';
import Searchbox from './components/Searchbox';
import More from './components/More';
import { useToast } from '@chakra-ui/react';
import searchlottie from '../src/components/searchlottie.json'
import Lottie from 'lottie-react';


function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [latlon , setLatLon] = useState({"lon":-0.1969,"lat":5.556});
  const [prevcity, setPrevCity] = useState("");
  const toast = useToast()
  const [isVisible, setIsVisible] = useState(true);
  const API_KEY = process.env.REACT_APP_API_KEY

  useEffect(() => {
    const handleResize = () => {
      setIsVisible(window.innerWidth > 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const toggleVisibility = () => {
    setIsVisible(prevState => !prevState);
  };

  function prevcitychange(city){
    setPrevCity(city)
  }
  function getprevcity(){
    return prevcity;
  }
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
        toast({
          title: 'City not found.',
          description: "Please check the city entered to see if there is a mix-up. If all seems to be fine, check your internet connectivity",
          status: 'error',
          duration: 4000,
          isClosable: true,
        })
        return
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
        <button onClick={toggleVisibility}> {isVisible ? 'X' : <div className='searchlottie'><Lottie animationData={searchlottie}/></div>}</button>
        <Weather loc={location} data={weatherData} error={error} prevcitychange={prevcitychange} coord={latlon}/>
        {isVisible &&<Searchbox searchbycity={searchbycity} getprevcity={getprevcity} prevcitychange={prevcitychange}/>}
        <More data={weatherData} error={error}/>
      </div>
    </div>
  );
}

export default App;
