import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({title, handleOnClick}) => 
    <button onClick={handleOnClick}>{title}</button>

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}


const Statistics = ({good, neutral, bad}) => {

  const getCombined = () => {
    const combined = good + neutral + bad
    return combined;
  }

  const getMean = () => {
    const totalVotes = getCombined();
    const mean = (good - bad) / totalVotes;
    return mean;
  }

  const getPercentPositive = () => {
    const totalVotes = getCombined();
    const positivePercentage = good / totalVotes;
    return positivePercentage + '%';
  }

  if (!good && !neutral && !bad) {
    return (
      <p>No feedback given</p>
    )
  } else {
    return (
      <table>
      <tbody>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={getCombined()} />
        <StatisticLine text='average' value={getMean()} />
        <StatisticLine text='positive' value={getPercentPositive()} />
      </tbody>
    </table>
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>give feedback</h2>
      <Button title='good' handleOnClick={() => setGood(good + 1)} />
      <Button title='neutral' handleOnClick={() => setNeutral(neutral + 1)} />
      <Button title='bad' handleOnClick={() => setBad(bad + 1)} />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)