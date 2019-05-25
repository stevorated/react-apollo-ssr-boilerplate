export default (state = null, action) => {
  switch (action.type) {
    case 'FETCH_CURRENT_USER':
      return action.payload.me || false
    case 'LOGIN_USER':
        return action.payload.signIn || false
    case 'LOGOUT_USER':
        return null
    default:
      return state
  }
}