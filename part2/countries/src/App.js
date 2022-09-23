import { useState, useEffect } from 'react'
import axios from 'axios'
import Content from './components/Content'
import Filter from './components/Filter'

const App = () => {
  const [countries, setCountries] = useState([])
  const [allCountries, setAllCountries] = useState([])
  const [newInput, setNewInput] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setAllCountries(response.data)
      })
  }, [])

  const handleInputChange = (event) => {
    setNewInput(event.target.value)
    console.log(event.target.value)
    if (newInput) {
      const regex = new RegExp(newInput, 'i');
      const filteredCountries = () => allCountries.filter(country => country.name.common.match(regex))
      setCountries(filteredCountries)
    }
  }

  return (
    <div>
      <Filter value={newInput} onChange={handleInputChange} />
      <Content countries={countries} setCountries={setCountries} />
    </div>
  )
}

export default App

