import { GET_MA_DETAILS, GET_ME, GET_USERS, GET_MA_POSTS, GET_POSTS, FETCH_FEED } from '../../Apollo/Queries/'

export const fetchMyPosts = (count = 5) => async (dispatch, getState, client) => {
  if(count > 10) {
    count = 10  
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

export const fetchFeed = (CrowserData, count = 5) => async (dispatch, getState, client) => {
  if(count > 10) {
    count = 10  
  }
  const data = CrowserData ? CrowserData : await client.query({
      query: FETCH_FEED,
      variables: { limit: count }
    })
  // const {data} = await client.query({
  //   query: FETCH_FEED,
  //   variables: { limit: count }
  // })
  dispatch({
    type: 'FETCH_FEED',
    payload: data
  })
}

export const fetchMoreMyPosts = (data) => async (dispatch, getState, client) => {
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

export const deletePostAction = (data) => async (dispatch, getState, client) => {
  await dispatch({
    type: 'CREATE_POSTd',
    payload: [data]
  })
} 