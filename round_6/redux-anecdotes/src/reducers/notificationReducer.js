
const initialState = ''

const notificationReducer = (state = initialState, action ) => {
  console.log('state now:', state)
  console.log('action:', action)
  switch(action.type){
    case 'SHOW_NOTIFICATION':
      return action.content
    case 'HIDE_NOTIFICATION':
      return initialState
    default:
       return state
  }
}

export const showNotification = (notification) => {
  return {
    type: 'SHOW_NOTIFICATION',
    content: notification
  }
}

export const hideNotification = () => {
  return {
    type: 'HIDE_NOTIFICATION'
  }
}

export default notificationReducer