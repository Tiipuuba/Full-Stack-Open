import { useState, useEffect } from 'react'
import persons from '../db.json'
import noteService from './services/notes'

const Person = ({ person }) => <p key={person.name}>{person.name} <button id={person.id} type="button" onClick={() => DeletePerson(person.id)}>del</button></p> 

const DeletePerson = ( id ) => {
  noteService
    .deletePerson(id)
    .then(response => {
      console.log(response)
  })
}

const UpdatePerson = ( newName, newNumber ) => {

  const findPerson = persons.persons.find(person => person.name.toLowerCase().includes(newName.toLowerCase()))

  const updatedPerson = {
    name: newName,
    number: newNumber,
    id: findPerson.id
  }

  noteService
    .updatePerson(updatedPerson)
    .then(response => {
      console.log(response)
  })
}


const Filter = ({ persons, newFinder}) => {
  return (
    <div>
      <h2>Numbers</h2>
      {persons.persons
        .filter(person => person.name.toLowerCase().includes(newFinder.toLowerCase()))
        .map(person => <Person key={person.name} person={person}/>
        )}
    </div>
  )
}

const FilterForm = ({nameFinder, newFinder}) => {
  return <div>filter shown with<input onChange={ nameFinder } value={ newFinder }/></div>
}

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

const App = () => {
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFinder, setNewFinder] = useState('')

  useEffect(() => {
      noteService
        .getAll()
        .then(response => {
          console.log(response)
        })
    }, [])

  const addContact = () => {
    const person = { name: newName, number: newNumber }

    if ( persons.persons.some(person => person.name === newName) ) {
      UpdatePerson( newName, newNumber )
      return 
    }


    noteService
      .create(person)
      .then(response => {
        console.log(response)
      })

    setNewName('')
    setNewNumber('')
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
      <FilterForm nameFinder={ nameFinder } newFinder={ newFinder }/>     
      <ContactForm setName={setName} newName={newName} setNumber={setNumber} newNumber={newNumber} addContact={addContact}/>
      <Filter persons={ persons } newFinder={ newFinder }/>
    </div>
  )
}

export default App