import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import animation1 from './anim1.json';
import animation2 from './anim2.json';
import animation3 from './anim3.json';

export default function Moreslider({ data }) {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState("fadein");
  const [metric, setMetric] = useState("")

  const animationMap = {
    "Humidity": animation1,
    "Visibility": animation2,
    "Wind": animation3
  };

  useEffect(() => {
    const arr = Object.keys(data);

    if (arr.length === 0) {
      console.log("Array is empty");
      return;
    }

    const intervalId = setInterval(() => {
      setFade("fadeout")
      setTimeout(() => {
        setFade("fadein")
        setIndex((prevIndex) => (prevIndex + 1) % arr.length);
      }, 1000);
    }, 4000);

    return () => clearInterval(intervalId); 
  }, [data]);


  useEffect(() => {
    const arr = Object.keys(data);
    const currentKey = arr[index];
    if (currentKey === "Humidity") {
      setMetric("%");
    } else if (currentKey === "Visibility") {
      setMetric("km");
    } else if (currentKey === "Wind") {
      setMetric("m/s");
    }
  }, [index, data]);

  const arr = Object.keys(data);
  const currentKey = arr[index];
  const currentData = data[currentKey];

  const currentAnimation = animationMap[currentKey] || animation1
  return (
    <div>
      <Lottie className='lottie' animationData={currentAnimation} />
      <div className={`lottiedescr ${fade}`}>
        {currentKey==="Wind"?<h1 className={"win"} key={currentKey}>{currentKey}</h1>:<h1 key={currentKey} className='hum'>{currentKey}</h1>}
        {typeof currentData === 'object' && !Array.isArray(currentData) ? (
          Object.keys(currentData).map((key) => (
            key === "Direction" ? (
              <p key={key}>{key}: {currentData[key]}&deg;</p>
            ) : <p key={key}>{key}: {currentData[key]}{metric}</p>
          ))
        ) : (
          <p className='big'>{currentData}{metric}</p>
        )}
      </div>
    </div>
  );
}
