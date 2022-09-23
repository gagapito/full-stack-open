import React, { useState, useEffect } from 'react'
import axios from 'axios'
import LangRender from './LangRender'

const Country = ({ country }) => {
    const [weather, setWeather] = useState([])

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${process.env.REACT_APP_API_KEY}`)
            .then(response => {
                const apiResponse = response.data;
                console.log(apiResponse)
                console.log(`Current temperature in ${apiResponse.name} is ${apiResponse.main.temp}℃`)
                setWeather([apiResponse])
            }).catch(error => {
                console.log(error);
        })
    })

    if (weather.length > 0) {
        const currentWeather = weather[0]
        return (
            <div>
                <h1>{country.name.common}</h1>
                <p>capital: {country.capital}</p>
                <p>area: {country.area}</p>
                <h2>Languages</h2>
                <ul>
                    <LangRender country={country} />
                </ul>
                <img src={country.flags.png} alt={country.flag} />
                <h2>Weather in {country.capital}</h2>
                <p>temperature: {Math.ceil(currentWeather.main.temp - 273)}° Celcius</p>
                <img src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`} alt="Weather icon"></img>
                <p>wind: {currentWeather.wind.speed} meter/sec </p>
            </div>
        )
    }

    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>capital: {country.capital}</p>
            <p>area: {country.area}</p>
            <h2>Languages</h2>
            <ul>
                <LangRender country={country} />
            </ul>
            <img src={country.flags.png} alt={country.flag} />
        </div>
    )
}

export default Country 