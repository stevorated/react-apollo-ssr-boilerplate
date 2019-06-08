import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Mutation, ApolloConsumer } from 'react-apollo'
import {
  Button,
  Popover,
  PopoverHeader,
  PopoverBody
} from 'reactstrap'
import styled from 'styled-components'

import { DELETE_POST_MUT } from '../../Apollo/Mutaions'
import { GET_MA_POSTS } from '../../Apollo/Queries'
import { Loading } from '..'
import { deletePostAction } from '../../Store/actions'

class DeletePostMutation extends Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      showPopUp: true
    }
  }

  handleDeleteButton = (deletePost) => {
    this.setState({showPopUp: false})
    this.props.setClickDeleteCounter(this.props.clickDeleteCounter + 1)
    this.props.handleDelete()
  }

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <Mutation
            mutation={DELETE_POST_MUT}
            variables={{ post: this.props.post }}
            onCompleted={async ({ deletePost }) => {
              await this.props.deletePostAction(deletePost)
              this.props.handleDelete()
            }}
            refetchQueries={[{ query: GET_MA_POSTS }]}
          >
            {(deletePost, { loading, error, called }) => {
              if (loading) return <Loading />
              if (error) {
                for (let err of error.graphQLErrors) {
                  return <span>`${err.extensions.exception.errors}`</span>
                }
              }
              return (
                <div>
                <StyledPopover 
                className="text-capitalized"
                placement="top-end"
                isOpen={this.props.clickDeleteCounter >= 1 && !this.state.showPopUp}
                triger="focus"
                target={`PopoverDeletePost_${this.props.post}`} 

                >
                  <PopoverHeader>Watch Out!</PopoverHeader>
                  <PopoverBody>{this.props.deleteMessage}</PopoverBody>
                </StyledPopover>
                  <Button
                  className={this.props.clickDeleteCounter >1 ? 'text-danger big-x' : ''} 
                  id={`PopoverDeletePost_${this.props.post}`} 
                  onClick={async () => {
                    if (this.props.clickDeleteCounter < 2) {return this.handleDeleteButton()}
                    else  {
                      await this.setState({showPopUp: true})
                      return deletePost()
                    }
                  }} 
                  close 
                  />

                </div>
              )
            }}
          </Mutation>
        )}
      </ApolloConsumer>
    )

  }
}

const StyledPopover = styled(Popover)`
margin: 100px;
`

export default connect(undefined, { deletePostAction })(DeletePostMutation)
