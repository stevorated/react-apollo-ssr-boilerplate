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
    // if first load load only 5 posts (total 10)
    const postCount = this.props.posts.length || 5
    console.log('component mounted',postCount)
    this.props.fetchMyPosts(postCount)
  }
  
  render() {
    return(
      <Row>
        <HelmetComponent pageTitle={this.title} ogTitle={this.title} />
        <FloatLeft lg="3">
          <ProfileContainer />
        </FloatLeft>
        <Col lg="6" className="offset-xl-3 order-3 order-lg-2" >
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

export default {
  component: connect(mapStateToProps, {fetchMyPosts})(checkLoggedIn(requireAuth(PrivatePage))),
  loadData: ({ dispatch }) => dispatch(fetchMyPosts())
}

// const StyledInfo = styled(InfoContainer)`
// /* ${mediaQs.mamabear `
//     margin-top:0;
// `} */
//   margin-top: 0!important;
// `


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
  `}
`


