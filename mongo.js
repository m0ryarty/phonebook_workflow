/* eslint-disable import/no-duplicates */
import pkg from 'mongoose'

import mongoose from 'mongoose'
const { set, connect, Schema, model, connection } = pkg

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
    `mongodb+srv://raskholnikov:${password}@cluster0.3wepfv7.mongodb.net/phonebookApp?retryWrites=true&w=majority`

set('strictQuery', false)
connect(url)

const personSchema = new Schema({
  name: String,
  number: String
})

const Person = model('Person', personSchema)

const person = new Person({
  name,
  number
})

if (process.argv.length < 4) {
  Person.find({})
    .then(result => {
      console.log('phonebook:')
      result.forEach(person => {
        console.log(person.name, person.number)
      })
      mongoose.connection.close()
    })
} else {
  person.save().then(result => {
    console.log('note saved!')
    connection.close()
  })
}
