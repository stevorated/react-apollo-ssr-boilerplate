import { combineReducers } from 'redux'
import authReducer from './authReducer'
import userReducer from './usersReducer'
import postsReducer from './postsReducer'

const appReducer = combineReducers({
  users: userReducer,
  auth: authReducer,
  posts: postsReducer,
})

export default (state, action) => {
  if (action.type === 'LOGOUT_USER') {
    state = undefined
  }

  return appReducer(state, action)
}

