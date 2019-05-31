import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { fetchUsers } from '../Store/actions'
import { HelmetComponent } from '../Components'
import requireAuth from '../HOC/requireAuth'
import { ProfileContainer, ScrollContainer, InfoContainer } from '../Components'
import { mediaQs } from '../Utils'

class PrivatePage extends Component {
  componentDidMount() {
    this.props.fetchUsers()
  }
  renderQuery() {
    return this.props.users.map(({ id, fname, lname }) => {
      return <h4 key={id}>{lname} {fname}</h4>
    })
  }
  render() {
    return (
      <Row>
        <FloatLeft lg="2">
          <ProfileContainer />
        </FloatLeft>
        <Col lg="8" className="offset-lg-2 order-3 order-lg-2" >
          <ScrollContainer />
        </Col>
        <Col lg="2" className="order-2 order-lg-3">
          <InfoContainer />
        </Col>
      </Row>
    )
  }
}

function mapStateToProps({ users }) {
  return { users }
}

export default {
  component: connect(mapStateToProps, { fetchUsers })(requireAuth(PrivatePage)),
  loadData: ({ dispatch }) => dispatch(fetchUsers())
}


const FloatLeft = styled(Col)`
  position: fixed!important;
  ${mediaQs.papabear `
    position: static!important;
  `}
`
