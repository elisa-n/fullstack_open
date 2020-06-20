import React, { useState, useEffect } from 'react'

import Filter from './Filter'
import PersonForm from './PersonForm'
import Numbers from './Numbers'
import Notification from './Notification'

import personService from './services/persons'

import './styles.css'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ filteredPersons, setFilteredPersons ] = useState(persons)
  const [ notification, setNotification] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data);
        setFilteredPersons(response.data);
      })
  }, [])

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);

  const handleFilterChange = (event) => {
    const filter = event.target.value.toLowerCase();
    const filteredPeople = 
      persons.filter(person => person.name.toLowerCase().includes(filter))

    setNewFilter(filter);
    setFilteredPersons(filteredPeople);
  }

  const toggleNotification = (message, classification) => {
    setNotification({message: message, classification: classification})
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const names = persons.map(person => person.name.toLowerCase());
    
    if(names.includes(newName.toLowerCase())) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const person = persons.filter(p => p.name === newName)[0]
        const updatedPerson = {name: person.name, number: newNumber}
        handleUpdate(person.id, updatedPerson)
      };
    } else {
      const newPerson = {name: newName, number: newNumber}
      const newPersons = persons.concat(newPerson)
      
      personService
        .create(newPerson)
        .catch(e => toggleNotification(`${e}`, 'error'))

      setPersons(newPersons);
      setFilteredPersons(newPersons);
      toggleNotification(`${newName} added`, 'success')
    }
  
    setNewNumber('');
    setNewName('');
  }

  const handleUpdate = (id, updatedPerson) => {
    personService
      .updatePerson(id, updatedPerson)
      .then(response => toggleNotification(`${updatedPerson.name} number updated`, 'success'))
      .catch(e => toggleNotification(`${updatedPerson.name}`, 'was already deleted from server'))

    const newPersons = persons.filter(p => p.name !== updatedPerson.name)
                              .concat(updatedPerson)
    setPersons(newPersons)
    setFilteredPersons(newPersons)
  }

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      const newPersons = persons.filter(p => p !== person )
      setPersons(newPersons)
      setFilteredPersons(newPersons)

      personService
        .deletePerson(person.id)
        .then(() =>
          toggleNotification(`${person.name} successfully deleted`, 'success')
        )
        .catch(e => toggleNotification(`${e}`, 'error'))
    } 
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Notification 
        notification={notification} />
        <Filter value={newFilter} onChange={handleFilterChange} />
      <h2>add a new</h2>
        <PersonForm 
          newName={newName}
          onChangeName={handleNameChange}
          newNumber={newNumber}
          onChangeNumber={handleNumberChange}
          handleSubmit={handleSubmit} />
      <h2>Numbers</h2>
        <Numbers persons={filteredPersons} onClickDelete={handleDelete} />
    </div>
  )

}

export default App