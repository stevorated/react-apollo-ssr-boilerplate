import { combineReducers } from 'redux'
import authReducer from './authReducer'
import userReducer from './usersReducer'
import postsReducer from './postsReducer'
import feedReducer from './feedReducer'

const appReducer = combineReducers({
  users: userReducer,
  auth: authReducer,
  posts: postsReducer,
  feed: feedReducer
})

export default (state, action) => {
  if (action.type === 'LOGOUT_USER') {
    state = {}
  }

  return appReducer(state, action)
}

