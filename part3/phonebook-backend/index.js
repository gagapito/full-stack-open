const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(express.json())
app.use(morgan((tokens, request, response) => {
    return [
        tokens.method(request, response),
        tokens.url(request, response),
        tokens.status(request, response),
        tokens.res(request, response, 'content-length'), '-',
        tokens['response-time'](request, response), 'ms',
        JSON.stringify(request.body)
    ].join(' ')
}))

let persons = [
    {
        "id": 1,
        "name": "Garien Agapito",
        "number": "626-720-7984"
    },
    {
        "id": 2,
        "name": "Cameron Agapito",
        "number": "626-792-4113"
    },
    {
        "id": 3,
        "name": "Cherry Agapito",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Gilbert Agapito",
        "number": "040-123456"
    },
    {
        "id": 5,
        "name": "Grey Hidaldo",
        "number": "888-888-8888"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.get('/info', (request, response) => {
    const numPersons = persons.length
    const date = new Date().toString()
    response.send("<html> <body><p>Phonebook has info for "+numPersons+" people</p><p>"+date+"</p></body> </html>")
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const generateId = () => {
    const newId = Math.floor(Math.random() * 1000)
    if (persons.find(person => person.id === newId)) {
        return persons.length + 1
    } else {
        return newId
    }
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (persons.find(person => person.name === body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number 
    }

    persons.concat(person)
    response.json(person)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)