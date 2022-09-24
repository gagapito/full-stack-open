import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const searchItems = (event) => {
    if (event.target.value.trim().length === 0) {
      setFilteredData([])
    }
    const filteredData = persons.filter(person => person.name.toLowerCase() === event.target.value.toLowerCase())
    setFilteredData(filteredData)
  } 

  const addPerson = (event) => {
    event.preventDefault()
    const person = persons.filter(p => p.name.toLowerCase() === newName.toLowerCase())

    const personToAdd = person[0]
    const updatedPerson = {...personToAdd, number: newNumber}

    if (person.length !== 0) {
      if (window.confirm(`${personToAdd.name} is already added to phonebook, replace the old number with a new one ?`)) {
        personService
          .update(updatedPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== personToAdd.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
      }
    } else {
      if (persons.filter(p => p.id === persons.length + 1)) {
        let lastPerson = persons.at(-1)

        const newPersonObject = {
          name: newName,
          number: newNumber,
          id: lastPerson.id + 1
        }
        personService
        .create(newPersonObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
      } else {
        const newPersonObject = {
          name: newName,
          number: newNumber,
          id: persons.length + 1
        }
        personService
        .create(newPersonObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
      } 
    }
  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const removePerson = (id) => {
    const person = persons.filter(p => p.id === id)
    if (window.confirm(`Delete ${person[0].name} ?`)) {
      personService
      .deletePerson(id)
      .then(
        setPersons(persons.filter(p => p.id !== id))
      )
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleChange={searchItems} />
      <h3>Add a new</h3>
      <PersonForm onSubmit={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={persons} data={filteredData} removePerson={removePerson} />  
    </div>
  )
}

export default App;