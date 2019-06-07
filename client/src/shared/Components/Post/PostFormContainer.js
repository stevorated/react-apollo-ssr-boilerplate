import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Mutation, ApolloConsumer } from 'react-apollo'
import { CREATE_POST_MUT } from '../../Apollo/Mutaions'
import { GET_MA_POSTS } from '../../Apollo/Queries'
import { Loading } from '..'
import { PostForm } from '../../Elements'
import { createPost } from '../../Store/actions'

class PostFormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      body: ''
    }
  }
  
  
  handleFormState = (data) => {
    console.log('scroller?',this.scroller)
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
              if (error) {
                for (let err of error.graphQLErrors) {
                  console.log(err.extensions.exception.errors)
                  return (
                    <Fragment>
                      <PostForm 
                      id={this.props.id}
                      errors={err.extensions.exception.errors} 
                      state={this.state} 
                      setFormState={this.handleFormState}
                      createPost={createPost}
                      />
                      {loading && <Loading />}
                    </Fragment>
                  )
                }
              }
              return( 
                <Fragment>
                  <PostForm
                  id={this.props.id}
                  state={this.state} 
                  setFormState={this.handleFormState}
                  createPost={createPost}  
                  />
                  {loading && <Loading />}
                </Fragment>
              )
            }}
            
          </Mutation>
        )}
      </ApolloConsumer>
    )

  }
}

export default connect(undefined, { createPost })(PostFormContainer)
