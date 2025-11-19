import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import Input from '../../Common/Input';




const Weather = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

 
  
  useEffect(() => {
    const fetchDefaultLocation = async () => {
      const defaultLocation = "St Louis"
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=Imperial&appid=de0af54d43123c94f77d29e171071ec0`
      try{
    const response = await fetch(url);
    console.log("Response status:", response.status);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const weatherData = await response.json();
      setData(weatherData)
      
  }

catch (error) {
            console.error("Error fetching weather:", error);
}
    }
    fetchDefaultLocation()
  }, [])

const getLocalTime = () => {
  if (!data.timezone) return "";

  const localDate = new Date(Date.now() + data.timezone * 1000);
  let hours = localDate.getUTCHours();
  const minutes = localDate.getUTCMinutes();

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // convert 0 → 12

  return `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
};


  const search = async () => {
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Imperial&appid=de0af54d43123c94f77d29e171071ec0`
    try{
    const response = await fetch(url);
    console.log("Response status:", response.status);
    if (!response.ok) {
     
      setData({notFound : true})
      setLocation("");
    } else {
      const weatherData = await response.json();
      setData(weatherData);
      setLocation("");
    }

    
  }

catch (error) {
            if(error.response && error.response.status === 404){
              setData({notFound : true})
            } else {
              console.error("An unexpected error Occurred", error)
            }

}
}

const handleInputChange = (e) => {
    setLocation(e.target.value);
  } 

  const getWeatherIcon = (weatherType) => {
    switch(weatherType) {
      case "Clear" :
        return <i className='bx bxs-sun'></i>
      
      case "Clouds" :
        return <i className='bx bxs-cloud'></i>

      case "Rain" :
        return <i className='bx bxs-cloud-rain'></i>

      case "Thunderstorm" :
        return <i className='bx bxs-cloud-lightning'></i>

      case "Snow" :
        return <i className='bx bxs-cloud-snow'></i>

      case "Haze" :
      case "Mist" :
        return <i className='bx bxs-cloud'></i>

      default :
        return <i className='bx bxs-cloud'></i>
    }
  }

  return (
    <div className='weather'>
      <div className="city-time">{getLocalTime()}</div>
      <div className="search">
        <div className="search-top">
          <i className="fa-solid fa-location-dot"></i>
          <div className="location">{data.name}</div>
          
        </div>
        <div className="search-location">
          <Input 
           name = "location" 
           type = "text"
           placeholder="Enter Location"
           value={location}
           handleChange={handleInputChange}
           ref={inputRef}
          />
          <i className="fa-solid fa-magnifying-glass" onClick={search}></i>
        </div>
      </div>
      {data.notFound ? (<div>City Not Found 🙁</div>) : (
        <div className="weather-data">
        {data.weather && data.weather[0] && getWeatherIcon(data.weather[0].main)} 
        <div className="weather-type">{data.weather ? data.weather[0].main : null}</div>
        <div className="temp">{data.main ? `${Math.floor(data.main.temp)}°` : null}</div>
        </div>
      )}
      
    </div>
  )
}

export default Weather