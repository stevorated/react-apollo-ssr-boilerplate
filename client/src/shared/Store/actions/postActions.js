import { GET_MA_DETAILS, GET_ME, GET_USERS, GET_MA_POSTS } from '../../Apollo/Queries/'

export const fetchMyPosts = (count = 5) => async (dispatch, getState, client) => {
  if(count > 15) {
    count = 15  
  }
  const {data} = await client.query({
    query: GET_MA_POSTS,
    variables: { limit: count }
  })
  dispatch({
    type: 'FETCH_MY_POSTS',
    payload: data
  })
}

export const fetchMorePosts = (data) => async (dispatch, getState, client) => {
  dispatch({
    type: 'FETCH_MORE_POSTS',
    payload: data
  })
}

export const createPost = (data) => async (dispatch, getState, client) => {
  await dispatch({
    type: 'CREATE_POST',
    payload: [data]
  })
  
} 