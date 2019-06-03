import React, { Fragment } from 'react'
import { LoginForm, Loading, HelmetComponent } from '../Components'
import forceLoggedIn from '../HOC/forceLoggedIn'

function LoginPage () {
  const title="Login Form"
  return (
    <Fragment>
      <HelmetComponent pageTitle={title} ogTitle={title} /> 
      <LoginForm />
    </Fragment>
  )
}

export default {
  component: forceLoggedIn(LoginPage)
}