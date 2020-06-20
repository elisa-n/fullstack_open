import React from 'react'

import Country from './Country'

const Countries = ({countries, handleShow}) => {
  if (countries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    );
  } else if (countries.length === 1) {
    return (
      <Country country={countries[0]} />
    );
  } else {
    return(
      <div>
        {countries.map(country =>
          <p key={country.name}>{country.name} 
          <button onClick={() => handleShow(country)}>show</button></p>
        )}
      </div>
    );
  }
}

export default Countries;