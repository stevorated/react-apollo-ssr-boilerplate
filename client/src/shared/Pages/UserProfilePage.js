import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'reactstrap'
import { ProfileScrollContainer } from '../Components'
import { HelmetComponent } from '../Components'
import styled from 'styled-components'
import { mediaQs } from '../Utils'
import checkLoggedIn from '../HOC/checkLoggedIn'
import { clearUsersPosts } from '../Store/actions'

class UserProfilePage extends Component {
  constructor(props) {
    super(props)
    this.title = 'profile page'
    this.id = props.match.params.id
    this.state = {
      id: props.match.params.id
    }
  }
  componentWillUnmount = () => {
    this.props.clearUsersPosts()
  }
  render() {
    return (
      <Row>
      <HelmetComponent pageTitle={this.title} ogTitle={this.title} />
      <FloatLeft lg="2">
      </FloatLeft>
      <Col lg="7" className="offset-xl-2 order-3 order-lg-2" >
        <ProfileScrollContainer id={this.id} fatherProps={this.props} />
      </Col>
      <Col lg="3" className="order-2 order-lg-3">
      </Col>
    </Row>
    )
  }
}

export default  {
  component: connect(undefined, {clearUsersPosts})(checkLoggedIn(UserProfilePage))
} 

const FloatLeft = styled(Col)`
  position: fixed!important;
  top: 4rem;
  left: 0.9rem;
  ${mediaQs.papabear `
    position: static!important;
  `}
  ${mediaQs.brotherbear `
    position: static!important;
  `}
  ${mediaQs.mamabear `
    position: static!important;
  `}
`