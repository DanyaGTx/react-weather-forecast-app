import { useMemo } from 'react';
import { useState } from 'react';
import './App.css';
import toCelsium from './functions/transformToCelsium';
import transofrmWindToKph from './functions/transofrmWindToKph';

function App() {
  const API_KEY = '1b69cd864cb84e45141da41996ffd63d';
  const [city,setCity] = useState('');
  const [tempData, setTempData] = useState({
    temp: null,
    city: null,
    humidity: null,
  })
  const getWheaterFromApi = () =>{
    if(city.trim()){ //не можем сделать запрос пока не введем что нибудь
      let response =  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
      .then(res => res.json())
      .then((data) => {
        console.log(data);  
        setTempData({...tempData, //изменение мутбально зачений объекта
          temp: toCelsium(data.main.temp),
          city: data.name,
          humidity: data.main.humidity,
          country: data.sys.country,
          description: data.weather[0].description,   
          wind: transofrmWindToKph(data.wind.speed),  
        })
      })
      .catch(e => {
        alert('City not found')
        setCity('')
      });
      console.log(response)
    }
    
   
  }
  return (
    <div className='container'>
      <h1>Weather forecast Application</h1>
      <div className='search__block'>
      <input className='myWeatherInput' onChange={e => setCity(e.target.value)} value={city} type='text' placeholder='Enter city'/>
      <button className='myWeatherButton' onClick={getWheaterFromApi}>Search</button>
      </div>
    
      <div className='weather-information'>{tempData.temp ? <div>Temperature in {tempData.city}: {tempData.temp} C <p>Humidity: {tempData.humidity}%</p><span>Country: {tempData.country}</span><p>Sky: {tempData.description}</p><p>Wind speed: {tempData.wind} kph</p></div> : <h4 className='find-weather__text'>Find out about the weather now</h4>}</div>
    </div>
  );
}

export default App;
