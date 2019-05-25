import gql from 'graphql-tag'

export const LOGIN_USER_MUT = gql`
 mutation ($email: String!, $password: String!) {
  signIn (
    email: $email,
    password: $password
  ) {
    id
    email
    fname
    username
    createdAt
  }
}
`
export const LOGOUT_USER = gql`
  mutation {
    signOut
  }
`