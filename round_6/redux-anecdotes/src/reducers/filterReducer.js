
const initialFilter = ''

const filterReducer = (filter = initialFilter, action ) => {
  console.log('filter now:', filter)
  console.log('action:', action)
  switch(action.type){
    case 'SET_FILTER':
      return action.content
    default:
       return filter
  }
}

export const setFilter = (filter) => {
  return {
    type: 'SET_FILTER',
    content: filter
  }
}

export default filterReducer