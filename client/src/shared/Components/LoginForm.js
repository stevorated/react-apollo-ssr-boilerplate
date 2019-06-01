import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, Form, FormGroup, Label, Input, FormFeedback, Button } from 'reactstrap'
import { isEmail, isLength } from 'validator'
import { loginUser } from '../Store/actions'


function LoginForm (props) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailGood, setEmailGood ] = useState(false)
  const [passwordGood , setPasswordGood] = useState(false)
  const [emailError, setEmailError ] = useState(false)
  const [passwordError , setPasswordError ] = useState(false)
  const [formError, setFormError] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      if(emailGood && passwordGood){
        setEmailGood(false)
        setPasswordGood(false)
        const res = await props.loginUser(email, password)
      }
    } catch (error) {
      setFormError(true)
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
    <Container>
      <Row className="d-flex justify-content-center py-5">
      <Col xs={10}>
        <Form 
        onSubmit={handleLogin}
        method="post"
        >
          <h1 className="display-4 mb-5">Login</h1>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
            value={email}
            valid={emailGood}
            invalid={emailError}
            type="email"
            name="email"
            id="email"
            placeholder="your email please"
            onChange={handleChangeInput}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
            value={password}
            valid={passwordGood}
            invalid={passwordError || formError} 
            onChange={handleChangeInput}
            autoComplete="off"
            type="password" 
            name="password" 
            id="password" 
            placeholder="shh.. secret.." 
            />
            {formError && <FormFeedback className="mt-3"><strong>Wrong Details</strong></FormFeedback>}
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