import React from 'react'

const Filter = ({ handleChange }) => {
    return (
        <div>
            <input type='text' placeholder='Search...' onChange={handleChange} />
        </div>
    )
}
    
export default Filter