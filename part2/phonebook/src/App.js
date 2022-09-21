import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    console.log('effect')

    const eventHandler = response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    }

    const promise =axios.get('http://localhost:3001/persons')
    promise.then(eventHandler)
  }, [])

  const personFormFunctions = {
    addPerson: (event) => {
      event.preventDefault()
      const personNames = persons.map(person => person.name.toLowerCase())
      if (personNames.includes(newName.toLowerCase())) {
        return alert(`${newName} is already added to phonebook`)
      }
      const personObject = { name: newName, number: newNumber, id: persons.length + 1 }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    },
  
    handleNameChange: (event) => {
      setNewName(event.target.value)
    },
  
    handleNumberChange: (event) => {
      setNewNumber(event.target.value)
    }
  }
  
  const searchItems = (event) => {
    if (event.target.value.trim().length === 0) {
      setFilteredData([])
    }
    const filteredData = persons.filter(person => person.name.toLowerCase() === event.target.value.toLowerCase())
    setFilteredData(filteredData)
  }  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleChange={searchItems} />
      <h3>Add a new</h3>
      <PersonForm functions={personFormFunctions} newName={newName} newNumber={newNumber} />
      <h3>Numbers</h3>
      <Persons persons={persons} data={filteredData} />  
    </div>
  )
}

export default App;