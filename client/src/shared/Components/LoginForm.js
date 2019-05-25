import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, Form, FormGroup, Label, Input, FormFeedback, Button } from 'reactstrap'
import { isEmail, isLength } from 'validator'
import { graphql } from 'react-apollo' // TODO: put in other elements
import serialize from 'serialize-javascript'
import { loginUser } from '../Store/actions'


function LoginForm (props) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [ emailGood, setEmailGood ] = useState(false)
  const [ passwordGood , setPasswordGood] = useState(false)
  const [ emailError, setEmailError ] = useState(false)
  const [ passwordError , setPasswordError ] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      if(emailGood && passwordGood){
        setEmailGood(false)
        setPasswordGood(false)
        const res = await props.loginUser(email, password)
        console.log(res)
      }
    } catch (error) {
      // console.log(error)
    }

  }
  const handleChangeInput = (e) => {
    const input = e.target.value
    switch (e.target.name) {
      case 'email':
        if(input && !isEmail(input)){
          setEmailError(true)
        } else if(input && isEmail(input) ) {
          setEmailError(false)
          setEmailGood(true)
        }
        setEmail(e.target.value)
        break
      case 'password':
          if(input && !input.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*^?&#])[A-Za-z\d@$!%#*^?&]{8,30}$/)) {
            setPasswordError(true)
          } else if (input && input.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*^?&#])[A-Za-z\d@$!%#*^?&]{8,30}$/)) {
            setPasswordError(false)
            setPasswordGood(true)
          }
        setPassword(e.target.value)
        break
      default:
        break
    }
  }
  return (
    <Container style={{ marginTop: '5rem'}}>
      <Row className="d-flex justify-content-center py-5">
      <Col xs={10}>
        <Form 
        onSubmit={handleLogin}
        method="post">
          <h1 className="display-4 mb-5">Login</h1>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
            valid={emailGood}
            invalid={emailError}
            type="email"
            name="email"
            id="email"
            placeholder="your email please"
            onChange={handleChangeInput}
            value={email}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
            value={password}
            onChange={handleChangeInput}
            autoComplete="off"
            valid={passwordGood}
            invalid={passwordError} 
            type="password" 
            name="password" 
            id="password" 
            placeholder="shh.. secret.." 
            />
           {props.error &&  <FormFeedback className="mt-2" tooltip>{props.error}</FormFeedback>}
          </FormGroup>
          <Button>Sign In</Button> 
        </Form>
      </Col>
    </Row>
  </Container>
  )
}

function mapStateToProps({auth}){
 return { auth }
}
export default connect(mapStateToProps, { loginUser })(LoginForm)