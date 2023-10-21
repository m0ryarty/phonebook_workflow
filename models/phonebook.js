import { set, connect, Schema, model } from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()

set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('url', process.env.MONGODB_URI)

console.log('connecting to', url)

connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return v.split('-').length === 2 && /\d{2,3}-\d{5,8}/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    }

  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export default model('Person', personSchema)
