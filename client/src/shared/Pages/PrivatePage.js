import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { HelmetComponent } from '../Components'
import { fetchMyPosts } from '../Store/actions'
import requireAuth from '../HOC/requireAuth'
import checkLoggedIn from '../HOC/checkLoggedIn'
import { ProfileContainer, ScrollContainer, InfoContainer } from '../Components'
import { mediaQs } from '../Utils'

class PrivatePage extends Component {

  constructor (props) {
    super(props)
    this.title = 'Wall Page'
  }

  componentDidMount() {
    console.log('component mounted',this.props.posts.length)
    const postCount = this.props.posts.length
    this.props.fetchMyPosts(postCount)
  }
  
  render() {
    return(
      <Row>
        <HelmetComponent pageTitle={this.title} ogTitle={this.title} />
        <FloatLeft lg="2">
          <ProfileContainer />
        </FloatLeft>
        <Col lg="7" className="offset-xl-2 order-3 order-lg-2" >
          <ScrollContainer />
        </Col>
        <Col lg="3" className="order-2 order-lg-3">
          <InfoContainer />
        </Col>
      </Row>
    )
  } 
}

function mapStateToProps({ users, posts }) {
  return { users, posts }
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

export default {
  component: connect(mapStateToProps, {fetchMyPosts})(checkLoggedIn(requireAuth(PrivatePage))),
  loadData: ({ dispatch }) => dispatch(fetchMyPosts())
}
