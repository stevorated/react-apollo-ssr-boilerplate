import React from 'react'
import { Container } from 'reactstrap'
import { renderRoutes } from 'react-router-config'
import { fetchCurrentUser } from './Store/actions'

function App({ route }) {
  
  return (
    
    <Container fluid className="mx-0" style={{marginTop: '3rem', marginLeft: '0!important', marginRight: '0!important', padding: '0'}}>
      
      {renderRoutes(route.routes)}
    </Container>
  )
}

export default {
  component: App,
  loadData: ({dispatch}) => dispatch(fetchCurrentUser())
}