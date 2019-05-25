import { combineReducers } from 'redux'
import authReducer from './authReducer'
import userReducer from './usersReducer'

const appReducer = combineReducers({
  users: userReducer,
  auth: authReducer,
})

export default (state, action) => {
  if (action.type === 'LOGOUT_USER') {
    state = undefined
  }

  return appReducer(state, action)
}

