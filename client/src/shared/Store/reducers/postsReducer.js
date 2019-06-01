export default (state=[], action) => {
  switch (action.type) {
    case 'FETCH_MY_POSTS':
      return action.payload.me
    default:
      return state
  }
}