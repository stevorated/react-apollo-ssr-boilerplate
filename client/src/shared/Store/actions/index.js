import { UPLOAD_FILE_TEST } from '../../Apollo/Mutaions'
 
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

export const uploadFile = (data) => async (dispatch, getState, client) => {
  const { file, size } = data
  await client.mutate({
    variables: { file, size },
    mutation: UPLOAD_FILE_TEST
  })
  console.log(size)
}
