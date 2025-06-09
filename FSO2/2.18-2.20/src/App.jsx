import { useState, useEffect } from 'react'
import axios from 'axios'

const FindField = ({ setCountry }) => <div>find countries <input onChange={ setCountry }/></div>

const GetLanguages = ({ languages }) => {

  const langValues = Object.values(languages)
  
  return (
    <ul>
      {langValues.map(lang => <li key={lang}>{lang}</li>)}
    </ul>
  )
}

const GetWeatherData = ({ city, setWeather }) => {
  const api_key = import.meta.env.VITE_SOME_KEY
    
  useEffect (() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city[0]}&appid=${api_key}&units=metric`)
      .then(response => {
        setWeather(response.data)
      })
      .catch(response => {
        setWeather('error')
      })
  }, [])
}

const GetWeather = ({ city }) => {
  const [weather, setWeather] = useState(null)

  GetWeatherData({city, setWeather})

  if (weather === null) return
  if (weather === 'error') return <p>No weather data(no API key given).</p>
  
  return (
    <div>
      <h2>Weather in {city}</h2>
      <p>Temperature {weather.main.temp} Celsius</p>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
      <p>Wind {weather.wind.speed}</p>
    </div>
  )
}

const CountryFinder = ({ country, countriesData, setCountry }) => {
  if ( countriesData === '' || country === '' ) return <div><p>Type to search</p></div>

  const countryNames = countriesData.map(countries => countries.name.common)
  const filteredCountries = countryNames.filter(countries => countries.toLowerCase().includes(country))

  if ( filteredCountries.length > 10 ) {
    return <div><p>Too many matches, specify another filter</p></div>
  } else if ( filteredCountries.length > 1 ) {
    return filteredCountries.map(country => <p key={country}>{country} <button type='button' onClick={() => setCountry(country)}>Show</button></p>)
  } else if ( filteredCountries.length === 0) {
    return <div><p>No matches.</p></div>
  }
  
  const selectedCountry = countriesData.find(({ name }) => name.common.toLowerCase() === filteredCountries[0].toLowerCase());

  return (
    <div>
      <h1>{selectedCountry.name.common}</h1>
      <p>Capital {selectedCountry.capital}</p>
      <p>Area {selectedCountry.area}</p>
      <h2>Languages</h2>
      <GetLanguages languages={selectedCountry.languages}/>
      <img src={selectedCountry.flags.png} />
      <GetWeather city={selectedCountry.capital}/>
    </div>
  )
}

const App = () => {
  const [country, setCountry] = useState('')
  const [countriesData, setCountriesData] = useState('')

  useEffect (() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {     
        setCountriesData(response.data)
      })
  }, [])

  const setNewCountry = (event) => {
    setCountry(event.target.value)
  }

  return (
    <div>
      <FindField setCountry={ setNewCountry }/>
      <CountryFinder country={ country.toLowerCase() } countriesData={ countriesData } setCountry={setCountry}/>
    </div>
  )
}

export default App