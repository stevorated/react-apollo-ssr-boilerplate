import React from 'react'
import { connect } from 'react-redux'
import { RegisterForm, Loading } from '../Components'
import gql from 'graphql-tag'
import forceLoggedIn from '../HOC/forceLoggedIn'

function RegisterPage () {
  return (
      <RegisterForm/>
  )
}

export default {
  component: forceLoggedIn(RegisterPage)
}