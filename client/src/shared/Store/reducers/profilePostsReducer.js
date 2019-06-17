const initialState = []

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'FETCH_PROFILE_POSTS':
      return state[0] === undefined ? payload : [...state.concat(payload)]
    case 'CLEAR_PROFILE_POSTS':
      return initialState
    default:
      return state
  }
}

