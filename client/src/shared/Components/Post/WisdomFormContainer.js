import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Mutation, ApolloConsumer } from 'react-apollo'
import { CREATE_POST_MUT } from '../../Apollo/Mutaions'
import { GET_MA_POSTS } from '../../Apollo/Queries'
import { Loading } from '..'
import { WisdomForm } from '../../Elements'
import { createPost } from '../../Store/actions'

class WisdomFormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      body: ''
    }
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
            mutation={CREATE_POST_MUT}
            onCompleted={({createPost}) => this.props.createPost(createPost)}     
            refetchQueries={[{query:GET_MA_POSTS}]}
            >
            {(createPost, {loading, error}) => {
              if (loading) return <Loading />
              if (error) {
                for (let err of error.graphQLErrors) {
                  console.log(err.extensions.exception.errors)
                  return (
                    <WisdomForm 
                    id={this.props.id}
                    errors={err.extensions.exception.errors} 
                    state={this.state} 
                    setFormState={this.handleFormState}
                    createPost={createPost} 
                    />
                  )
                }
              }
              return( 
              <WisdomForm
              id={this.props.id}
              state={this.state} 
              setFormState={this.handleFormState}
              createPost={createPost}  
              />
              )
            }}
          </Mutation>
        )}
      </ApolloConsumer>
    )

  }
}

export default connect(undefined, { createPost })(WisdomFormContainer)
