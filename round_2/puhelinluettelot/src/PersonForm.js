import React from 'react'

const PersonForm = ({ newName, onChangeName, newNumber, onChangeNumber, handleSubmit }) => {
  return(
    <form onSubmit={handleSubmit}>
      <div>
        name: 
        <input 
          value={newName}
          onChange={onChangeName} />
      </div>
      <div>
        number:
        <input
          value={newNumber}
          onChange={onChangeNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm;