import express from 'express'
import * as dotenv from 'dotenv'

import morgan from 'morgan'
import cors from 'cors'

import Person from './models/phonebook.js'
dotenv.config()

const app = express()

app.use(express.json())

app.use(cors())

app.use(express.static('build'))

app.use(morgan('tiny'))

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.get('/info', (request, response) => {
  Person.find({}).then(persons => {
    response.send(`<p>Phonebook has info for ${persons.length} people<p/> <p> ${new Date()}<p/>`)
  })
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const filter = { name: body.name }
  const update = { number: body.number }

  Person.findOneAndUpdate(filter, update, { runValidators: true }, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then(response.status(204).end())
    // .catch(error=>next(error))
})

morgan.token('type', function (req, res) { return [`${JSON.stringify(req.body)}`] })

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :type'))

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    }).catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  if (error.name === 'ValidationError') {
    return response.status(400).send(error)
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen((PORT), () => {
  console.log(`Server is running on port ${PORT}`)
})
