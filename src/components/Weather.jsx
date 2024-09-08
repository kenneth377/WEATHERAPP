import React,{useState, useEffect} from 'react';
import './Weather.css';
import sunnyImage from "./sunny.svg"
import Lottie from 'lottie-react';
import loader from "./loader.json"
import cloudlottie from "./cloudlottie.json"
import sunnylottie from "./sunnylottie.json"



export default function Weather({ loc, data, error,prevcitychange,coord }) {

  const [iconlink, setIconLink] = useState(sunnylottie);
  const [now, setNow] = useState(new Date())
  const [zone,setZone] = useState("GMT")
  const timekey = process.env.REACT_APP_TIME_KEY

  useEffect(() => {
    fetch(`https://api-bdc.net/data/timezone-by-location?latitude=${coord.lat}&longitude=${coord.lon}&key=${timekey}`)
      .then(res => res.json())
      .then(data => {
        if (data.localTime) {
          setNow(new Date(data.localTime));
          setZone(data.effectiveTimeZoneShort || "GMT");
        }
      })
      .catch(error => console.error('Error fetching time data:', error));
  }, [data]);

  useEffect(() => {
    if (error) {
      prevcitychange("");
    }
  }, [error, prevcitychange]);

  useEffect(() => {
    if (data) {
      if (data.main.temp > 22) {
        setIconLink(sunnylottie);
      } else {
        setIconLink(cloudlottie);
      }
    }
  }, [data]);

  if (error) {
    prevcitychange("")
    return <p className='err'>{error}</p>;
  }

  if (!data || !loc) {
    return <Lottie animationData={loader}/>;
  }


  function capitalize(str) {
    if (str.length === 0) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className='weatherbox'>
      <div className="locandtime">
        {loc.state ? `${loc.state}, ` : ''}{loc.name},{loc.country} As of {now.getHours()>= 0 && now.getHours()<= 9 ? `0${now.getHours()}`:now.getHours()}:{now.getMinutes()>=0 && now.getMinutes<=9 ? `0${now.getMinutes()}`:now.getMinutes()} {zone}
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
        <Lottie className='icon' animationData={iconlink} />
      </div>
    </div>
  );
}
