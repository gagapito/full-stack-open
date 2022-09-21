import React from 'react'
import Person from './Person'

const Persons = ({persons, data }) => {
    return (
        <div>
            {
            data.length !== 0 ? 
            data.map(person => <Person key={person.name} person={person.name} number={person.number} />) :
            persons.map(person => <Person key={person.name} person={person.name} number={person.number} />)
            }
        </div>
    )
}

export default Persons