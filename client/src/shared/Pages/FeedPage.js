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


import { mediaQs } from '../Utils'

class FeedPage extends Component {

  constructor (props) {
    super(props)
    this.title = 'Scroll Page'
    // console.log(this.props)
  }

  componentWillUnmount(){
    console.log('unmount')
    // this.props.clearFeed()
  }
  
  render() {
    return(
      <Row>
        <HelmetComponent pageTitle={this.title} ogTitle={this.title} />
        <FloatLeft lg="2">
          <FeedMenu />
          <FeedExtraLeft />
        </FloatLeft>
        <Col lg="7" className="offset-xl-2 order-3 order-lg-2" >
          <FeedScrollQuery />
        </Col>
        <Col lg="3" className="order-2 order-lg-3">
          <FeedExtraRight />
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
  component: connect(mapStateToProps, {fetchFeed, clearFeed})(checkLoggedIn(requireAuth(FeedPage))),
  loadData: ({ dispatch }) => dispatch(fetchFeed())
}

const FloatLeft = styled(Col)`
  position: absolute !important;
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
    display:none;
  `}
`


