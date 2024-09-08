import React from 'react'
import "./more.css"
import Moreslider from './Moreslider';
import { useToast } from '@chakra-ui/react'


export default function More({data, error}) {

  const toast = useToast()
  if (error) {
    toast({
      title: 'City not found.',
      description: "Please check the city entered to see if there is a mix-up.",
      status: 'error',
      duration: 2000,
      isClosable: true,
    })

    return
    // return <div>Error: {error.message}</div>;
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
