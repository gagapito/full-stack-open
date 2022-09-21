import React from 'react'

const PersonForm = ({ functions, newName, newNumber }) => {
    return (
        <form onSubmit={functions.addPerson}>
            <div>name: <input value={newName} onChange={functions.handleNameChange} /></div>
            <div>number: <input value={newNumber} onChange={functions.handleNumberChange} /></div>
            <button type='submit'>add</button>
        </form>
    )
}

export default PersonForm