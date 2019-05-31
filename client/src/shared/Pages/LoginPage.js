import React from 'react'
import { connect } from 'react-redux'
import { LoginForm, Loading } from '../Components'
import gql from 'graphql-tag'
import forceLoggedIn from '../HOC/forceLoggedIn'

function LoginPage () {
  return (
      <LoginForm />
  )
}

export default {
  component: forceLoggedIn(LoginPage)
}