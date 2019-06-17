export * from './authActions'
export * from './userActions'
export * from './postActions'
export * from './commentActions'
export * from './profileActions'

export const pushError = (error) => (dispatch, getState, client) => {
  dispatch({
    type: 'ERROR_LIST_PUSH',
    payload: error
  })
}


