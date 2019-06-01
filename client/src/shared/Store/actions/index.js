import gql from 'graphql-tag'
import { GET_MA_DETAILS, GET_ME, GET_USERS, GET_MA_POSTS } from '../../Apollo/Queries/'
import { REGISTER_USER_MUT, LOGIN_USER_MUT, LOGOUT_USER } from '../../Apollo/Mutaions'
import { onError } from 'apollo-link-error';


export const pushError = (error) => async (dispatch, getState, client) => {
  dispatch({
    type: 'ERROR_LIST_PUSH',
    payload: error
  })
}

export const registerUser = (data) => async (dispatch, getState, client) => {
    dispatch({
      type: 'REGISTER_USER',
      payload: data
    })

}


export const loginUser = (email, password) => async (dispatch, getState, client) => {
  const {data} = await client.mutate({
    variables: {email, password},
    mutation: LOGIN_USER_MUT
  })
  
  dispatch({
    type: 'LOGIN_USER',
    payload: data
  })
}

export const logoutUser = () => async (dispatch, getState, client) => {

  const {data} = await client.mutate({
    mutation: LOGOUT_USER
  })
  dispatch({
    type: 'LOGOUT_USER',
    payload: null
  })
  
  client.cache.reset()
  client.resetStore()
}


export const fetchMyPosts = () => async (dispatch, getState, client) => {
  const {data} = await client.query({
    query: GET_MA_POSTS
  })
  dispatch({
    type: 'FETCH_MY_POSTS',
    payload: data
  })
}

export const fetchUsers = () => async (dispatch, getState, client) => {
  const {data} = await client.query({
    query: GET_USERS
  })
  dispatch({
    type: 'FETCH_USERS',
    payload: data
  })
}

export const fetchCurrentUser = () => async (dispatch, getState, client) => {
  const { data } = await client.query({
    query: GET_ME
  })
  dispatch({
    type: 'FETCH_CURRENT_USER', 
    payload: data
  })
}

export const fetchMyDetails = () => async (dispatch, getState, client) => {
  const { data } = await client.query({
    query: GET_MA_DETAILS
  })
  dispatch({
    type: FETCH_MY_DETAILS, 
    payload: data
  })
}