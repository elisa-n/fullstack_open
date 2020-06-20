import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const handleButtonNext = () => {
    const max = anecdotes.length;
    const random = Math.floor(Math.random() * max);

    setSelected(random);
  }

  const handleButtonVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;

    setVotes(newVotes);
  }

  const getMaxVotes = () => {
    const maxVotes = Math.max(...votes);
    return maxVotes;
  }

  const getIndexWithMostVotes = () => {
    const indexWithMaxVotes = votes.indexOf(getMaxVotes());

    return indexWithMaxVotes;
  }

  return (
    <div>
      <div>
        <h2>Anecdote of the day</h2>
        <p>{anecdotes[selected]}</p>
        <p>has {votes[selected]} votes</p>
        <p><button onClick={() => handleButtonVote()}>vote</button>
        <button onClick={() => handleButtonNext() }>next anecdote</button></p>
      </div>
      <div>
        <h2>Anecdote with most votes</h2>
        <p>{anecdotes[getIndexWithMostVotes()]}</p>
        <p>has {getMaxVotes()} votes</p>
      </div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
