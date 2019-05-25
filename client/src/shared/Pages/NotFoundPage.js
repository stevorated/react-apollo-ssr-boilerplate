import React from 'react'
import { HelmetComponent } from '../Components'
import { Container } from 'reactstrap'

function NotFoundPage({ staticContext = {} }) {
  staticContext.notFound = true
  return (
    <Container>
      <HelmetComponent pageTitle="Not Found" ogTitle="Not Found" />
      <h4><strong>Oops.. Page Not Found</strong></h4>
    </Container>
  )
}

export default {
  component: NotFoundPage
}
