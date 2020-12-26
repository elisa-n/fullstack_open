import React from 'react'
import { useDispatch } from 'react-redux'
import { add } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {  
  const dispatch = useDispatch()

  const handleAdd = (event) => {
    event.preventDefault()
    const newAnecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(add(newAnecdote))
    dispatch(showNotification(`You added '${newAnecdote}'`))
    setTimeout(() => dispatch(hideNotification()), 5000)
  }
  
  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={handleAdd}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm