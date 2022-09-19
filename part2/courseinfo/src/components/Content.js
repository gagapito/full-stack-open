import React from 'react'

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map((part) => 
                <div key={part.id}>
                    <p>{part.name} {part.exercises}</p>
                </div>
            )}
        </div>
    )
}

export default Content