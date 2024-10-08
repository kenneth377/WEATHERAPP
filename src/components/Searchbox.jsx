import React, { useState } from 'react';
import './searchbox.css';

export default function Searchbox({ searchbycity, prevcitychange,getprevcity }) {
  const [inputval, setInputval] = useState("");

  function trackval(e) {
    setInputval(e.target.value);
  }

  function handlesearch() {
    if(getprevcity().toLowerCase() === inputval.toLowerCase()){
      setInputval("");
      return;
    }
    if (inputval.trim()) {
      searchbycity(inputval);
      setInputval("");
    }
  } 

  function handleclick(city) {
    if(getprevcity().toLowerCase() === city.toLowerCase()){
      return;
    }
    prevcitychange(city)
    searchbycity(city);
  }

  return (
    <div className='searchbox'>
      <input
        type="text"
        placeholder='Enter a city to search for'
        value={inputval}
        onChange={trackval}
      />
      <button type="submit" className='searchbtn' onClick={handlesearch}>Search</button>
      <h3>Popular places to search</h3>
      <div className="buttonbox">
        <button onClick={() => handleclick("Accra")}>Accra</button>
        <button onClick={() => handleclick("London")}>London</button>
        <button onClick={() => handleclick("Chicago")}>Chicago</button>
        <button onClick={() => handleclick("New York")}>New York</button>
        <button onClick={() => handleclick("Abu Dhabi")}>Abu Dhabi</button>
      </div>
    </div>
  );
}
