import React from 'react'
import { connect } from 'react-redux'
import { LoginForm, Loading } from '../Components'
import gql from 'graphql-tag'
import forceLoggedIn from '../HOC/forceLoggedIn'

const LOGIN_USER = gql`
  mutation signIn(
$email: String!
$password: String!
) { signIn(email: $email, password: $password ) {id} }
`

function LoginPage () {
  return (
    <div>
      <LoginForm login={LOGIN_USER} />
    </div>
  )
}

export default {
  component: forceLoggedIn(LoginPage)
}