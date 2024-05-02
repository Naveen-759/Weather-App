import React from 'react'
import '../component/WeatherApp.css'
import clear from '../images/clear.png'
import cloud from '../images/cloud.png'
import drizzle from '../images/drizzle.png'
import humidity_icon from '../images/humidity.png'
import rain from '../images/rain.png'
import search_icon from '../images/search.png'
import snow from '../images/snow.png'
import wind from '../images/wind.png'

export default function WeatherApp() {
    let api_key = "18f5c10d8d803a96d1818a82f5619d2c";
    const [wicon , setWicon] = React.useState("cloud")
    const search = async () => {
        const element = document.getElementsByClassName("cityInput")
        if(element[0].value === ""){
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`
        let response =  await fetch(url);
        let data = await response.json();
        const humidity = document.getElementsByClassName("humidity-percent")
        const wind = document.getElementsByClassName("wind-rate")
        const temperature = document.getElementsByClassName("weather-temp")
        const location = document.getElementsByClassName("weather-location")

        humidity[0].innerHTML = data.main.humidity+'%';
        wind[0].innerHTML = data.wind.speed+'km/h';
        temperature[0].innerHTML = data.main.temp+ '°C';
        location[0].innerHTML = data.name;

        if ( data.weather[0].icon === "01d" || data.weather[0].icon === "01n" ){
            setWicon(clear);
        } else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
            setWicon(cloud);
        } else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {
            setWicon(drizzle);
        } else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
            setWicon(drizzle);
        } else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
            setWicon(rain);
        } else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
            setWicon(rain);
        } else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
            setWicon(snow);
        } else {
            setWicon(clear);
        }


    }

    return (
        <div className='container'>
            <div className='top-bar'>
                <input type='text' className='cityInput' placeholder='Serach'></input>
                <div className='search-icon' onClick={() => search()}>
                    <img src={search_icon} alt='search'></img>
                </div>
            </div>
            <div className='weather-image'>
                <img src={wicon} alt='cloud'></img>
            </div>
            <div className='weather-temp'></div>
            <div className='weather-location'></div>
            <div className='data-container'>
                <div className='element'>
                    <img src={humidity_icon} alt='humidity' className='icon'></img>
                    <div className='data'>
                        <div className='humidity-percent'>64%</div>
                        <div className='text'>Humidity</div>
                    </div>
                </div>
                <div className='element'>
                    <img src={wind} alt='wind' className='icon'></img>
                    <div className='data'>
                        <div className='wind-rate'>64%</div>
                        <div className='text'>wind Speed</div>
                    </div>
                </div>

            </div>

        </div>

    )
}