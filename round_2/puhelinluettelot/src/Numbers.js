import React from 'react'

const Numbers = ({persons, onClickDelete}) => {
  return(
    <div>
      {persons.map(person => 
        <p key={person.name}>{person.name} {person.number} 
        <button onClick={() => onClickDelete(person)}>delete</button></p>
      )}
    </div>
  );
}

export default Numbers;