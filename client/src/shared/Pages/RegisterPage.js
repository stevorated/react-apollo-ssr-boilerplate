import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Mutation, ApolloConsumer } from 'react-apollo'
import { REGISTER_USER_MUT } from '../Apollo/Mutaions'
import { RegisterForm, Loading } from '../Components'
import forceLoggedIn from '../HOC/forceLoggedIn'
import { registerUser } from '../Store/actions'

class RegisterPage extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    formGood: false,
    retry: false
  }
  
  handleFormState = (data) => {
    const currentState = this.state
    this.setState({
      ...currentState,
      ...data
    })
  }
  render() {
    return (
      <ApolloConsumer>
        {client => (
          <Mutation
            mutation={REGISTER_USER_MUT}
            // onError={(e) => console.log(e)}
            onCompleted={({signUp})=>{
              this.props.registerUser({signUp})
            }}
          >
            {(signUp, {loading, error}) => {
              if (loading) return <Loading />
              if (error) {
                // console.log(signUp)
                for (let err of error.graphQLErrors) {
                  // console.log(err.extensions.exception.errors)
                  return <RegisterForm 
                  register={signUp} 
                  errors={err.extensions.exception.errors} 
                  state={this.state} 
                  setFormState={this.handleFormState} 
                  />
                }
              }
              return <RegisterForm register={signUp} state={this.state} setFormState={this.handleFormState} />
            }}
          </Mutation>
        )}
      </ApolloConsumer>
    )

  }
}

export default {
  component: connect(undefined, { registerUser })(forceLoggedIn(RegisterPage))
}