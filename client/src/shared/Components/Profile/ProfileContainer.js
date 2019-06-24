import React, { Fragment } from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import { connect } from 'react-redux'
import AddImageModal from './AddImageModal'
import { BigProfileImg, FlatCard } from '../../Elements'
import Avatar from '../../../assets/new_logo.png'
import Loading from '../Fragment/Loading'
import styled from 'styled-components'
const imgAvatar = Avatar.replace('build', '').replace('/public', '')

function ProfileContainer({ auth, profilePosts, profileMode }) {
  let details
  const profileData = profilePosts[0] ? profilePosts[0].createdBy : null
  if (profileMode) {
    if (profileData) {
      details = profileData
    }
  } else if (!profileMode) {
    details = auth
  }
  if (details !== undefined) {
    let { id, fname, lname, username, posts, avatar } = details
    const myProfile = id === auth.id ? true : false
    const myAvatarUrl = auth.avatar[0].url
    const avatarOfUser = avatar && avatar.length ? avatar[0].url : imgAvatar
    const imgUrl = myProfile ? myAvatarUrl : avatarOfUser
    let postCount = posts ? posts.length : null
    // console.log(avatar.length)
    return (
      <div className="m-0 text-left">
        {details !== undefined &&
        
          <FlatCard className="pt-2">
            
            <Container fluid className="px-2">
              <Row>
                <Col className="mt-4" xs="9" sm="8">
                  
                  <div className="text-capitalize ml-3 mt-1 mb-0 pb-0"> 
                    <h5 className="noPadding font-weight-bold lead p-0">{fname} {lname}</h5>
                  </div>
                  <div className="noPadding small-text ml-3">{username}</div>
                  <hr className="noPadding"/>
                  <div className="small-text text-left mt-2 ml-3 font-weight-bold">Bio</div>
                  <p className="small-text text-left ml-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, tenetur?</p>
                </Col>
                <Col className="text-right mt-4" xs="3" sm="4">
                {myProfile && <AddImageModal />}
                <div className="mt-1">
                  <BigProfileImg
                  className="text-center mr-3"
                  src={imgUrl}
                  alt=""
                  />
                  
                </div>
                </Col>
              </Row>
              <div className="d-flex justify-content-around small-text">
              <div>{postCount} Wisdoms</div>
              <div>21 followers</div>
              <div>35 following</div>
            
            </div>
              <hr className="noPadding"/>
              <div className="d-flex mb-2 small-text mt-2">
                <StyledButton size="sm" className="mt-2 ml-2">Follow</StyledButton>
                <StyledButton size="sm" className="mt-2 ml-2">Go to</StyledButton>
                
                <div className="ml-auto">
                  <StyledButton size="sm" className="mt-2 mr-2">Go to</StyledButton>
                </div>
              </div>
            </Container>
          </FlatCard>
        }
      </div>
    )
  } else {
    return <Loading />
  }

  // || (profileData && profileMode)

}
const mapStateToProps = ({ auth, profilePosts }) => ({ auth, profilePosts })
export default connect(mapStateToProps)(ProfileContainer)

const StyledButton = styled(Button)`
  font-size: .9rem;
  padding: .2rem .6rem;
  display: block;
`