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

