import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { BigProfileImg, FlatCard } from '../../Elements'
import Avatar from '../../../assets/new_logo.png'
import Loading from '../Fragment/Loading';
const imgAvatar = Avatar.replace('build', '').replace('/public', '')

function ProfileContainer({ auth, profilePosts, profileMode }) {
  console.log(profileMode)
  let details
  const profileData = profilePosts[0] ?  profilePosts[0].createdBy : null
  if(profileMode) {
      if(profileData) {
        details = profileData
      }
  } else if (!profileMode) {
    details = auth
  }
  if(details !== undefined) {
    let { fname, lname, email, username } = details
    return (
      <div className="m-0 mt-2"  >
        {details !== undefined &&
          <FlatCard className="m-0 p-0" style={{minHeight: '50vh'}}>
            <BigProfileImg
              className="text-center my-4"
              src={imgAvatar}
              alt=""
            />
            <p className="text-capitalize">{fname} {lname}</p>
            <p className="mb-2 pb-2">{username}</p>
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