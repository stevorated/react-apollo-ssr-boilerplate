import React from 'react'
import {
  Container, Col, Row, Input, Card, CardSubtitle, Button, CardBody, Form
} from 'reactstrap'
import { isLength } from 'validator'
import {
  elevation,
  transition
} from '../../Utils'

import styled from 'styled-components'

export default function PostForm({id, errors, state, setFormState, createPost}) {
  const handleSubmit = (e) => {
    e.preventDefault()
    if(isLength(state.body,{min:2, max: 500})) {
      createPost({variables:{
        body: state.body,
      }})
      setFormState({body: ''})
    } else {
      console.log('Form Too Long')
    }
    // openForm()
  }

  const handleOnChange = (e) => {
    setFormState({retry :false})
    const value = e.target.value
    const name = e.target.name
    const newData = {
      [name]: value
    }
    setFormState(newData)
  }
  return (
    <Container fluid>
      <StyledCard>
        <CardBody>
        <CardSubtitle className="mb-1">Share Your Wisdom</CardSubtitle>
          <Form onSubmit={handleSubmit}>
            <Input 
            value={state.body}
            onChange={handleOnChange}
            className="mb-2" 
            type="textarea" 
            name="body" 
            id="Post_add_body" 
            />
            <div className="d-flex">
              <Button className="ml-auto">Post</Button>
            </div>
          </Form>
        </CardBody>
      </StyledCard>
    </Container>
  )
}


const StyledCard = styled(Card)`
${elevation[3]}
margin-top: .6rem;
margin-bottom: 1rem;
${transition({
            property: 'box-shadow'
      })};
      &:hover {
            ${elevation[4]};
      }
` 