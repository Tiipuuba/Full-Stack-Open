import { useState, useEffect } from 'react'
import persons from '../db.json'
import noteService from './services/notes'
import './index.css'

const Person = ({ person, setAlertMessage }) => {
  const id = person.id

  return (
  <p key={person.name}>{person.name} <button id={id} type="button" onClick={() => DeletePerson({ id, setAlertMessage })}>del</button></p> 
  )
}

const DeletePerson = ({ id, setAlertMessage }) => {
  const delPerson = persons.persons.find(person => person.id === id)

  setAlertMessage(`Deleted ${delPerson.name}`)
  setTimeout(() => {
        setAlertMessage(null)
  }, 3000)

  
  noteService
    .deletePerson(id)
}

const UpdatePerson = ( newName, newNumber, setAlertMessage ) => {
  const findPerson = persons.persons.find(person => person.name.toLowerCase().includes(newName.toLowerCase()))

  const updatedPerson = {
    name: newName,
    number: newNumber,
    // Change id to non-existent to force error
    id: findPerson.id
  }

  const alertInfo = {
    action: 'Updated',
    name: newName
  }

  noteService
    .updatePerson(updatedPerson)
    .catch(error => {
      setAlertMessage(`Information of ${newName} has already been removed from server`),
      setTimeout(() => {
        setAlertMessage(null)
      }, 3000)
    })
    

  setAlertMessage(`${alertInfo.action} ${alertInfo.name}`),
  setTimeout(() => {
        setAlertMessage(null)
  }, 3000)
}

const Filter = ({ persons, newFinder ,setAlertMessage}) => {
  return (
    <div>
      <h2>Numbers</h2>
      {persons.persons
        .filter(person => person.name.toLowerCase().includes(newFinder.toLowerCase()))
        .map(person => <Person key={person.name} person={person} setAlertMessage={setAlertMessage}/>
        )}
    </div>
  )
}

const FilterForm = ({nameFinder, newFinder}) => <div>filter shown with<input onChange={ nameFinder } value={ newFinder }/></div>

const ContactForm =({ setName, newName, setNumber, newNumber, addContact }) => {
  return (
    <div>
      <h2>add new</h2>
      <form>
        <div>name: <input onChange={setName} value={ newName }/></div>
        <div>number: <input onChange={setNumber} value={ newNumber }/></div>
        <button type="button" onClick={addContact}>add</button>
      </form>
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  } else if (message !== null &&  message.length > 40) {
      return (
        <div className="alertred">
          {message}
        </div>
      )
  }
  
  return (
    <div className="alert">
      {message}
    </div>
  )
}

const App = () => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFinder, setNewFinder] = useState('')
  const [alertMessage, setAlertMessage] = useState(null)

  useEffect(() => {
      noteService
        .getAll()
    }, [])

  const addContact = () => {
    const person = { name: newName, number: newNumber }

    if ( persons.persons.some(person => person.name === newName) ) {
      UpdatePerson( newName, newNumber, setAlertMessage )
      return 
    }

    noteService
      .create(person)
      .then(response => {
        console.log(response)
      })

    setNewName('')
    setNewNumber('')

    setAlertMessage(`Added ${person.name}`),
    setTimeout(() => {
          setAlertMessage(null)
    }, 3000)
  }

  const setName = (event) => {
    setNewName(event.target.value)   
  }

  const setNumber = (event) => {
    setNewNumber(event.target.value)   
  }

  const nameFinder = (event) => {
    setNewFinder(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={alertMessage} />
      <FilterForm nameFinder={ nameFinder } newFinder={ newFinder }/>     
      <ContactForm setName={setName} newName={newName} setNumber={setNumber} newNumber={newNumber} addContact={addContact}/>
      <Filter persons={ persons } newFinder={ newFinder } setAlertMessage={setAlertMessage}/>
    </div>
  )
}

export default App