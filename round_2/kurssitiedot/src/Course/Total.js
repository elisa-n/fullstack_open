import React from 'react'

const Total = ({ parts }) => {

  const totalExercises = parts.reduce((s,p) =>
    s.exercises ? s.exercises + p.exercises : s + p.exercises
  );

  return (
    <p>
      <strong>Number of exercises {totalExercises}</strong>
    </p>
  )
}

export default Total;