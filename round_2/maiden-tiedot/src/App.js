import React, { useState, useEffect} from 'react';
import axios from 'axios';

import Countries from './Countries'

function App() {
  const [ countries, setCountries ] = useState([])
  const [ newCountry, setNewCountry ] = useState('')
  const [ filteredCountries, setFilteredCountries ] = useState([])

  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data);
    })
  }, [])

  const handleCountryChange = (event) => {
    const filter = event.target.value.toLowerCase();
    const filteredListOfCountries = 
      countries.filter(person => person.name.toLowerCase().includes(filter))
      
    setNewCountry(filter);
    setFilteredCountries(filteredListOfCountries);
  }

  const handleShow = (country) => setFilteredCountries([country]);

  return (
    <div>
      find countries 
      <input 
        value={newCountry}
        onChange={handleCountryChange} />
        <Countries 
          countries={filteredCountries}
          handleShow={handleShow} />
    </div>
  );
}

export default App;
