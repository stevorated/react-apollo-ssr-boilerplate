import React from 'react'
import { LoginForm, Loading } from '../Components'
import forceLoggedIn from '../HOC/forceLoggedIn'

function LoginPage () {
  return (
      <LoginForm />
  )
}

export default {
  component: forceLoggedIn(LoginPage)
}