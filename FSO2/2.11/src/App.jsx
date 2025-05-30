import { useState } from 'react'
import persons from '../db.json'

const Person = ({ person }) => <p key={person.name}>{person.name}</p>

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

  const addContact = () => {
    const person = { name: newName, number: newNumber }

    const exists = persons.some(person => person.name === newName)

    if ( exists === true ) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    
    setPersons(persons.concat(person))
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