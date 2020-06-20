import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './Filter'
import PersonForm from './PersonForm'
import Numbers from './Numbers'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ filteredPersons, setFilteredPersons ] = useState(persons)

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const names = persons.map(person => person.name.toLowerCase());
    
    if(names.includes(newName.toLowerCase())) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPersons = persons.concat({name: newName, number: newNumber})
      setPersons(newPersons);
      setFilteredPersons(newPersons);
    }
  
    setNewNumber('');
    setNewName('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter value={newFilter} onChange={handleFilterChange} />
      <h2>add a new</h2>
        <PersonForm 
          newName={newName}
          onChangeName={handleNameChange}
          newNumber={newNumber}
          onChangeNumber={handleNumberChange}
          handleSubmit={handleSubmit} />
      <h2>Numbers</h2>
        <Numbers persons={filteredPersons} />
    </div>
  )

}

export default App