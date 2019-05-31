import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, Form, FormGroup, Label, Input, FormFeedback, Button } from 'reactstrap'
import { isEmail, isLength } from 'validator'
import { graphql } from 'react-apollo' // TODO: put in other elements
import serialize from 'serialize-javascript'
import { registerUser } from '../Store/actions'


function RegisterForm (props) {

  const [fname, setFirstName] = useState('')
  const [fnameGood, setFirstNameGood] = useState(false)
  const [fnameError, setFirstNameError] = useState(false)
  const [lname, setLastName] = useState('')
  const [lnameGood, setLastNameGood] = useState(false)
  const [lnameError, setLastNameError] = useState(false)
  const [username, setUsername] = useState('')
  const [usernameGood, setUsernameGood] = useState(false)
  const [usernameError, setUsernameError] = useState(false)
  const [email, setEmail] = useState('')
  const [emailGood, setEmailGood] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordGood , setPasswordGood] = useState(false)
  const [passwordError , setPasswordError ] = useState(false)

  const handleReg = async (e) => {
    e.preventDefault()
    try {
      if(emailGood && passwordGood){
        setEmailGood(false)
        setPasswordGood(false)
        const res = await props.registerUser(lname, fname, username, email, password)
      }
    } catch (error) {
      // console.log(error)
    }
  }

  const handleChangeInput = (e) => {
    const input = e.target.value
    switch (e.target.name) {
      case 'fname_reg':
        if(input && !isLength(input, {min:2, max: 30})) {
          setFirstNameError(true)
        } else if (input && isLength(input, {min:2, max: 30})) {
          setFirstNameError(false)
          setFirstNameGood(true)
        }
        setFirstName(e.target.value)
        break
      case 'lname_reg':
          if(input && !isLength(input, {min:2, max: 30})) {
            setLastNameError(true)
          } else if (input && isLength(input, {min:2, max: 30})) {
            setLastNameError(false)
            setLastNameGood(true)
          }
          setLastName(e.target.value)
          break
      case 'username_reg':
          if(input && !isLength(input, {min:2, max: 30})) {
            setUsernameError(true)
          } else if (input && isLength(input, {min:2, max: 30})) {
            setUsernameError(false)
            setUsernameGood(true)
          }
        setUsername(e.target.value)
        break
      case 'email_reg':
        if(input && !isEmail(e.target.value)){
          setEmailError(true)
        } else if(input && isEmail(input) ) {
          setEmailError(false)
          setEmailGood(true)
        }
        setEmail(e.target.value)
        break
      case 'password_reg':
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
        onSubmit={handleReg}
        method="post">
          <h1 className="display-4 mb-5">Register</h1>
          <FormGroup>
            <Label for="fname-reg">first name</Label>
            <Input
            valid={fnameGood}
            invalid={fnameError}
            type="text"
            name="fname_reg"
            id="fname-reg"
            placeholder="first name please"
            onChange={handleChangeInput}
            value={fname}
            />
          </FormGroup>
          <FormGroup>
            <Label for="lname-reg">last name</Label>
            <Input
            valid={lnameGood}
            invalid={lnameError}
            type="text"
            name="lname_reg"
            id="lname-reg"
            placeholder="last name please"
            onChange={handleChangeInput}
            value={lname}
            />
          </FormGroup>
          <FormGroup>
            <Label for="username">username</Label>
            <Input
            valid={usernameGood}
            invalid={usernameError}
            type="text"
            name="username_reg"
            id="username-reg"
            placeholder="username please"
            onChange={handleChangeInput}
            value={username}
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
            valid={emailGood}
            invalid={emailError}
            type="email"
            name="email_reg"
            id="email-reg"
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
            name="password_reg" 
            id="password-reg" 
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
export default connect(mapStateToProps, { registerUser })(RegisterForm)