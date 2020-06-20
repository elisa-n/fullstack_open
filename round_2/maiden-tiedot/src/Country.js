import React from 'react'

import Weather from './Weather'

const Country = ({ country }) => {
  return(
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>languages</h3>
      <ul>
        {country.languages.map(l => <li key={l.name}>{l.name}</li>)}
      </ul>
      <img src={country.flag} width="100"/>

      <Weather capital={country.capital} />
    </div>
  )
}

export default Country;