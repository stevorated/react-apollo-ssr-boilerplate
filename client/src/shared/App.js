import React from 'react'
import { Container } from 'reactstrap'
import { renderRoutes } from 'react-router-config'
import { fetchCurrentUser } from './Store/actions'

function App({ route }) {

  return (
    <Container fluid style={{marginTop: '5rem'}}>
      {renderRoutes(route.routes)}
    </Container>
  )
}

export default {
  component: App,
  loadData: ({dispatch}) => dispatch(fetchCurrentUser())
}