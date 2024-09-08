import React from 'react';
import './Weather.css';
import sunnyImage from "./sunny.svg"
import Lottie from 'lottie-react';
import loader from "./loader.json"



export default function Weather({ loc, data, error }) {
  if (error) {
    return <p className='err'>{error}</p>;
  }

  if (!data || !loc) {
    return <Lottie animationData={loader}/>;
  }

  const now = new Date()

  function capitalize(str) {
    if (str.length === 0) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className='weatherbox'>
      <div className="locandtime">
        {loc.state ? `${loc.state}, ` : ''}{loc.name},{loc.country} As of {now.getHours()>= 0 && now.getHours()<= 9 ? `0${now.getHours()}`:now.getHours()}:{now.getMinutes()>=0 && now.getMinutes<=9 ? `0${now.getMinutes()}`:now.getMinutes() } GMT
      </div>
      <div className="info">
        <div className="deg">
          {data.main.temp}&deg;
        </div>
        <div className="moodandday">
          {capitalize(data.weather[0].description)}
          <div className="timeofday">
            Day {data.main.temp_max}° • Night {data.main.temp_min}°
          </div>
        </div>
      </div>
      <div className="icon">
        <img src={sunnyImage} alt="Sunny day" />
      </div>
    </div>
  );
}
