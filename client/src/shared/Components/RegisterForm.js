import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, Form, FormGroup, Label, Input, FormFeedback, Button } from 'reactstrap'
import { isEmail, isLength } from 'validator'
import { registerUser } from '../Store/actions'


function RegisterForm (props) {

  let state = props.state

  const [fnameGood, setFirstNameGood] = useState(false)
  const [fnameError, setFirstNameError] = useState(false)
  const [lnameGood, setLastNameGood] = useState(false)
  const [lnameError, setLastNameError] = useState(false)
  const [usernameGood, setUsernameGood] = useState(false)
  const [usernameError, setUsernameError] = useState(false)
  const [emailGood, setEmailGood] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passwordGood , setPasswordGood] = useState(false)
  const [passwordError , setPasswordError ] = useState(false)

  const handleReg = async (e) => {
    e.preventDefault()
    try {
      if(state.formGood || (emailGood && passwordGood && usernameGood && fnameGood && lnameGood)) {
        const res = await props.register({variables:{
          fname:state.fname, 
          lname: state.lname, 
          email: state.email, 
          username: state.username, 
          password: state.password
        }})
      }
    } catch (error) {
      // console.log(error)
    }
  }
  const handleForm = (e) => {
    if(emailGood && passwordGood && usernameGood && fnameGood && lnameGood) {
      props.setFormState({formGood: true})
    }
  }
  const handleChangeInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    const newData = {
      [name]: value
    }
    switch (name) {
      case 'fname':
        if(value && !isLength(value, {min:2, max: 30})) {
          setFirstNameError(true)
        } else if (value && isLength(value, {min:2, max: 30})) {
          setFirstNameError(false)
          setFirstNameGood(true)
        }
        props.setFormState(newData)
        break
      case 'lname':
        if(value && !isLength(value, {min:2, max: 30})) {
          setLastNameError(true)
        } else if (value && isLength(value, {min:2, max: 30})) {
          setLastNameError(false)
          setLastNameGood(true)
        }
        props.setFormState(newData)
        break
      case 'username':
          if(value && !isLength(value, {min:2, max: 30})) {
            setUsernameError(true)
          } else if (value && isLength(value, {min:2, max: 30})) {
            setUsernameError(false)
            setUsernameGood(true)
          }
        props.setFormState(newData)
        break
      case 'email':
        if(value && !isEmail(value)){
          setEmailError(true)
        } else if(value && isEmail(value) ) {
          setEmailError(false)
          setEmailGood(true)
        }
        props.setFormState(newData)
        break
      case 'password':
          if(value && !value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*^?&#])[A-Za-z\d@$!%#*^?&]{8,30}$/)) {
            setPasswordError(true)
          } else if (value && value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*^?&#])[A-Za-z\d@$!%#*^?&]{8,30}$/)) {
            setPasswordError(false)
            setPasswordGood(true)
          }
        props.setFormState(newData)
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
        onChange={handleForm}
        onSubmit={handleReg}
        method="post">
          <h1 className="display-4 mb-5">Register</h1>
          <FormGroup>
            <Label for="fname-reg">first name</Label>
            <Input
            valid={fnameGood}
            invalid={fnameError || (!!props.errors && !!props.errors.fname)}
            type="text"
            name="fname"
            id="fname-reg"
            placeholder="first name please"
            onChange={handleChangeInput}
            value={state.fname}
            />
            {props.errors && (props.errors.fname && <FormFeedback>{props.errors.fname.message}</FormFeedback>)}
          </FormGroup>
          <FormGroup>
            <Label for="lname-reg">last name</Label>
            <Input
            valid={lnameGood}
            invalid={lnameError|| (!!props.errors && !!props.errors.lname)}
            type="text"
            name="lname"
            id="lname-reg"
            placeholder="last name please"
            onChange={handleChangeInput}
            value={state.lname}
            />
            
            {props.errors && (props.errors.lname && <FormFeedback>{props.errors.lname.message}</FormFeedback>)}
          </FormGroup>
          <FormGroup>
            <Label for="username">username</Label>
            <Input
            valid={usernameGood}
            invalid={usernameError || (!!props.errors && !!props.errors.username)}
            type="text"
            name="username"
            id="username-reg"
            placeholder="username please"
            onChange={handleChangeInput}
            value={state.username}
            />
            {props.errors && (props.errors.username && <FormFeedback>{props.errors.username.message}</FormFeedback>)}
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
            valid={emailGood}
            invalid={emailError || (!!props.errors && !!props.errors.email)}
            type="email"
            name="email"
            id="email-reg"
            placeholder="your email please"
            onChange={handleChangeInput}
            value={state.email}
            />
            {props.errors && (props.errors.email && <FormFeedback>{props.errors.email.message}</FormFeedback>)}
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
            value={state.password}
            onChange={handleChangeInput}
            autoComplete="off"
            valid={passwordGood}
            invalid={passwordError|| (!!props.errors && !!props.errors.password)} 
            type="password" 
            name="password" 
            id="password-reg" 
            placeholder="shh.. secret.." 
            />
            {props.errors && (props.errors.password && <FormFeedback>{props.errors.password.message}</FormFeedback>)}
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