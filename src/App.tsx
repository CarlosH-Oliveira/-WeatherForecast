import React, { useEffect, useState } from 'react';
import './App.css';
import Header from "./components/header"
import Main from './components/main';

function App() {

  const[weatherData, setWeatherData] = useState()

  useEffect(function(){

    const getWeatherData = async() => {
      const weatherResponse = await fetch("http://api.weatherapi.com/v1/forecast.json?key=ca5c79c5ef574baeba6224504231611&q=-22.7598,-43.4516&days=5")
      if(weatherResponse.ok){
        var data = await weatherResponse.json()
        console.log(data)
        setWeatherData(data)
      }
    }
    
    getWeatherData()
  }, [])

  return (
    <div className="App">
      <Header/>
      {weatherData!=undefined?<Main data={weatherData}/>:null}
      <footer>
      </footer>
    </div>
  );
}

export default App;
