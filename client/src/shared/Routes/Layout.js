import React from 'react'
import { renderRoutes } from 'react-router-config'
import { connect } from 'react-redux'
import { 
  Container
} from 'reactstrap'
import Navbar from './Navbar'
import routes from './mainRoutes'
import { Footer } from '../Components'

const MainContent = () => (
  <Container className="text-center">{renderRoutes(routes)}</Container>
)

function Layout ({auth}) {
  return (
  <Container fluid>
    <Navbar />
    <MainContent />
    <Footer />
  </Container>
  )
}

function mapStateToProps({ auth }) {
  return { auth }
}

export default connect(mapStateToProps)(Layout)


// <Switch>
// {routes.map(route => <Route key={route.name} {...route} />)}
// </Switch>
