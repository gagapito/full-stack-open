import React from 'react'

const LangRender = ({ country }) => {
    for (var key in country.languages) {
        return (
            <li key={key}>{country.languages[key]}</li>
        )
    }
}

export default LangRender