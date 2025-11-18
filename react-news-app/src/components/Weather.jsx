import React, { useEffect, useState } from 'react'
import './Weather.css'

const Weather = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

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
      <div className="search">
        <div className="search-top">
          <i className="fa-solid fa-location-dot"></i>
          <div className="location">{data.name}</div>
        </div>
        <div className="search-location">
          <input type="text" placeholder='Enter Location' value={location} onChange={handleInputChange} />
          <i className="fa-solid fa-magnifying-glass" onClick={search}></i>
        </div>
      </div>
      {data.notFound ? (<div>Not Found 🙁</div>) : (
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