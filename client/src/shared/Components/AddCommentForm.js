import React from 'react'
import { Form, FormGroup, Input, Button } from 'reactstrap'
import { Card } from '../Elements'
export default function AddCommentForm({openForm}) {
  const handleSubmit = (e) => {
    e.preventDefault()
    openForm()
    
  }
  return (
      <Form onSubmit={handleSubmit}>
        <FormGroup className="px-4">
          <Input className="px-4 m-auto" type="textarea" width="90%" name="text" id="exampleText" />
        </FormGroup>
        <div className="d-flex">
          <Button className="ml-auto mr-4">share</Button>
        </div>
      </Form>
  )
}
