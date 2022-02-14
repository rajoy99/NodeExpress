const http = require('http')

const express = require('express')
const { response } = require('express')
const app = express()

const cors = require('cors')

app.use(cors())

app.use(express.json())
app.set('view engine', 'pug')

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const idgenerate = (min,max) =>{
    return Math.floor(Math.random() * (max - min + 1) + min);
}



app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.name) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
  
    const person = {
      name: body.name,
      number:body.number,
      id: idgenerate(10,10000),
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })








app.get('/api/persons/info', (request,response) => {
    response.render('info',{information:persons.length});
})


app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => {
    console.log(person.id, typeof person.id, id, typeof id, person.id === id)
    return person.id === id
  })

    
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }

})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})