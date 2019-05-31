import React from 'react'
import { connect } from 'react-redux'
import { RegisterForm, Loading } from '../Components'
import gql from 'graphql-tag'
import forceLoggedIn from '../HOC/forceLoggedIn'

const REGISTER_USER = gql`
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

function RegisterPage () {
  return (
    <div>
      <RegisterForm register={REGISTER_USER} />
    </div>
  )
}

export default {
  component: forceLoggedIn(RegisterPage)
}