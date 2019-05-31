import gql from 'graphql-tag'

export const REGISTER_USER_MUT = gql`
 mutation ($fname: String!, $lname: String!, $username: String!, $email: String!, $password: String!) {
  signUp (
    fname: $fname,
    lname: $lname,
    username: $username,
    email: $email,
    password: $password
  ) {
    id
    email
    fname
    lname
    username
  }
}
`

export const LOGIN_USER_MUT = gql`
 mutation ($email: String!, $password: String!) {
  signIn (
    email: $email,
    password: $password
  ) {
    id
    email
    fname
    lname
    username
  }
}
`
export const LOGOUT_USER = gql`
  mutation {
    signOut
  }
`