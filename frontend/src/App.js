

import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import backend from './backend/backend'




const App = () => {




  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [phoneMessage, setPhoneMessage] = useState(null)
  const [error, setError] = useState(false)


  useEffect(() => {
    backend.allPhones().then(phones =>
      setPersons(phones)
    )
  }, [])

  const personsArray = persons.map((person) => person.name)


  const handleChangeName = (event) => {
    const newPersonName = event.target.value
    setNewName(newPersonName)
  }

  const handleChangeNumber = (event) => {
    const newPersonNumber = event.target.value
    setNewNumber(newPersonNumber)
  }
  const handleChangeFilter = (event) => {
    const newPersonFilter = event.target.value
    setFilter(newPersonFilter)
  }



  const addName = (event) => {
    event.preventDefault();

    const newPhone = {
      name: newName,
      number: newNumber,
    }



    const changeNumber = persons.find(p => p.name === newName)





    if (newName && newNumber) {



      if (personsArray.includes(newName)) {
        if (window.confirm(`Update ${newName}'s number? `)) {



          backend.updatePhone(changeNumber.id, newPhone)
            .then(() => {
              console.log('then')
              getData()
              setPhoneMessage(
                `${newPhone.name} was updated`
              )
              setError(false)
              setTimeout(() => {
                setPhoneMessage(null)
              }, 5000)
            })
            .catch((error) => {



              setPhoneMessage(
                `${error.response.data.message}`
              )
              setError(true)
              setTimeout(() => {
                setPhoneMessage(null)
              }, 5000)


            })
            .finally(() => {

              getData()

            })
        }
      } else {

        backend.createPhone(newPhone)
          .then(returnedPhones => {


          setPersons(persons.concat(returnedPhones))
          setPhoneMessage(
            `${newPhone.name} was added to the list`
          )
          setError(false)
          setTimeout(() => {
            setPhoneMessage(null)
          }, 5000)

          })
          .catch(error => {

            setPhoneMessage(
              `${error.response.data.message}`
            )
            setError(true)
            setTimeout(() => {
              setPhoneMessage(null)
            }, 5000)


          })

      }        

    } else {
      alert('Please, write a name and a phone number')
    }

    setNewName('')
    setNewNumber('')
  }

  const getData = () => {
    backend.allPhones().then(phones => setPersons(phones))
  }



  const deletePersons = (event) => {
    const id = event.target.id
    const name = event.target.name
    window.confirm(`Delete ${name}?`)

    backend.deletePhone(id).then(() => {
      getData()
      setPhoneMessage(
        `${name} was deleted`
      )
      setError(true)
      setTimeout(() => {
        setPhoneMessage(null)
      }, 5000)
    })



  }

  return (

    <div>
      <Notification message={phoneMessage} error={error} />

      <Filter handleChangeFilter={handleChangeFilter} />

      <PersonForm addName={addName}
        handleChangeName={handleChangeName} handleChangeNumber={handleChangeNumber}
        newName={newName}
        newNumber={newNumber}
      />

      <Persons persons={persons} personFilter={filter} handleClick={deletePersons} />

    </div>
  )
}

export default App