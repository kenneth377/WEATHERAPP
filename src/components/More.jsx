import React from 'react'
import "./more.css"
import Moreslider from './Moreslider';


export default function More({data, error}) {
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  const keyObj = {
    "Humidity" : data.main.humidity,
    "Visibility" : data.visibility,
    "Wind" :
        { "Speed": data.wind.speed,
          "Direction": data.wind.deg,
          "Gust": data.wind.gust
        },
  }
  


  return (
    <div className='morebox'>
      <div className="daydescription">
        <Moreslider data={keyObj}/>
      </div>
    </div>
  )
}
