import React from 'react'

const Persons = ({persons, data, removePerson }) => {
    if (data.length !== 0) {
        return data.map(person => 
            <p key={person.name}>{person.name} {person.number} <button onClick={() => removePerson(person.id)}>delete</button></p>       
        )
    } else {
        return persons.map(person =>
            <p key={person.name}>{person.name} {person.number} <button onClick={() => removePerson(person.id)}>delete</button></p>       
        )
    }
}

export default Persons