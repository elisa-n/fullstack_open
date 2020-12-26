import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    let sortedAnecdotes 
    if (!state.filter) {
      sortedAnecdotes = state.anecdotes.sort((a, b) => (a.votes < b.votes ? 1 : -1))
    } else {
      let filter = state.filter.toLowerCase()
      let filteredAnecdotes = state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter))
      sortedAnecdotes = filteredAnecdotes.sort((a, b) => (a.votes < b.votes ? 1 : -1))
    }
    return sortedAnecdotes
  })

  const dispatch = useDispatch()

  const handleVote = (id) => {
    let anecdote = anecdotes.filter(anecdote => anecdote.id === id)[0].content
    dispatch(vote(id))
    dispatch(showNotification(`You voted '${anecdote}'`))
    setTimeout(() => dispatch(hideNotification()), 5000)
  }

  return(
    <div>
      {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => handleVote(anecdote.id)}>vote</button>
        </div>
      </div>
      )}
    </div>
  )
}

export default AnecdoteList