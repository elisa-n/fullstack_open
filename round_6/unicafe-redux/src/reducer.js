const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const nofGood = state.good
      return {
        ...state,
        good: nofGood + 1 }
    case 'OK':
      const nofOk = state.ok
      return {
        ...state,
        ok: nofOk +1 }
    case 'BAD':
      const nofBad = state.bad
      return {
        ...state,
        bad: nofBad + 1 }
    case 'ZERO':
      return initialState
    default: return state
  }
  
}

export default counterReducer