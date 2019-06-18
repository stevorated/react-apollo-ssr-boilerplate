import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { HelmetComponent } from '../Components'
import { fetchFeed, clearFeed } from '../Store/actions'
import requireAuth from '../HOC/requireAuth'
import checkLoggedIn from '../HOC/checkLoggedIn'
import { FeedMenu, ProfileContainer, InfoContainer } from '../Components'
// import FeedRigntBar from '../Components/Feed/FeedRigntBar'
import FeedScrollQuery from '../Components/Feed/FeedScrollQuery'
import FeedExtraLeft from '../Components/Feed/FeedExtraLeft'
import FeedExtraRight from '../Components/Feed/FeedExtraRight'
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import { mediaQs } from '../Utils'

class FeedPage extends Component {

  constructor (props) {
    super(props)
    this.title = 'Scroll Page'
    this.state = {
      leaveClass: 'animeted fadeOutUp'
    }
    // console.log(this.props)
  }
  componentWillUnmount = () => {
    
    setTimeout(()=>{
      this.setState = {leaveClass: ''}
      console.log('unmount')
    },1000)
    
  }

  render() {
    return(
    // <ReactCSSTransitionGroup
    // transitionName="example"
    // transitionLeaveTimeout={100}>
    // >
      <Row className="animated fadeIn">
        <HelmetComponent pageTitle={this.title} ogTitle={this.title} />
        <FloatLeft lg="3">
          <FeedMenu />
          <FeedExtraLeft />
        </FloatLeft>
        <Col lg="6" className="offset-xl-3 order-3 order-lg-2" >
          <FeedScrollQuery />
        </Col>
        <Col lg="3" className="order-2 order-lg-3">
          <FeedExtraRight />
          <FeedExtraRight />
        </Col>
      </Row>
    // </ReactCSSTransitionGroup>
    )
  } 
}

function mapStateToProps({ users, posts, feed }) {
  return { users, posts, feed }
}

export default {
  component: connect(mapStateToProps, {fetchFeed, clearFeed})(checkLoggedIn(requireAuth(FeedPage))),
  loadData: ({ dispatch }) => dispatch(fetchFeed())
}

const FloatLeft = styled(Col)`
  position: fixed!important;
  top: 4.8rem;
  left: 0rem;
  ${mediaQs.papabear `
    position: static!important;
  `}
  ${mediaQs.brotherbear `
    position: static!important;
  `}
  ${mediaQs.mamabear `
    position: static!important;
    // display:none;
  `}
`


