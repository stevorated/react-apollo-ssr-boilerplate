import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { HelmetComponent } from '../Components'
import { fetchFeed } from '../Store/actions'
import requireAuth from '../HOC/requireAuth'
import checkLoggedIn from '../HOC/checkLoggedIn'
import { ProfileContainer, InfoContainer } from '../Components'
// import FeedRigntBar from '../Components/Feed/FeedRigntBar'
import FeedScrollQuery from '../Components/Feed/FeedScrollQuery'
import FeedExtraLeft from '../Components/Feed/FeedExtraLeft'
import FeedExtraRight from '../Components/Feed/FeedExtraRight'

import { mediaQs } from '../Utils'

class FeedPage extends Component {

  constructor (props) {
    super(props)
    this.title = 'Scroll Page'
    // console.log(this.props)
  }

  componentDidMount() {
  }
  
  render() {
    return(
      <Row>
        <HelmetComponent pageTitle={this.title} ogTitle={this.title} />
        <FloatLeft lg="2">
          <ProfileContainer />
          <FeedExtraLeft />
        </FloatLeft>
        <Col lg="7" className="offset-xl-2 order-3 order-lg-2" >
          <FeedScrollQuery />
        </Col>
        <Col lg="3" className="order-2 order-lg-3">
          <InfoContainer />
          <FeedExtraRight />
        </Col>
      </Row>
    )
  } 
}

function mapStateToProps({ users, posts, feed }) {
  return { users, posts, feed }
}

export default {
  component: connect(mapStateToProps, {fetchFeed})(checkLoggedIn(requireAuth(FeedPage))),
  loadData: ({ dispatch }) => dispatch(fetchFeed())
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


