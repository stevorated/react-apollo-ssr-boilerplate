import gql from 'graphql-tag'

export const GET_ME = gql`
{
  me {
    id
    email
    fname
    lname
    username
  }
}
`
export const GET_MA_DETAILS = gql`
{
  me {
    fname
    lname
    username
    email
  }
}
`
export const FETCH_MORE_POSTS = gql`
query getMorePosts( $limit: Int, $skip: Int ){
  getMyPosts (limit: $limit, skip: $skip) {
    id
    body
    createdAt
    createdBy {
      id
      fname
      lname
    }
    comments {
      id
      body
      createdAt
      createdBy {
        id
        fname
        lname
      }
    }
  }
}
`


export const GET_MA_POSTS = gql`
query getMyPosts ($limit: Int, $skip: Int){
  getMyPosts (limit: $limit, skip: $skip) {
    id
    body
    createdAt
    createdBy {
      id
      fname
      lname
    }
    comments {
      id
      body
      createdAt
      createdBy {
        id
        fname
        lname
      }
    }
  }
}
`

export const FETCH_FEED = gql`
query getFeed ($limit: Int, $skip: Int) {
  getPosts(limit: $limit, skip: $skip) {
    id
    body
    createdAt
    createdBy {
      id
      fname
      lname
    }
    comments {
      id
      body
      createdAt
      createdBy {
        id
        fname
        lname
      }
    }
  }
}
`

export const GET_USERS = gql`
{
  users {
    id
    lname
    fname
    username
    email
  }
}
`

